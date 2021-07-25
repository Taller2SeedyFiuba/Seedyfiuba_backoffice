class App {
    routes() {
        return {
            login: '/',
            resetpassword: '/resetpassword',
            signup: '/signup',
            signupdata: '/signupdata',
            users: '/users',
            userid: '/users/:id',
            projects: '/projects',
            projectid: '/projects/:id',
            servers: '/servers',
            metrics: '/metrics'
        }
    }

    loginUser(token) {
        localStorage.setItem("token", token);
    }

    loginRegisteredUSer(id) {
        localStorage.setItem("id", id);
    }

    setEmail(email) {
        localStorage.setItem("email", email);
    }
    
    signOutUser() {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("email");
    }
    
    getEmail() {
        return localStorage.getItem("email");
    }
    
    getToken() {
        return localStorage.getItem("token");
    }

    thereIsLoggedInUser() {
        return localStorage.getItem("token");
    }

    thereIsRegisteredUser() {
        return localStorage.getItem("id");
    }
}

export let app = new App();