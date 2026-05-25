const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

let messages = [
  { id: 1, text: 'Backend çalışıyor 🚀' },
  { id: 2, text: 'React buradan veri çekecek 💻' }
]

app.get('/', (req, res) => {
  res.send('Node.js backend aktif')
})

app.get('/api/messages', (req, res) => {
  res.json(messages)
})

app.post('/api/messages', (req, res) => {
  const { text } = req.body

  if (!text) {
    return res.status(400).json({ message: 'Mesaj boş olamaz' })
  }

  const newMessage = {
    id: messages.length + 1,
    text
  }

  messages.push(newMessage)

  res.status(201).json(newMessage)
})

app.listen(PORT, () => {
  console.log(`Backend ${PORT} portunda çalışıyor`)
})