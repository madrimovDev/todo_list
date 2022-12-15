const todos = document.querySelector('.todos')

function createElement(tagName, className){
    const element = document.createElement(tagName)
    element.className = className
    return element
}

function createTodo(title, desc){
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