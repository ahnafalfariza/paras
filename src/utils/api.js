import { postLimit, notifLimit, commentLimit, txLimit, defaultLimit } from './constant';

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
export const ALL_FOLLOWING_LIST = `${BASE_URL}/follow`;
export const FOLLOWING_LIST = (page) =>
  `${BASE_URL}/follow?__skip=${
    (page - 1) * defaultLimit
  }&__limit=${defaultLimit}&__sort=-createdAt`;
export const REGISTER_DEVICE = `${BASE_URL}/register/device`;

export const HOME_FEED = (page) =>
  `${BASE_URL}/feeds?__skip=${(page - 1) * postLimit}&__limit=${postLimit}`;
export const HOME_PICKS = `${BASE_URL}/timelines?id=editorsPick`;
export const HOME_TOP = (page) =>
  `${BASE_URL}/feeds/top?__skip=${(page - 1) * postLimit}&__limit=${postLimit}`;

export const HOME_NOTIFICATION = (page) =>
  `${BASE_URL}/notifications?__skip=${
    (page - 1) * notifLimit
  }&__limit=${notifLimit}&__sort=-createdAt`;

//wallet
export const WALLET_BALANCE = (userId) => `${BASE_URL}/balances/${userId}`;
export const WALLET_HISTORY = (userId, page) =>
  `${BASE_URL}/transactions?id=${userId}&__skip=${
    (page - 1) * txLimit
  }&__limit=${txLimit}&__sort=-createdAt`;
export const WALLET_SEND = `${BASE_URL}/wallet/transfer`;
export const WALLET_PIECE = `${BASE_URL}/wallet/piece`;
export const SEARCH_USER_SEND = (query) => `${BASE_URL}/users?id__re=${query}`;

export const USER_MEMENTO = (user) => `${BASE_URL}/mementos?owner=${user}`;
export const SEARCH_MEMENTO = (query) => `${BASE_URL}/mementos?id__re=${query}`;
export const EDIT_MEMENTO = (mementoId) => `${BASE_URL}/mementos/${mementoId}`;
export const CREATE_MEMENTO = `${BASE_URL}/mementos`;
export const ARCHIEVE_MEMENTO = (mementoId) => `${BASE_URL}/mementos/${mementoId}/archieve`;
export const UNARCHIEVE_MEMENTO = (mementoId) => `${BASE_URL}/mementos/${mementoId}/unarchieve`;
export const LIST_MEMENTO = (userId) => `${BASE_URL}/mementos?owner=${userId}&__sort=-createdAt`;

//newPost
export const CREATE_POST = `${BASE_URL}/posts`;
export const DELETE_POST = (postId) => `${BASE_URL}/posts/${postId}`;
export const EDIT_POST = (postId) => `${BASE_URL}/posts/${postId}`;
export const META_URL = (link) => `${BASE_URL}/metaget?link=${link}`;
export const REDACT_POST = (postId) => `${BASE_URL}/posts/${postId}/redact`;
export const POST_BY_ID = (postId) => `${BASE_URL}/posts?id=${postId}`;

//comment
export const COMMENT = (postId, page) =>
  `${BASE_URL}/comments?postId=${postId}&__skip=${
    (page - 1) * commentLimit
  }&__limit=${commentLimit}&__sort=-createdAt`;
export const POST_COMMENT = `${BASE_URL}/comments`;
export const DELETE_COMMENT = (commentId) => `${BASE_URL}/comments/${commentId}`;

//follow unfollow
export const FOLLOW = `${BASE_URL}/follow`;
export const UNFOLLOW = `${BASE_URL}/unfollow`;

//uplaod
export const UPLOAD = `${BASE_URL}/upload`;

//update
export const UPDATE_PROFILE = (userId) => `${BASE_URL}/users/${userId}`;

export const ACTIVITY_POINT = (userId) => `${BASE_URL}/activityPoint/${userId}`;
