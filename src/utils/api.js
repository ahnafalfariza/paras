export const BASE_URL = 'https://api-dev.paras.id/';

export const EXPLORE_URL = (page, limit = 10) =>
  `${BASE_URL}posts?__skip=${(page - 1) * limit}&__limit=${limit}&__sort=-createdAt`;

export const MEMORY_GRANTS_URL = `${BASE_URL}grants?isActive=true`;

export const SEARCH_URL = (query) => `${BASE_URL}search?id__re=${query}`;

export const PROFILE_URL = (id) => `${BASE_URL}/users?id=${id}`;
export const PROFILE_POST = (id) => `${BASE_URL}/posts?owner=${id}`;

export const MEMENTO_URL = () => ``;
export const MEMENTO_POST_URL = () => ``;
