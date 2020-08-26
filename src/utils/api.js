import { postLimit } from './constant';

const BASE_URL = 'https://api.dev.paras.id';

export const EXPLORE_URL = (page) =>
  `${BASE_URL}/posts?__skip=${(page - 1) * postLimit}&__limit=${postLimit}&__sort=-createdAt`;
export const MEMORY_GRANTS_URL = `${BASE_URL}/grants?isActive=true`;

export const SEARCH_URL = (query) => `${BASE_URL}/search?id__re=${query}`;

export const PROFILE_URL = (id) => `${BASE_URL}/users?id=${id}`;
export const PROFILE_POST_URL = (id, page) =>
  `${BASE_URL}/posts?owner=${id}&__skip=${
    (page - 1) * postLimit
  }&__limit=${postLimit}&__sort=-createdAt`;

export const MEMENTO_URL = (id) => `${BASE_URL}/mementos?id=${id}`;
export const MEMENTO_POST_URL = (id, page) =>
  `${BASE_URL}/posts?mementoId=${id}&__skip=${
    (page - 1) * postLimit
  }&__limit=${postLimit}&__sort=-createdAt`;

export const SEARCH_USER_SEND = (query) => `${BASE_URL}/users?id__re=${query}`;

export const CREATE_USER = `${BASE_URL}/register`;
export const LOGIN = `${BASE_URL}/login`;
export const VERIFY_USER = `${BASE_URL}/register/confirm`;
export const VERIFY_TOKEN = `${BASE_URL}/verify`;

export const FOLLOWING_LIST = `${BASE_URL}/follow`;

export const HOME_FEED = `${BASE_URL}/feeds`;
export const HOME_PICKS = `${BASE_URL}/timelines?id=editorsPick`;

export const WALLET_BALANCE = (user) => `${BASE_URL}/balances/${user}`;
export const WALLET_HISTORY = `${BASE_URL}/transactions`;

export const USER_MEMENTO = (user) => `${BASE_URL}/mementos?owner=${user}`;
