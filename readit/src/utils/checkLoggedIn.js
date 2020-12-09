export const checkLoggedIn = () => {
    const token = localStorage.getItem('token')
    return token
}