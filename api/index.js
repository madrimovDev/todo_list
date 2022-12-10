const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))

const todos = [
    {
        id: 1, 
        title: 'Todo Title',
        desc: 'Description'
    }
]

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.listen(3030, () => {
    console.log('server is running on port: http://localhost:3030')
})