import { ApiService } from "../api/Axios"

export const AuthApp = (apiservice: ApiService) => ({
    register: async (data: { user: string, token: string }) => {
        try {
            const response = await apiservice.register(data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
})