document.querySelector('.form-signin').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const tosend = {
        username: email,
        password: password
    }
    const jsonString = JSON.stringify(tosend);
    console.log(jsonString);
    login(jsonString);
});

function login(jsonString) {
    console.log(jsonString);
    const xhr = new XMLHttpRequest;
    xhr.open("POST", "http://localhost:4000/users/authenticate");
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(jsonString);
    xhr.onload = function() {
        console.log(this.responseText);
    }
}