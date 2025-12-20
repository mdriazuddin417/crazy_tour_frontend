/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

import { IUser } from "@/lib/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<IUser | any> => {
    let userInfo: IUser | any;
    try {

        const response = await serverFetch.get("/user/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        })

        const result = await response.json();
        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt?.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = result.data



        return userInfo;
    } catch (error: any) {
        // console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "PATIENT",
        };
    }

}