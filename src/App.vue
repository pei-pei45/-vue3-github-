<template>
    <div>
      <UserSearch @search="fetchUserData"></UserSearch>
      <UserInformtion :user="user"></UserInformtion>
      <UserRepositories :repos="repos"></UserRepositories>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import UserSearch from './components/UserSearch.vue';
import UserInformtion from './components/UserInformtion.vue';
import UserRepositories from './components/UserRepositories.vue';
// import SearchBar from '../components/SearchBar.vue';
// import UserProfile from '../components/UserProfile.vue';
// import RepositoriesList from '../components/RepositoriesList.vue';
import { getUser, getUserRepos } from '../src/components/utils/api.js';

const user = ref(null);
const repos = ref([]);

const fetchUserData = async (username) => {
  try {
    // 先清空之前的数据
    user.value = null;
    repos.value = [];

    // 获取用户信息
    const userResponse = await getUser(username);
    user.value = userResponse.data;

    // 获取用户仓库
    const reposResponse = await getUserRepos(username);
    repos.value = reposResponse.data;
  } catch (error) {
    alert('无效的用户名，请重试');
    console.error('获取数据失败:', error);
  }
};
</script>
<style>
    
</style>