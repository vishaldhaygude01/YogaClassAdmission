
class AuthService {
    static login(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static logout() {
        localStorage.removeItem('user');
    }

    static getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    static isLoggedIn() {
        return !!localStorage.getItem('user');
    }
}

export default AuthService;
