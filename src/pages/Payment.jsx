import { useState } from "react"
import { Header } from "../components/Header"

export function Payment() {
  const [form, setForm] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Formata o número do cartão: "1234567890123456" → "1234 5678 9012 3456"
  function formatCardNumber(value) {
    return value
      .replace(/\D/g, "")        // remove tudo que não for número
      .slice(0, 16)               // limita a 16 dígitos
      .replace(/(.{4})/g, "$1 ") // adiciona espaço a cada 4 dígitos
      .trim()
  }

  // Formata a data: "1226" → "12/26"
  function formatExpiry(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/")
      .trim()
  }

  function handleChange(event) {
    const { name, value } = event.target

    // Aplica formatação dependendo do campo
    if (name === "cardNumber") {
      setForm({ ...form, cardNumber: formatCardNumber(value) })
      return
    }

    if (name === "expiryDate") {
      setForm({ ...form, expiryDate: formatExpiry(value) })
      return
    }

    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")

    const onlyNumbersCard = form.cardNumber.replace(/\D/g, "")
    const onlyNumbersCvv = form.cvv.replace(/\D/g, "")

    if (!form.cardHolder.trim()) {
      setError("Informe o nome no cartão.")
      return
    }

    if (onlyNumbersCard.length !== 16) {
      setError("Informe um número de cartão com 16 dígitos.")
      return
    }

    if (!form.expiryDate || form.expiryDate.length !== 5) {
      setError("Informe a validade no formato MM/AA.")
      return
    }

    if (onlyNumbersCvv.length !== 3) {
      setError("Informe um CVV com 3 dígitos.")
      return
    }

    setLoading(true)

    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 800)
  }

  // Tela de sucesso após pagamento
  if (success) {
    return (
      <>
        <Header />
        <main className="container">
          <div className="success-card">
            <h1>✓ Assinatura ativada!</h1>
            <p>Seu pagamento foi processado com sucesso.</p>
            <p>Aproveite o Rooster+</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="container">
        <h1>Pagamento</h1>

        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Simular assinatura</h2>

          {error && <p className="error">{error}</p>}

          <input
            name="cardHolder"
            placeholder="Nome no cartão"
            value={form.cardHolder}
            onChange={handleChange}
            required
          />

          <input
            name="cardNumber"
            placeholder="Número do cartão"
            value={form.cardNumber}
            onChange={handleChange}
            required
          />

          <div className="card-row">
            <input
              name="expiryDate"
              placeholder="Validade (MM/AA)"
              value={form.expiryDate}
              onChange={handleChange}
              required
            />

            <input
              name="cvv"
              placeholder="CVV"
              maxLength={3}
              value={form.cvv}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Processando..." : "Confirmar pagamento"}
          </button>
        </form>
      </main>
    </>
  )
}