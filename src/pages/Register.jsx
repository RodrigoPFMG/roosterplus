import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { api } from "../services/api"

export function Register() {
  const navigate = useNavigate()

  // Três campos agora: name, email e password
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")

    try {
      const response = await api.post("/auth/register", form)

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data))

      localStorage.removeItem("activeProfileId")
      localStorage.removeItem("activeProfileName")
      // Após cadastro vai para perfis, não para home
      navigate("/profiles")

    } catch (err) {
      setError("Não foi possível cadastrar. Verifique os dados.")
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Criar conta</h1>

        {error && <p className="error">{error}</p>}

        <input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
        />

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

        <button type="submit">Cadastrar</button>

        <p>
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </main>
  )
}