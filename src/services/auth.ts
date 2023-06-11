import { fromCript, toCript } from '../utils/functions';

/**
 *  PANEL AUTH
 */

// CONSTS TO USE IN CODE
const TOKEN_KEY = toCript(process.env.NEXT_PUBLIC_TOKEN_KEY);
const USER_KEY = toCript(process.env.NEXT_PUBLIC_USER_KEY);
const LAST_LOGIN_KEY = toCript(
    process.env.NEXT_PUBLIC_LAST_LOGIN_KEY
);
const REMEMBER_USER_KEY = toCript(
    process.env.NEXT_PUBLIC_REMEMBER_USER_KEY
);

const getToken = () => {
    let token = null
    if (typeof window !== 'undefined')
        token = fromCript(localStorage.getItem(TOKEN_KEY));

    return token;
};

const updateLocalUser = (user) => {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, toCript(JSON.stringify(user)));
};

const getUser = () => {
    let userStr = localStorage.getItem(USER_KEY);
    return JSON.parse(fromCript(userStr));
};

const getRemember = () => {
    let remember = fromCript(localStorage.getItem(REMEMBER_USER_KEY));
    if (remember === 'true') {
        return true;
    }
    return false;
};

const doLocalLogin = async (user, token, remember) => {
    try {
        await localStorage.setItem(TOKEN_KEY, toCript(token));
        await localStorage.setItem(USER_KEY, toCript(JSON.stringify(user)));
        await localStorage.setItem(REMEMBER_USER_KEY, toCript(remember));
        await localStorage.setItem(LAST_LOGIN_KEY, new Date().toString());
        return true;
    } catch (error) {
        doLocalLogout();
        return false;
    }
};

const doLocalLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    return true;
};

const isAuthenticated = () => {
    let localToken = localStorage.getItem(TOKEN_KEY);
    let token = fromCript(localToken);
    let user = fromCript(localStorage.getItem(USER_KEY));

    if (localToken != null && token != null && user != null) {
        return true;
    }

    return false;
};

/**
 *
 *  end PANEL AUTH
 */

export {
    getToken,
    updateLocalUser,
    getUser,
    getRemember,
    doLocalLogin,
    doLocalLogout,
    isAuthenticated
};
