import { useState, useEffect } from "react"
import { Header } from "../components/Header"
import { VideoCard } from "../components/VideoCard"
import { api } from "../services/api"
import { categories } from "../services/mockData"

export function Home() {
  const [activeCategory, setActiveCategory] = useState("Filmes")
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchVideos()
  }, [activeCategory])

  async function fetchVideos() {
    setLoading(true)
    setError("")

    try {
      const categoryToSearch =
        activeCategory === "Todos" ? "Filmes" : activeCategory

      const response = await api.get(
        `/videos?category=${encodeURIComponent(categoryToSearch)}`
      )

      setVideos(response.data)
    } catch (err) {
      console.error(err)
      setError("Erro ao carregar vídeos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <div className="category-menu">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading && <p className="container">Carregando vídeos...</p>}

      {error && <p className="container error">{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </>
  )
}