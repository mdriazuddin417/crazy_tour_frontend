"use server";

import { verifyAccessToken } from "@/lib/jwtHanlders";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { resetPasswordSchema } from "@/zod/auth.validation";
import { parse } from "cookie";
import { revalidateTag } from "next/cache";

import { redirect } from "next/navigation";
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";


/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData) {
    try {
        // Create a new FormData with the data property
        const uploadFormData = new FormData();

        // Get all form fields except the file
        const data: any = {};
        formData.forEach((value, key) => {
            if (key !== 'file' && value) {
                data[key] = value;
            }
        });

        // Add the data as JSON string
        uploadFormData.append('data', JSON.stringify(data));

        // Add the file if it exists
        const file = formData.get('file');
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append('file', file);
        }

        const response = await serverFetch.patch(`/user/update-my-profile`, {
            body: uploadFormData,
        });

        const result = await response.json();

        revalidateTag("user-info", { expire: 0 });
        return result;
    } catch (error: any) {
        // console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// Reset Password
export async function resetPassword(_prevState: any, formData: FormData) {
    const token = _prevState.token
    const id = _prevState.id
    if (!token) {
        return {
            success: false,
            message: "Invalid reset token",
        };
    }

    const payload = {
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    const validated = zodValidator(payload, resetPasswordSchema);

    if (!validated.success) {
        return {
            success: false,
            errors: validated.errors,
        };
    }

    const response = await serverFetch.post("/auth/reset-password", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            newPassword: (validated.data as any).newPassword,
            id
        }),
    });

    const result = await response.json();

    if (!result.success) {
        return {
            success: false,
            message: result.message,
        };
    }

    redirect("/login");
}

export async function getNewAccessToken() {
    try {
        const accessToken = await getCookie("accessToken");
        const refreshToken = await getCookie("refreshToken");

        //Case 1: Both tokens are missing - user is logged out
        if (!accessToken && !refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        // Case 2 : Access Token exist- and need to verify
        if (accessToken) {
            const verifiedToken = await verifyAccessToken(accessToken);

            if (verifiedToken.success) {
                return {
                    tokenRefreshed: false,
                }
            }
        }

        //Case 3 : refresh Token is missing- user is logged out
        if (!refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
        // This is the only case we need to call the API

        // Now we know: accessToken is invalid/missing AND refreshToken exists
        // Safe to call the API
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
        const response = await serverFetch.post("/auth/refresh-token", {
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        const result = await response.json();

        console.log("access token refreshed!!");

        const setCookieHeaders = response.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        await deleteCookie("accessToken");
        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        await deleteCookie("refreshToken");
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

        if (!result.success) {
            throw new Error(result.message || "Token refresh failed");
        }


        return {
            tokenRefreshed: true,
            success: true,
            message: "Token refreshed successfully"
        };


    } catch (error: any) {
        return {
            tokenRefreshed: false,
            success: false,
            message: error?.message || "Something went wrong",
        };
    }

}

export const forgetPasswordAPI = async (state: { success: boolean; message: any } | null | undefined, formData: FormData) => {
    try {
        const response = await serverFetch.post("/auth/forgot-password", {
            body: JSON.stringify({
                email: formData.get('email') as string,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Reset password failed");
        }

    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
        };
    }
}
export const changePasswordApi = async (body:{oldPassword: string, newPassword: string}) => {
    try {
        const response = await serverFetch.post("/auth/change-password", {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        console.log('result',result);

        if (!result.success) {
            throw new Error(result.message || "change password failed");
        }
        return result;

    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
        };
    }
}