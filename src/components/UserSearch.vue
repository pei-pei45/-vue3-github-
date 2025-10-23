<template>
    <div class="search-bar">
        <h1>github用户查找</h1>
        <input type="text" placeholder="请输入github用户名" @keyup.enter="handleSearch" v-model="username">
        <button @click="handleSearch">搜索</button>
    </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['search']);
const username = ref('');

const handleSearch = () => {
  if (username.value.trim()) {
    emits('search', username.value.trim());
  } else {
    alert('请输入用户名');
  }
};
</script>
<style>

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background: #0ea5e9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0284c7;
}
</style>