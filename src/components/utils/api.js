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

// 获取用户仓库（按星数排序，取前4）
export const getUserRepos = (username) => {
  return api.get(`/users/${username}/repos`, {
    params: {
      sort: 'stars',
      per_page: 4
    }
  });
};