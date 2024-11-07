const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
  res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0

    const note = req.body
    note.id = String(maxId + 1)
    notes = notes.concat(note)
    res.json(note)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)