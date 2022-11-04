import axios from "axios";

const URL = "http://localhost:5000";

const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})


export const register = (data) => api.post("/api/register", data)
export const login = (data) => api.post("/api/login", data)
export const allConversation = (userId) => api.get(`/api/conversation/${userId}`)
export const oneUser = (id) => api.get(`/api/user/${id}`)
export const allMessages = (id) => api.get(`/api/message/${id}`)
export const newOneMessage = (data) => api.post(`/api/message/`, data)
export const allPeople = () => api.get(`/api/users`)
export const createConversation = (data) => api.post(`/api/conversation`, data)


export default api;
