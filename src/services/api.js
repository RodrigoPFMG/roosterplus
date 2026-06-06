import axios from "axios"

export const api = axios.create({
  // Lê a URL do arquivo .env em vez de ter fixo no código
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})