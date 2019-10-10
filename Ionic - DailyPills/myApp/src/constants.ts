
export const USE_PROXY = true;

// export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8000/api';

export const URL_BASE = USE_PROXY ? 'api' : 'http://207.180.252.160:8000/api';

export const URL = {
    FARMACI: URL_BASE + '/farmaci',
    ARMADIETTO: URL_BASE + '/favorite/list',
    ADD_FARMACO: URL_BASE + '/addFarmaco',
    LOGIN: URL_BASE + '/login',
    REGISTER: URL_BASE + '/register'
};

export const AUTH_TOKEN = 'api_token';

export const UTENTE_STORAGE = 'utente';

export const LINGUA = 'lingua';
