export const BACKEND_ROUTES_AUTH = {
    register: "/auth/register",
    login: "/auth/login",
    auth: "/auth"
}

export const BACKEND_ROUTES_CHATS = {
    initial: "/users/initial",
    userPhotos: "/users/photos"
}
export const BACKEND_ROUTES = {
    ...BACKEND_ROUTES_AUTH,
    ...BACKEND_ROUTES_CHATS
}

export const webSocketServerUrl = `wss://socketsbay.com/wss/v2/1/demo/`