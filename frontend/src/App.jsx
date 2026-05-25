import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const response = await fetch('http://localhost:5000/api/messages')
    const data = await response.json()
    setMessages(data)
  }

  const addMessage = async () => {
    if (!text.trim()) return

    const response = await fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })

    const newMessage = await response.json()

    setMessages([...messages, newMessage])
    setText('')
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Fullstack CI/CD Deneme 🚀</h1>
        <p>React frontend, Node.js backend'den veri çekiyor.</p>

        <div className="form">
          <input
            type="text"
            placeholder="Mesaj yaz..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={addMessage}>Mesaj Ekle</button>
        </div>

        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className="message">
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App