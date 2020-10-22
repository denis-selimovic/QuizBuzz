export const saveUser = user => {
    localStorage.setItem("user", JSON.stringify(user));
}

export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export const saveToken = token => {
    localStorage.setItem("token", token);
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const logout = () => {
    localStorage.clear();
}