async function getTodos() {
    const response = await fetch('http://localhost:3030/todos', {
        method: 'GET'
    })
    const result = await response.json()
    return result
}

function createTodo(todo) {
    const li = document.createElement('li')
    li.className = 'todos_item'
    li.innerHTML = `<li class="todos__item">
                        <span class="todos__span">${todo.title}</span>
                        <span class="todos__span">${todo.desc}</span>
                        <div class="todos__actions">
                            <button class="todos__action"><i class='bx bxs-edit-alt'></i></button>
                            <button class="todos__action"><i class='bx bxs-trash-alt'></i></button>
                        </div>
                    </li>`
    document.querySelector('.todos').appendChild(li)
}

window.addEventListener('load', async () => {
    console.log('loading')
    let todos = await getTodos()
    todos.forEach((item, index) => {
        createTodo(item)
    })
})