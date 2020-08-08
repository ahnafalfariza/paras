export const BASE_URL = 'https://api-dev.paras.id/';

export const EXPLORE_URL = (page, limit = 10) =>
  `${BASE_URL}posts?__skip=${(page - 1) * limit}&__limit=${limit}&__sort=-createdAt`;

export const PROFILE_URL = () => '';
