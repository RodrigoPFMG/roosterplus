import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { api } from "../services/api"

export function MyList() {
  const navigate = useNavigate()

  const [videos, setVideos] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyList()
  }, [])

  async function fetchMyList() {
    const activeProfileId = localStorage.getItem("activeProfileId")

    if (!activeProfileId) {
      setError("Selecione um perfil antes de acessar sua lista.")
      setLoading(false)
      return
    }

    try {
      const response = await api.get(`/profiles/${activeProfileId}/my-list`)
      setVideos(response.data)
    } catch (err) {
      console.error(err)
      setError("Erro ao carregar Minha Lista.")
    } finally {
      setLoading(false)
    }
  }

  async function handleRemove(videoId) {
    const activeProfileId = localStorage.getItem("activeProfileId")

    if (!activeProfileId) {
      setError("Selecione um perfil antes de remover vídeos.")
      return
    }

    try {
      await api.delete(`/profiles/${activeProfileId}/my-list/${videoId}`)

      setVideos(videos.filter((video) => video.id !== videoId))
    } catch (err) {
      console.error(err)
      setError("Erro ao remover vídeo da lista.")
    }
  }

  return (
    <>
      <Header />
      <main className="container">
        <h1>Minha Lista</h1>

        {loading && <p>Carregando...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && videos.length === 0 && !error && (
          <p className="empty-message">Sua lista está vazia.</p>
        )}

        <div className="grid">
          {videos.map((video) => (
            <div key={video.id} className="card">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                onClick={() => navigate(`/videos/${video.id}`)}
                style={{ cursor: "pointer" }}
              />

              <div style={{ padding: "12px" }}>
                <p className="card-title">{video.title}</p>
                <p className="card-channel">{video.channelTitle}</p>

                <button
                  className="btn-remove"
                  onClick={() => handleRemove(video.id)}
                >
                  Remover da lista
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}