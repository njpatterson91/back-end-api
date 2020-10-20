module.exports = {
    isRegisterValid,
    isLoginValid
}

function isRegisterValid(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string');
};

function isLoginValid(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string');
};