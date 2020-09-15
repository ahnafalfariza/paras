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

//auth
export const CREATE_USER = `${BASE_URL}/register`;
export const LOGIN = `${BASE_URL}/login`;
export const VERIFY_USER = `${BASE_URL}/register/confirm`;
export const VERIFY_TOKEN = `${BASE_URL}/verify`;
export const FOLLOWING_LIST = `${BASE_URL}/follow`;
export const REGISTER_DEVICE = `${BASE_URL}/register/device`;

export const HOME_FEED = (page) =>
  `${BASE_URL}/feeds?__skip=${(page - 1) * postLimit}&__limit=${postLimit}`;
export const HOME_PICKS = `${BASE_URL}/timelines?id=editorsPick`;

//wallet
export const WALLET_BALANCE = (userId) => `${BASE_URL}/balances/${userId}`;
export const WALLET_HISTORY = (userId) => `${BASE_URL}/transactions?id=${userId}`;
export const WALLET_SEND = `${BASE_URL}/wallet/transfer`;
export const SEARCH_USER_SEND = (query) => `${BASE_URL}/users?id__re=${query}`;

//newPost
export const USER_MEMENTO = (user) => `${BASE_URL}/mementos?owner=${user}`;
export const SEARCH_MEMENTO = (query) => `${BASE_URL}/mementos?id__re=${query}`;
export const CREATE_MEMENTO = `${BASE_URL}/mementos`;
export const CREATE_POST = `${BASE_URL}/posts`;
export const DELETE_POST = (postId) => `${BASE_URL}/posts/${postId}`;
export const EDIT_POST = (postId) => `${BASE_URL}/posts/${postId}`;
export const META_URL = (link) => `${BASE_URL}/metaget?link=${link}`;
export const REDACT_POST = (postId) => `${BASE_URL}/posts/${postId}/redact`;

//comment
export const COMMENT = (postId) => `${BASE_URL}/comments?postId=${postId}`;
export const POST_COMMENT = `${BASE_URL}/comments`;
export const DELETE_COMMENT = (commentId) => `${BASE_URL}/comments/${commentId}`;

//follow unfollow
export const FOLLOW = `${BASE_URL}/follow`;
export const UNFOLLOW = `${BASE_URL}/unfollow`;
