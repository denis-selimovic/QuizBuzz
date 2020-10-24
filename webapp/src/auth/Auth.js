import { getToken } from "./utils";

class Auth {
    isAuthenticated() {
        return getToken();
    }
}

export default new Auth();