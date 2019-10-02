
export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8000/api';

export const URL = {
    FARMACI: URL_BASE + '/farmaci',
    ADD_FARMACO: URL_BASE + '/addFarmaco',
    SIGN_IN: URL_BASE + '/signin'
};

export const AUTH_TOKEN = 'AUTH_TOKEN';
