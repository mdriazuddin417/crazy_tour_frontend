/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";


export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            name: formData.get('name'),
            role: formData.get('role'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }



        if (zodValidator(payload, registerUserValidationZodSchema).success === false) {
            return zodValidator(payload, registerUserValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerUserValidationZodSchema).data;
        const registerData = {
            password: validatedPayload.password,
            name: validatedPayload.name,
            role: validatedPayload.role,
            address: validatedPayload.address,
            email: validatedPayload.email,

        }

        const res = await serverFetch.post("/user/register", {
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await res.json();

        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }

        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}