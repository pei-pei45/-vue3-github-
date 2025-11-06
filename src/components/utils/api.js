import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

// 获取用户信息
export const getUser = (username) => {
  return api.get(`/users/${username}`);
};

// 获取用户仓库
export const getUserRepos = (username) => {
  return api.get(`/users/${username}/repos`, {
    params: {
      sort: 'updated',
      per_page: 8,
      direction: 'desc'
    }
  });
};