import { useNavigate, Link } from "react-router-dom"

export function Header() {
  const navigate = useNavigate()

  // Remove os dados do localStorage e volta para o login
  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("activeProfileId")
    localStorage.removeItem("activeProfileName")
    navigate("/login")
  }

  return (
    <header className="header">
      {/* Nome da plataforma — clicável, volta para home */}
      <Link to="/home">
        <strong>Rooster+</strong>
      </Link>

      <nav>
        <Link to="/my-list">Minha Lista</Link>
        <Link to="/profiles">Perfis</Link>
        <Link to="/payment">Pagamento</Link>
        <Link to="/account">Conta</Link>
        <button onClick={handleLogout}>Sair</button>
      </nav>
    </header>
  )
}