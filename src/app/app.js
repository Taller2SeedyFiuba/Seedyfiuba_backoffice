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

    // _setUpApiClient() {
    //     const requester = this._setUpRequester();
    //     this._apiClient = new ApiClient(requester);
    // }

    // _setUpRequester() {
    //     const usingFakeApi = getSetting("USING_FAKE_API");
    //     if (usingFakeApi) {
    //         return new FakeRequester();
    //     }

    //     const remoteApiUrl = getSetting("API_URL");
    //     return new RemoteRequester(remoteApiUrl);
    // }
}

export let app = new App();