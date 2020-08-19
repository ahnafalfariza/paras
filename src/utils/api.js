import { postLimit } from './constant';

const BASE_URL = 'https://api-dev.paras.id';

export const EXPLORE_URL = (page) =>
  `${BASE_URL}/posts?__skip=${(page - 1) * postLimit}&__limit=${postLimit}&__sort=-createdAt`;

export const MEMORY_GRANTS_URL = `${BASE_URL}/grants?isActive=true`;

export const SEARCH_URL = (query) => `${BASE_URL}/search?id__re=${query}`;

export const PROFILE_URL = (id) => `${BASE_URL}/users?id=${id}`;
export const PROFILE_POST_URL = (id, page) =>
  `${BASE_URL}/posts?owner=${id}&__skip=${
    (page - 1) * postLimit
  }&__limit=${postLimit}&__sort=-createdAt`;

export const MEMENTO_URL = () => '';
export const MEMENTO_POST_URL = (id, page) =>
  `${BASE_URL}/posts?mementoId=${id}&__skip=${
    (page - 1) * postLimit
  }&__limit=${postLimit}&__sort=-createdAt`;

export const SEARCH_USER_SEND = (query) => `${BASE_URL}/users?id__re=${query}`;

const DEV_URL = 'https://api.dev.paras.id';
export const CREATE_USER = `${DEV_URL}/register`;
