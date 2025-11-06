<template>
  <div class="repos-section">
    <div class="section-header">
      <h3>
        <span class="header-icon">📚</span>
        仓库展示
      </h3>
      <div class="repo-count">{{ repos.length }} repositories</div>
    </div>

    <div v-if="loading" class="repos-loading">
      <div class="skeleton-card" v-for="i in 4" :key="i"></div>
    </div>

    <div v-else-if="repos.length" class="repos-grid">
      <div class="repo-card" v-for="repo in repos" :key="repo.id">
        <div class="repo-header">
          <h4>
            <a :href="repo.html_url" target="_blank" rel="noopener noreferrer">
              {{ repo.name }}
              <span class="external-icon">↗</span>
            </a>
          </h4>
          <span v-if="repo.private" class="private-badge">🔒 Private</span>
        </div>
        
        <p class="description">{{ repo.description || 'No description available' }}</p>
        
        <div class="repo-meta">
          <span v-if="repo.language" class="language">
            <span class="language-dot" :style="{ backgroundColor: getLanguageColor(repo.language) }"></span>
            {{ repo.language }}
          </span>
          <span class="meta-item">
            ⭐ {{ formatNumber(repo.stargazers_count) }}
          </span>
          <span class="meta-item">
            🍴 {{ formatNumber(repo.forks_count) }}
          </span>
          <span v-if="repo.license" class="meta-item">
            📄 {{ repo.license.name }}
          </span>
        </div>

        <div class="repo-footer">
          <span class="updated">
            Updated {{ formatDate(repo.updated_at) }}
          </span>
          <div class="repo-actions">
            <button @click="openRepo(repo.html_url)" class="repo-action-btn" title="Open repository">
              查看
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-repos">
      <div class="no-repos-icon">📭</div>
      <p>无公开仓库</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  repos: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#41b883',
    React: '#61dafb'
  };
  return colors[language] || '#8b949e';
};

const openRepo = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<style scoped>
.repos-section {
  margin: 2rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.header-icon {
  font-size: 1.75rem;
}

.repo-count {
  background: var(--bg-secondary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.repos-loading {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.skeleton-card {
  height: 200px;
  background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--border-color) 50%, var(--bg-secondary) 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 12px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.repo-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeIn 0.5s ease;
}

.repo-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.5rem;
}

h4 {
  margin: 0;
  flex: 1;
}

h4 a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: var(--transition);
}

h4 a:hover {
  text-decoration: underline;
}

.external-icon {
  font-size: 0.875rem;
}

.private-badge {
  background: var(--bg-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.repo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.language {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 500;
}

.language-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.repo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.updated {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.repo-actions {
  display: flex;
  gap: 0.5rem;
}

.repo-action-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.375rem 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);
}

.repo-action-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.no-repos {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.no-repos-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-repos p {
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .repos-grid,
  .repos-loading {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>