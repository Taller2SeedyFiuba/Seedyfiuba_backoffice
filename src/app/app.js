// import ApiClient from "communication/client/ApiClient";
// import {getSetting} from "settings";
// import FakeRequester from "communication/requester/FakeRequester";
// import RemoteRequester from "communication/requester/RemoteRequester";

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

    signOutUser() {
        localStorage.setItem("token", "");
        localStorage.setItem("id", "");
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