fetch('http://localhost:3030/todos')
    .then(response => response.json())
    .then(result => console.log(result))