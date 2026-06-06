import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { api } from "../services/api"

export function Account() {
  const navigate = useNavigate()

  // Lê os dados do usuário salvos no localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleCancel() {
    setError("")
    setLoading(true)

    try {
      await api.post("/account/cancel")

      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("activeProfileId")
      localStorage.removeItem("activeProfileName")

      navigate("/login")

    } catch (err) {
      console.error(err)
      setError("Erro ao cancelar conta.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="container">
        <h1>Minha Conta</h1>

        {/* Dados do usuário */}
        <div className="account-card">
          <h2>Dados da conta</h2>

          <div className="account-info">
            <div className="account-row">
              <span className="account-label">Nome</span>
              <span>{user.name || "—"}</span>
            </div>
            <div className="account-row">
              <span className="account-label">E-mail</span>
              <span>{user.email || "—"}</span>
            </div>
            <div className="account-row">
              <span className="account-label">Tipo de conta</span>
              <span>{user.provider || "LOCAL"}</span>
            </div>
          </div>
        </div>

        {/* Zona de perigo */}
        <div className="danger-zone">
          <h2>Cancelar conta</h2>
          <p>Essa ação é permanente e não pode ser desfeita.</p>

          {error && <p className="error">{error}</p>}

          {/* Primeiro clique mostra confirmação */}
          {!confirming ? (
            <button
              className="btn-danger"
              onClick={() => setConfirming(true)}
            >
              Cancelar minha conta
            </button>
          ) : (
            // Segundo clique executa de verdade
            <div className="confirm-actions">
              <p className="confirm-text">Tem certeza? Isso apagará todos os seus dados.</p>
              <button
                className="btn-danger"
                onClick={handleCancel}
                disabled={loading}
              >
                {loading ? "Cancelando..." : "Sim, cancelar minha conta"}
              </button>
              <button
                className="btn-cancel-action"
                onClick={() => setConfirming(false)}
              >
                Não, voltar
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}