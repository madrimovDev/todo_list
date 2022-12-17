const todos = document.querySelector('.todos')
const form = document.querySelector('.main-form')
const input = document.querySelector('.form-input')
const textarea = document.querySelector('.form-textarea')

let method;
let editedID;

function createElement(tagName, className) {
    const element = document.createElement(tagName)
    element.className = className
    return element
}

function createTodo(title, desc, id) {
    const li = createElement('li', 'todos__item')
    li.id = id

    const _title = createElement('span', 'todos__span')
    _title.textContent = title

    const _desc = createElement('span', 'todos__span')
    _desc.textContent = desc

    const actions = createElement('div', 'todos__actions')

    const editBtn = createElement('button', 'todos__action')
    editBtn.innerHTML = `<i class='bx bxs-edit-alt'></i>`

    editBtn.addEventListener('click', () => {
        method = 'PUT'
        editedID = editBtn.parentElement.parentElement.id
        let editables = editBtn.parentElement.parentElement.querySelectorAll('.todos__span')
        input.value = editables[0].textContent
        textarea.value = editables[1].textContent
    })


    const deleteBtn = createElement('button', 'todos__action')
    deleteBtn.innerHTML = `<i class='bx bxs-trash-alt'></i>`

    deleteBtn.addEventListener('click', async (event) => {
        let id = deleteBtn.parentElement.parentElement.id
        let result = await deleteTodo(id)
        deleteBtn.parentElement.parentElement.remove()
    })

    actions.appendChild(editBtn)
    actions.appendChild(deleteBtn)

    li.appendChild(_title)
    li.appendChild(_desc)
    li.appendChild(actions)

    return li
}

async function getTodos() {
    const response = await fetch('http://localhost:3030/todos', {
        method: 'GET'
    })
    const result = await response.json()
    console.log(result)
    return result
}

async function setTodo(todo) {
    const response = await fetch('http://localhost:3030/todos', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const result = await response.json()
    return result
}

async function deleteTodo(id) {
    const response = await fetch(`http://localhost:3030/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const result = await response.json()
    return result
}

async function editTodo(id, title, desc) {
    const response = await fetch(`http://localhost:3030/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, desc })
    })
    const result = await response.json()
    return result
}

window.addEventListener('DOMContentLoaded', async (event) => {
    const todolist = await getTodos()
    todolist.forEach((item, index) => {
        todos.appendChild(createTodo(item.title, item.desc, item.id))
    })
})

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = input.value
    const desc = textarea.value
    let result;

    if (!title || !desc) {
        return
    }
    if (method !== 'PUT' && method === undefined) {
        result = await setTodo({
            title,
            desc
        })
        todos.appendChild(createTodo(result.newTodo.title, result.newTodo.desc, result.newTodo.id))
    }

    if (method === 'PUT') {
        result = await editTodo(editedID, title, desc)
        todos.textContent = ''
        result.forEach((item, index) => {
            todos.appendChild(createTodo(item.title, item.desc, item.id))
        })
        method = undefined
    }

    input.value = ''
    textarea.value = ''
})
