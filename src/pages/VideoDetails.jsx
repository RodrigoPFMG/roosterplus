import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { api } from "../services/api"

export function VideoDetails() {
  const { id } = useParams()

  const [video, setVideo] = useState(null)
  const [added, setAdded] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideo()
  }, [id])

  async function fetchVideo() {
    setLoading(true)
    setError("")

    try {
      const response = await api.get(`/videos/${id}`)
      setVideo(response.data)
    } catch (err) {
      console.error(err)
      setError("Erro ao carregar vídeo.")
    } finally {
      setLoading(false)
    }
  }

  async function handleAddToList() {
    const activeProfileId = localStorage.getItem("activeProfileId")

    if (!activeProfileId) {
      setError("Selecione um perfil antes de adicionar vídeos à lista.")
      return
    }

    try {
      await api.post(`/profiles/${activeProfileId}/my-list/${id}`)

      setAdded(true)
      setMessage("Adicionado à sua lista!")
      setError("")
    } catch (err) {
      console.error(err)
      setError("Erro ao adicionar vídeo à lista.")
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="container">
          <p>Carregando...</p>
        </main>
      </>
    )
  }

  if (!video) {
    return (
      <>
        <Header />
        <main className="container">
          <p className="error">{error || "Vídeo não encontrado."}</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="container">
        <div className="player-wrapper">
          <iframe
            src={video.embedUrl || `https://www.youtube.com/embed/${video.youtubeVideoId}`}
            title={video.title}
            allowFullScreen
          />
        </div>

        <div className="video-info">
          <h1>{video.title}</h1>
          <p className="video-channel">{video.channelTitle}</p>
          <p className="video-category">{video.category}</p>
          <p className="video-description">{video.description}</p>

          <button
            className="btn-add-list"
            onClick={handleAddToList}
            disabled={added}
          >
            {added ? "✓ Na sua lista" : "+ Adicionar à lista"}
          </button>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </main>
    </>
  )
}