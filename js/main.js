const todos = document.querySelector('.todos')
const form = document.querySelector('.main-form')
const input = document.querySelector('.form-input')
const textarea = document.querySelector('.form-textarea')

function createElement(tagName, className) {
    const element = document.createElement(tagName)
    element.className = className
    return element
}

function createTodo(title, desc) {
    const li = createElement('li', 'todos__item')

    const _title = createElement('span', 'todos__span')
    _title.textContent = title

    const _desc = createElement('span', 'todos__span')
    _desc.textContent = desc

    const actions = createElement('div', 'todos__actions')

    const editBtn = createElement('button', 'todos__action')
    editBtn.innerHTML = `<i class='bx bxs-edit-alt'></i>`

    const deleteBtn = createElement('button', 'todos__action')
    deleteBtn.innerHTML = `<i class='bx bxs-trash-alt'></i>`

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
    const result = response.json()
    console.log(result)
    return result
}

window.addEventListener('DOMContentLoaded', async (event) => {
    const todolist = await getTodos()

    todolist.forEach((item, index) => {
        todos.appendChild(createTodo(item.title, item.desc))
    })
})

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = input.value
    const desc = textarea.value
    console.log('render')
    if (!title || !desc) {
        return
    }

    const result = await setTodo({
        title,
        desc
    })

    todos.appendChild(createTodo(result.newTodo.title, result.newTodo.desc))
    
    input.value = ''
    textarea.value = ''
})

// async
// sync