<template>
  <div class="search-container">
    <div class="search-bar">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="输入用户名搜索 GitHub 用户" 
          @keyup.enter="handleSearch"
          v-model="username"
          :disabled="loading"
          class="search-input"
          aria-label="GitHub username"
          autocomplete="off"
        >
        <button 
          v-if="username" 
          @click="clearSearch" 
          class="clear-btn"
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      </div>
      <button 
        @click="handleSearch" 
        :disabled="loading || !username.trim()"
        class="search-btn"
        type="button"
      >
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['search']);
const username = ref('');

const handleSearch = () => {
  const trimmed = username.value.trim();
  if (trimmed) {
    emits('search', trimmed);
  }
};

const clearSearch = () => {
  username.value = '';
};
</script>

<style scoped>
.search-container {
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.search-input-wrapper {
  flex: 1;
  min-width: 250px;
  position: relative;
  display: flex;
  align-items: center;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  transition: var(--transition);
}

.search-input-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  font-size: 1.25rem;
  opacity: 0.5;
  pointer-events: none;
}

.search-input {
  flex: 1;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--text-primary);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.search-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.clear-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  border-radius: 4px;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.search-btn {
  padding: 0.875rem 2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: var(--transition);
  white-space: nowrap;
}

.search-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.search-btn:active:not(:disabled) {
  transform: translateY(0);
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.search-tips {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.search-tips p {
  margin: 0;
}

.search-tips strong {
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .search-bar {
    flex-direction: column;
  }

  .search-input-wrapper {
    width: 100%;
  }

  .search-btn {
    width: 100%;
  }
}
</style>