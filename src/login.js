window.onload = () => {
    fetchUsers();
}

let users = [],
    user = {};

//---- get request ---//
async function fetchUsers() {
    const response = await fetch(
        `https://my-json-server.typicode.com/Ann-Alex-K/demo/users`
    );
    if (response.status != 200) {
        console.log('error');
    } else {
        users = await response.json();
    }
}

//--- user search by email and password ---//
function searchUser() {
    let email = document.querySelector('.email').value,
        pas = document.querySelector('.password').value,
        hint = document.querySelector('.hint');

    user = users.find((user) => user.email == email && user.password == pas);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'pages/order-list.html';
    } else {
        hint.innerHTML = 'Возможно, Вы забыли пароль';
    }
}

//--- Show data of existing users ---//
function hint() {
    const hint = document.querySelector('.hint');
    hint.innerHTML = '';
    const hintBox = document.createElement('div');
    hintBox.classList.add('user-data');

    const addHtml = `
                <p>log: admin@example.com<br> pas: admin</p>
                <p>log: manager@example.com<br> pas: manager</p>
    `

    hintBox.innerHTML += addHtml;
    hint.appendChild(hintBox);
}