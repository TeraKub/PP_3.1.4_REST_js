const url = '/api/admin/users/'
const dbRoles = [{id: 1, name: "ROLE_USER"}, {id: 2, name: "ROLE_ADMIN"}]

// + User info navbar
const showNavbarInfo = (user) => {
    const navbarInfo = document.getElementById('navbarInfo')
    let result = `
                <span class="navbar-brand">
                    <strong>${user.username}</strong>
                    with roles:
                    <span>${user.rolesToString}</span>
                </span>
                <form action="/logout" method="POST">
                    <button type="submit" class="btn btn-dark">Logout</button>
                </form>
                `
    navbarInfo.innerHTML = result
}
fetch('/api/user/')
    .then(response => response.json())
    .then(data => showNavbarInfo(data))
    .catch(error => console.log(error))

// + All users info tab
let usersInfo = ''
const showUsers = (users) => {
    const container = document.querySelectorAll('tbody')[0]
    users.forEach(user => {
        usersInfo += `
                <tr>
                    <td>${user.id}</td>   
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>                  
                    <td>${user.instrument}</td>   
                    <td>${user.username}</td>   
                    <td>${user.rolesToString}</td>   
                    <td class="text text-white"><a class="btnEdit btn btn-info">Edit</a></td>  
                    <td class="text text-white"><a class="btnDelete btn btn-danger">Delete</a></td>
                </tr>
                `
    })
    container.innerHTML = usersInfo
}
fetch(url)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usersInfo = ''
            showUsers(data)
        })
}

// + User info tab
let userInfo = ''
const showUser = (user) => {
    const container = document.querySelectorAll('tbody')[1]
        userInfo += `
                <tr>
                    <td>${user.id}</td>   
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>                  
                    <td>${user.instrument}</td>   
                    <td>${user.username}</td>   
                    <td>${user.rolesToString}</td>   
                </tr>
                `
    container.innerHTML = userInfo
}
fetch('/api/user/')
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => console.log(error))

// // const usersTableTab = new bootstrap.Tab(document.getElementById('usersTable'))
// const newUserTab = new bootstrap.Tab(document.getElementById('newUser'))
//
// const usersTableTab = document.getElementById('usersTable')

// + Add new user tab
const formNew = document.getElementById('newUserForm')
const name = document.getElementById('name')
const surname = document.getElementById('surname')
const age = document.getElementById('age')
const instrument = document.getElementById('instrument')
const username = document.getElementById('username')
const password = document.getElementById('password')
const roles = document.getElementById('roles')
let option = ''

btnNewUser.addEventListener('click', () => {
    console.log('btnNewUser click')
    name.value = ''
    surname.value = ''
    age.value = ''
    instrument.value = ''
    username.value = ''
    password.value = ''
    roles.innerHTML = `
                        <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                        <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                        `
    option = 'newUser'
})

formNew.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('roles'))
    console.log(
        name.value, surname.value, age.value, instrument.value,
        username.value, password.value, listRoles
    )
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            surname: surname.value,
            age: age.value,
            instrument: instrument.value,
            username: username.value,
            password: password.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    $('.nav-tabs a[href="#usersTable"]').tab('show')
})

// + Edit user modal
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const editForm = document.getElementById('modalEdit')
const nameEdit = document.getElementById('nameEdit')
const surnameEdit = document.getElementById('surnameEdit')
const ageEdit = document.getElementById('ageEdit')
const instrumentEdit = document.getElementById('instrumentEdit')
const usernameEdit = document.getElementById('usernameEdit')
const passwordEdit = document.getElementById('passwordEdit')
const rolesEdit = document.getElementById('rolesEdit')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

let idForm = 0
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    // const name = row.children[1].innerHTML
    // const surname = row.children[2].innerHTML
    // const age = row.children[3].innerHTML
    // const instrument = row.children[4].innerHTML
    // const username = row.children[5].innerHTML
    // // const password = row.children[6].innerHTML
    // const roles = row.children[6].innerHTML
    // console.log(idForm, name, username, roles)
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        nameEdit.value = user.name
        surnameEdit.value = user.surname
        ageEdit.value = user.age
        instrumentEdit.value = user.instrument
        usernameEdit.value = user.username
        passwordEdit.value = ''
        rolesEdit.innerHTML = `
                                <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                                <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                                `
        Array.from(rolesEdit.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        // let listRoles = roleArray(document.getElementById('rolesEdit'))
        // console.log(listRoles)
        // console.log(idForm)
        modalEdit.show()
    }
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('rolesEdit'))
    // console.log(
    //     idForm, nameEdit.value, surnameEdit.value, ageEdit.value,
    //     instrumentEdit.value, usernameEdit.value, passwordEdit.value, listRoles
    // )
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idForm,
            name: nameEdit.value,
            surname: surnameEdit.value,
            age: ageEdit.value,
            instrument: instrumentEdit.value,
            username: usernameEdit.value,
            password: passwordEdit.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalEdit.hide()
})

// + Delete user modal
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const deleteForm = document.getElementById('modalDelete')
const idDelete = document.getElementById('idDelete')
const nameDelete = document.getElementById('nameDelete')
const surnameDelete = document.getElementById('surnameDelete')
const ageDelete = document.getElementById('ageDelete')
const instrumentDelete = document.getElementById('instrumentDelete')
const usernameDelete = document.getElementById('usernameDelete')
const rolesDelete = document.getElementById('rolesDelete')

on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idDelete.value = user.id
        nameDelete.value = user.name
        surnameDelete.value = user.surname
        ageDelete.value = user.age
        instrumentDelete.value = user.instrument
        usernameDelete.value = user.username
        rolesDelete.innerHTML = `
                                    <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                                    <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                                    `
        Array.from(rolesDelete.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalDelete.show()
    }
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url + idForm, {
        method: 'DELETE'
    })
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalDelete.hide()
})

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array;
}

// on(document, 'click', '.btnDelete', e => {
//     const row = e.target.parentNode.parentNode
//     const id = row.firstElementChild.innerHTML
//     fetch(url + id, {
//         method: 'DELETE'
//     })
//         .then(data => showUsers(data))
//         .catch(error => console.log(error))
//         .then(reloadShowUsers)
// })