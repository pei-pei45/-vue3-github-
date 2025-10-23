<template>
  <div class="user-profile" v-if="user">
    <img :src="user.avatar_url" :alt="user.login" class="avatar">
    <div class="info">
      <h2>{{ props.user.name || user.login }}</h2>
      <p>用户名: {{ user.login }}</p>
      <p>关注者: {{ user.followers }}</p>
      <p>仓库数量: {{ user.public_repos }}</p>
    </div>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  user: {
    type: Object,
    default: null
  }
});
</script>

<style scoped>
.user-profile {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  background: var(--card-bg);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

h2 {
  margin: 0;
  color: var(--text-primary);
}

p {
  margin: 0;
  color: var(--text-secondary);
}
</style>