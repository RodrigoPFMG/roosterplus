import { useState, useEffect } from "react"
import { Header } from "../components/Header"
import { api } from "../services/api"


const preferenceOptions = [
  "Filmes", "Música", "Tecnologia",
  "Esportes", "Games", "Infantil", "Educação"
]

export function Profiles() {
  // Lista de perfis do usuário
  const [profiles, setProfiles] = useState([])

  // Dados do formulário
  const [form, setForm] = useState({ name: "", preferences: [] })

  // null = criando, número = editando aquele id
  const [editingId, setEditingId] = useState(null)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Carrega os perfis quando a tela abre
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    try {
      const response = await api.get("/profiles")
      setProfiles(response.data)
    } catch (err) {
      setError("Erro ao carregar perfis.")
    }
  }

  // Controla o campo de nome
  function handleNameChange(event) {
    setForm({ ...form, name: event.target.value })
  }

  // Controla os checkboxes de preferências
  function handlePreferenceToggle(preference) {
    const already = form.preferences.includes(preference)

    if (already) {
      // Remove a preferência se já estava marcada
      setForm({
        ...form,
        preferences: form.preferences.filter((p) => p !== preference)
      })
    } else {
      // Adiciona a preferência
      setForm({
        ...form,
        preferences: [...form.preferences, preference]
      })
    }
  }

  // Cria ou edita dependendo do editingId
  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (editingId) {
        // Edição — PUT
        await api.put(`/profiles/${editingId}`, form)
      } else {
        // Criação — POST
        await api.post("/profiles", form)
      }

      // Limpa o formulário e recarrega a lista
      setForm({ name: "", preferences: [] })
      setEditingId(null)
      fetchProfiles()

    } catch (err) {
      setError("Erro ao salvar perfil.")
    } finally {
      // finally roda sempre — com erro ou sem
      setLoading(false)
    }
  }

  // Preenche o formulário com os dados do perfil para editar
  function handleEdit(profile) {
    setEditingId(profile.id)
    setForm({
      name: profile.name,
      preferences: profile.preferences || []
    })
  }

  function handleSelectProfile(profile) {
    localStorage.setItem("activeProfileId", profile.id)
    localStorage.setItem("activeProfileName", profile.name)
    window.location.href = "/home"
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/profiles/${id}`)

      if (localStorage.getItem("activeProfileId") === String(id)) {
        localStorage.removeItem("activeProfileId")
        localStorage.removeItem("activeProfileName")
      }

      fetchProfiles()
    } catch (err) {
      setError("Erro ao excluir perfil.")
    }
  }

  // Cancela a edição e limpa o formulário
  function handleCancel() {
    setEditingId(null)
    setForm({ name: "", preferences: [] })
    setError("")
  }

  return (
    <>
      <Header />
      <main className="container">
        <h1>Perfis</h1>

        {error && <p className="error">{error}</p>}

        {/* Formulário de criação/edição */}
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Editar perfil" : "Novo perfil"}</h2>

          <input
            placeholder="Nome do perfil"
            value={form.name}
            onChange={handleNameChange}
            required
          />

          {/* Checkboxes de preferências */}
          <p className="preferences-label">Preferências:</p>
          <div className="preferences-grid">
            {preferenceOptions.map((pref) => (
              <label key={pref} className="preference-item">
                <input
                  type="checkbox"
                  checked={form.preferences.includes(pref)}
                  onChange={() => handlePreferenceToggle(pref)}
                />
                {pref}
              </label>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Salvando..." : editingId ? "Salvar" : "Criar perfil"}
            </button>

            {/* Botão cancelar só aparece quando está editando */}
            {editingId && (
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Lista de perfis */}
        <div className="profiles-list">
          {profiles.length === 0 && (
            <p className="empty-message">Nenhum perfil criado ainda.</p>
          )}

          {profiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <div className="profile-info">
                <strong>{profile.name}</strong>
                <div className="profile-tags">
                  {(profile.preferences || []).map((pref) => (
                    <span key={pref} className="tag">{pref}</span>
                  ))}
                </div>
              </div>

              <div className="profile-actions">
                <button onClick={() => handleSelectProfile(profile)}>
                  Usar perfil
                </button>

                <button onClick={() => handleEdit(profile)}>Editar</button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(profile.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}