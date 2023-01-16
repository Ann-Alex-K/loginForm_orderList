window.onload = () => {
    renderUser();
    renderSpinner();
    fetchOrders();

    // --- dropdown menu logic --- //
    let dropdownTitle = document.querySelector('.dropdown-toggle');
    document.querySelectorAll('.dropdown-item').forEach(e => {
        e.addEventListener('click', e => {
            const menu = e.currentTarget.dataset.type
            if (menu === '1') {
                dropdownTitle.textContent = 'По номеру заказа';
                const sortById = orders.sort(function (a, b) {
                    if (b.id < a.id) {
                        return -1;
                    }
                    if (b.id > a.id) {
                        return 1;
                    }
                    return 0;
                });
                sortById.reverse();
                renderOrders(sortById);
            }
            if (menu === '2') {
                dropdownTitle.textContent = 'По email';
                const sortByEmail = orders.sort(function (a, b) {
                    if (b.email < a.email) {
                        return -1;
                    }
                    if (b.email > a.email) {
                        return 1;
                    }
                    return 0;
                });
                renderOrders(sortByEmail);
            }
            if (menu === '3') {
                dropdownTitle.textContent = 'По сумме';
                const sortByAmount = orders.sort(function (a, b) {
                    if (b.amount < a.amount) {
                        return -1;
                    }
                    if (b.amount > a.amount) {
                        return 1;
                    }
                    return 0;
                });
                renderOrders(sortByAmount);
            }
            if (menu === '4') {
                dropdownTitle.textContent = 'По дате';
                const sortByDate = orders.sort(function (a, b) {
                    if (b.date < a.date) {
                        return -1;
                    }
                    if (b.date > a.date) {
                        return 1;
                    }
                    return 0;
                });
                renderOrders(sortByDate);
            }
        })
    })
}


let orders = [],
    nextOrders = [],
    user = {};

//---- get request ---//
async function fetchOrders() {
    const response = await fetch(
        `https://my-json-server.typicode.com/Ann-Alex-K/demo/orders`
    );
    if (response.status != 200) {
        console.log('error');
    } else {
        orders = await response.json();
        renderOrders(orders);
    }
}

//--- render ---//
function renderUser() {
    const userWrapper = document.querySelector('.user-wrapper');

    const userBox = document.createElement('div');
    userBox.classList.add('user-box');
    user = JSON.parse(localStorage.getItem('user'));

    const addHtml = `
                <div class="img-box">
                    <img width="36px" height="36px"
                        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_299586.png&f=1&nofb=1&ipt=90da98408c493ccc86de08b3b7eba64ab26d472202a7f31420c6543791fd77e3&ipo=images"
                        alt="user-img">
                </div>
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <span>${user.email}</span>
                </div>
    `

    userBox.innerHTML += addHtml;
    userWrapper.appendChild(userBox);
}

function renderOrders(list) {
    const orderWrapper = document.querySelector('.order-list-wrapper-body');
    orderWrapper.innerHTML = '';
    //rendering of the first 5 displayed orders
    for (let i = 0; i < 5; i++) {
        const listItem = document.createElement('div');
        listItem.classList.add('list-items');

        const addHtml = `
        <span>${list[i].id}</span>
        <span>${list[i].email}</span>
        <span>${list[i].amount}</span>
        <span>${list[i].date}</span>
        `
        listItem.innerHTML += addHtml;
        orderWrapper.appendChild(listItem);
    }
    //rendering of hidden orders
    for (let i = 5; i < list.length; i++) {
        const listItem = document.createElement('div');
        listItem.classList.add('hidden');

        const addHtml = `
        <span>${list[i].id}</span>
        <span>${list[i].email}</span>
        <span>${list[i].amount}</span>
        <span>${list[i].date}</span>
        `
        listItem.innerHTML += addHtml;
        orderWrapper.appendChild(listItem);
    }
}

function renderSpinner() {
    const spinnerBox = document.querySelector('.spinner-wrapper');
    const spinner = document.createElement('div')
    spinner.classList.add('spinner');
    spinnerBox.appendChild(spinner);
}

//--- show hidden orders ---//
function addMore() {
    let hidden = document.querySelectorAll('.hidden'),
        count = 0;

    count += 5;
    if (count <= hidden.length) {
        for (let i = 0; i < count; i++) {
            hidden[i].classList.remove('hidden')
            hidden[i].classList.add('list-items')
        }
    }
}

//--- leave user page ---//
function logout() {
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}