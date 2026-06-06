import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { api } from "../services/api"

export function Login() {
  // useNavigate permite redirecionar o usuário para outra rota
  const navigate = useNavigate()

  // Estado que guarda os dados do formulário
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  // Estado que guarda a mensagem de erro
  const [error, setError] = useState("")

  // Chamada quando o usuário digita em qualquer campo
  function handleChange(event) {
    setForm({
      ...form, // mantém os outros campos
      [event.target.name]: event.target.value, // atualiza só o campo que mudou
    })
  }

  // Chamada quando o usuário clica em Entrar
  async function handleSubmit(event) {
    event.preventDefault() // impede o comportamento padrão do form (recarregar a página)
    setError("") // limpa erro anterior

    try {
      const response = await api.post("/auth/login", form)

      // Salva o token e os dados do usuário no navegador
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data))

      localStorage.removeItem("activeProfileId")
      localStorage.removeItem("activeProfileName")
      // Redireciona para a home
      navigate("/home")

    } catch (err) {
      setError("E-mail ou senha incorretos.")
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Entrar</h1>

        {/* Só mostra o erro se existir */}
        {error && <p className="error">{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Entrar</button>

        <p>
          Não tem conta? <Link to="/register">Cadastrar</Link>
        </p>
      </form>
    </main>
  )
}