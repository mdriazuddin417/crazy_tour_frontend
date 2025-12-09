// ./tokenHandlers.ts
"use server" // <-- MUST BE HERE

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers"; // <-- Import cookies

// The setCookie function must be an async function that uses cookies() internally.
export const setCookie = async (key: string, value: string, options: Partial<ResponseCookie>) => {
    // ✅ The call to cookies() is correctly placed INSIDE the function body.
    const cookieStore = await cookies();
    cookieStore.set(key, value, options);
}

// Ensure the other helpers are also Server Actions and use cookies() internally
export const getCookie = async (key: string) => {
    "use server" // Optional, but good practice if called externally
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value || null;
}

export const deleteCookie = async (key: string) => {
    "use server" // Optional
    const cookieStore = await cookies();
    cookieStore.delete(key);
}