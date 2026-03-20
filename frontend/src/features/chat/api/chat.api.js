import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env['VITE_BACKEND_ENDPOINT'],
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status
            const message = error.response.data?.message

            if (status === 401) {
                return Promise.reject(new Error("Your session has expired. Please log in again."))
            }
            if (status === 403) {
                return Promise.reject(new Error("You don't have permission to perform this action."))
            }
            if (status === 404) {
                return Promise.reject(new Error("The requested resource was not found."))
            }
            if (status === 429) {
                return Promise.reject(new Error("Too many requests. Please slow down and try again."))
            }
            if (status >= 500) {
                return Promise.reject(new Error(message ?? "A server error occurred. Please try again later."))
            }

            return Promise.reject(new Error(message ?? `Request failed with status ${status}.`))
        }

        if (error.request) {
            return Promise.reject(new Error("Network error — please check your connection and try again."))
        }

        return Promise.reject(new Error(error.message ?? "An unexpected error occurred."))
    }
)


export const sendMessage = async ({ message, chatId }) => {
    const response = await api.post("/api/chats/message", { message, chat: chatId })
    return response.data
}

export const getChats = async () => {
    const response = await api.get("/api/chats")
    return response.data
}

export const getMessages = async (chatId) => {
    const response = await api.get(`/api/chats/${chatId}/messages`)
    return response.data
}

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/api/chats/delete/${chatId}`)
    return response.data
}
