<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <header class="app-header">
      <div class="container">
        <h1 class="app-title">
          <span class="icon">🔍</span>
          Github用户搜索
        </h1>
        <button @click="toggleDarkMode" class="theme-toggle" :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>

    <main class="container">
      <UserSearch @search="fetchUserData" :loading="loading" />
      
      <div v-if="error" class="error-message">
        <span class="error-icon">⚠️</span>
        <p>{{ error }}</p>
        <button @click="error = null" class="dismiss-btn">返回</button>
      </div>

      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>数据加载中</p>
      </div>

      <template v-else-if="user">
        <UserInformation :user="user" />
        <UserRepositories :repos="repos" :loading="reposLoading" />
      </template>

      <div v-else-if="!loading && !error" class="empty-state">
        <div class="empty-icon">👤</div>
        <h2>查询Github用户</h2>
        <p>输入用户名搜索</p>
      </div>

      <div v-if="searchHistory.length > 0" class="search-history">
        <h3>最近搜索</h3>
        <div class="history-chips">
          <button 
            v-for="username in searchHistory" 
            :key="username"
            @click="fetchUserData(username)"
            class="history-chip"
          >
            {{ username }}
          </button>
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <p>Built with Vue 3 • Data from GitHub API</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserSearch from './components/UserSearch.vue';
import UserInformation from './components/UserInformation.vue';
import UserRepositories from './components/UserRepositories.vue';
import { getUser, getUserRepos } from './components/utils/api.js';

const user = ref(null);
const repos = ref([]);
const loading = ref(false);
const reposLoading = ref(false);
const error = ref(null);
const isDarkMode = ref(false);
const searchHistory = ref([]);
const cache = new Map();

// Load preferences from localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkMode.value = true;
  }
  
  const savedHistory = localStorage.getItem('searchHistory');
  if (savedHistory) {
    searchHistory.value = JSON.parse(savedHistory);
  }
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

const addToHistory = (username) => {
  const history = searchHistory.value.filter(u => u !== username);
  history.unshift(username);
  searchHistory.value = history.slice(0, 5); // Keep only last 5
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
};

const fetchUserData = async (username) => {
  if (!username || username.trim() === '') {
    error.value = 'Please enter a valid username';
    return;
  }

  const trimmedUsername = username.trim();
  
  // Check cache first
  if (cache.has(trimmedUsername)) {
    const cached = cache.get(trimmedUsername);
    user.value = cached.user;
    repos.value = cached.repos;
    addToHistory(trimmedUsername);
    return;
  }

  try {
    loading.value = true;
    error.value = null;
    user.value = null;
    repos.value = [];

    // Fetch user information
    const userResponse = await getUser(trimmedUsername);
    user.value = userResponse.data;

    // Fetch user repositories
    reposLoading.value = true;
    const reposResponse = await getUserRepos(trimmedUsername);
    repos.value = reposResponse.data;
    
    // Cache the results
    cache.set(trimmedUsername, {
      user: userResponse.data,
      repos: reposResponse.data
    });

    addToHistory(trimmedUsername);
  } catch (err) {
    if (err.response?.status === 404) {
      error.value = `User "${trimmedUsername}" not found. Please check the username and try again.`;
    } else if (err.response?.status === 403) {
      error.value = 'API rate limit exceeded. Please try again later.';
    } else {
      error.value = 'Failed to fetch user data. Please check your connection and try again.';
    }
    console.error('Error fetching data:', err);
  } finally {
    loading.value = false;
    reposLoading.value = false;
  }
};
</script>

<style>
:root {
  --primary-color: #0ea5e9;
  --primary-hover: #0284c7;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --card-bg: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --error-bg: #fef2f2;
  --error-color: #dc2626;
  --success-color: #16a34a;
  --transition: all 0.3s ease;
}

.dark-mode {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --card-bg: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  --error-bg: #450a0a;
  --error-color: #fca5a5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: var(--transition);
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 1.5rem 0;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: var(--transition);
}

.app-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.app-title .icon {
  font-size: 2rem;
}

.theme-toggle {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: var(--transition);
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

main.container {
  flex: 1;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.error-message {
  background: var(--error-bg);
  color: var(--error-color);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--error-color);
  animation: slideIn 0.3s ease;
}

.error-icon {
  font-size: 1.5rem;
}

.error-message p {
  flex: 1;
  margin: 0;
}

.dismiss-btn {
  background: transparent;
  border: 1px solid var(--error-color);
  color: var(--error-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
}

.dismiss-btn:hover {
  background: var(--error-color);
  color: white;
}

.loading-container {
  text-align: center;
  padding: 3rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--card-bg);
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: var(--shadow);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h2 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: var(--text-secondary);
}

.search-history {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.search-history h3 {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.history-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.history-chip {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
}

.history-chip:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.app-footer {
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  padding: 1.5rem 0;
  text-align: center;
  color: var(--text-secondary);
  margin-top: auto;
}

.app-footer p {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .app-title {
    font-size: 1.25rem;
  }

  .app-title .icon {
    font-size: 1.5rem;
  }

  .container {
    padding: 0 1rem;
  }

  .empty-state {
    padding: 2rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
  }
}
</style>