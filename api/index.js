const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json()) //
app.use(express.urlencoded({extended: true}))

const todos = [
    {
        id: 1, 
        title: 'Todo Title',
        desc: 'Description'
    },
    {
        id: 1, 
        title: 'Todo Title 2',
        desc: 'Description'
    },
    {
        id: 1, 
        title: 'Todo Title 3',
        desc: 'Description'
    },
    {
        id: 1, 
        title: 'Todo Title 4',
        desc: 'Description'
    }
]

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.post('/todos', (req, res)=>{

    let { title, desc } = req.body

    if(!title || !desc){
        res.status(400).send({
            msg: 'Title yoki description yo\'q'
        })
    }

    const newTodo = {
        id: Date.now(), 
        title: req.body.title,
        desc: req.body.desc
    }
    todos.push(newTodo)
    res.send({
        newTodo
    })
})

app.listen(3030, () => {
    console.log('server is running on port: http://localhost:3030')
})