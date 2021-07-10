document.querySelector('.login_form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const tosend = {
        username: email,
        password: password
    }
    const jsonString = JSON.stringify(tosend);
    login(jsonString);
});

function login(jsonString) {
    const xhr = new XMLHttpRequest;
    xhr.open("POST", "/users/authenticate");
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(jsonString);
    xhr.onload = function () {
        console.log(this.responseText);
        var res = JSON.parse(this.responseText);
        if (res.message == "Username or password is incorrect") console.log(this.responseText);
        else {
            // document.cookie = "token=" + res.token + ";path=/dashboard";
            window.location.href = "/dashboard";
        }
    }
}