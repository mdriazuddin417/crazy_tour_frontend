import { getNewAccessToken } from "@/services/auth/auth.service";
import { getCookie } from "@/services/auth/tokenHandlers";


const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "https://local-tour-guid-backend.vercel.app/api/v1";

const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
    const { headers, ...restOptions } = options;
    const accessToken = await getCookie("accessToken");

    //to stop recursion loop
    if (endpoint !== "/auth/refresh-token") {
        await getNewAccessToken();
    }
    console.log('restOptions', restOptions)

    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
        headers: {
            Cookie: accessToken ? `accessToken=${accessToken}` : "",
            ...headers,
        },
        ...restOptions,
    })

    return response;
}

export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),

    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),

    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),

    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),

}
