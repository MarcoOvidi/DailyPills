
export const USE_PROXY = true;

// export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8000/api';

export const URL_BASE = USE_PROXY ? 'api' : 'http://207.180.252.160:8000/api';

export const URL = {
    FARMACI: URL_BASE + '/farmaci',
    ARMADIETTO: URL_BASE + '/favorite/list',
    SPECIFICHE: URL_BASE + '/specifiche',
    ADD_FARMACO: URL_BASE + '/favorite/add',
    REMOVE_FARMACO: URL_BASE + '/favorite/remove',
    PIANI: URL_BASE + '/piani',
    ADD_PIANO: URL_BASE + '/createpiano',
    LOGIN: URL_BASE + '/login',
    REGISTER: URL_BASE + '/register',
    PIANO_FARMACIS: URL_BASE + '/farmacipiano',
    REMOVE_PIANO: URL_BASE + '/removepiano',
    INSERT_FARMACO_PIANO: URL_BASE + '/insertfarmaco',
    REMOVE_FARMACO_PIANO: URL_BASE + '/removefarmaco',
    ALL_FARMACI: URL_BASE + '/allfarmacipiano',
    MODIFY_PIANO: URL_BASE + '/modifypiano',
    CONFIRM: URL_BASE + '/assunzione'
};

export const AUTH_TOKEN = 'api_token';

export const UTENTE_STORAGE = 'utente';

export const LINGUA = 'lingua';
