<template>
  <div class="repos-list" v-if="repos.length">
    <h3>前4个仓库（按星数排序）</h3>
    <div class="repos-grid">
      <div class="repo-card" v-for="repo in repos" :key="repo.id">
        <h4><a :href="repo.html_url" target="_blank">{{ repo.name }}</a></h4>
        <p class="description">{{ repo.description || '无描述' }}</p>
        <div class="stats">
          <span>分支: {{ repo.forks_count }}</span>
          <span>星标: {{ repo.stargazers_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  repos: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.repos-list {
  margin: 20px 0;
}

h3 {
  color: var(--text-primary);
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.repo-card {
  padding: 16px;
  border-radius: 8px;
  background: var(--card-bg);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h4 {
  margin: 0 0 8px 0;
}

a {
  color: #0ea5e9;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.description {
  color: var(--text-secondary);
  font-size: 0.9em;
  margin: 8px 0;
}

.stats {
  display: flex;
  gap: 16px;
  font-size: 0.8em;
  color: var(--text-secondary);
  margin-top: 12px;
}
</style>