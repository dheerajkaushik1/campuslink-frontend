const ADMIN_EMAIL = "dheerajkaushik428@gmail.com";

export function isAdminUser() {
    return Boolean(localStorage.getItem("token")) && localStorage.getItem("email") === ADMIN_EMAIL;
}