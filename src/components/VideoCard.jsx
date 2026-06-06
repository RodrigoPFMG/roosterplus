import { useNavigate } from "react-router-dom"

export function VideoCard({ video }) {
  const navigate = useNavigate()

  return (
    <div className="card" onClick={() => navigate(`/videos/${video.id}`)}>
      <img src={video.thumbnailUrl} alt={video.title} />
      <p className="card-title">{video.title}</p>
      <p className="card-channel">{video.channelTitle}</p>
    </div>
  )
}
