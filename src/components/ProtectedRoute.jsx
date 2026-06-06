import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children }) {
  // Verifica se existe token salvo no navegador
  const token = localStorage.getItem("token")

  // Se não tiver token, redireciona para login
  if (!token) {
    return <Navigate to="/login" />
  }

  // Se tiver token, renderiza a página normalmente
  return children
}