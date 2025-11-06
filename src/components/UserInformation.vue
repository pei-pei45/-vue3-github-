<template>
  <div class="user-profile" v-if="user">
    <div class="profile-header">
      <img :src="user.avatar_url" :alt="`${user.login}'s avatar`" class="avatar">
      <div class="profile-info">
        <div class="name-section">
          <h2>{{ user.name || user.login }}</h2>
          <a :href="user.html_url" target="_blank" rel="noopener noreferrer" class="username">
            @{{ user.login }}
            <span class="external-icon">↗</span>
          </a>
        </div>
        <p v-if="user.bio" class="bio">{{ user.bio }}</p>
        <div class="meta-info">
          <span v-if="user.location" class="meta-item">
            📍 {{ user.location }}
          </span>
          <span v-if="user.company" class="meta-item">
            🏢 {{ user.company }}
          </span>
          <span v-if="user.blog" class="meta-item">
            <a :href="formatUrl(user.blog)" target="_blank" rel="noopener noreferrer">
              🔗 {{ user.blog }}
            </a>
          </span>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <div class="stat-value">{{ formatNumber(user.followers) }}</div>
          <div class="stat-label">粉丝</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👤</div>
        <div class="stat-content">
          <div class="stat-value">{{ formatNumber(user.following) }}</div>
          <div class="stat-label">关注</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-content">
          <div class="stat-value">{{ formatNumber(user.public_repos) }}</div>
          <div class="stat-label">仓库</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⭐</div>
        <div class="stat-content">
          <div class="stat-value">{{ formatNumber(user.public_gists) }}</div>
          <div class="stat-label">星星</div>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <button @click="copyUsername" class="action-btn">
        {{ copied ? '✓ 已复制' : '📋 复制用户名 ' }}
      </button>
      <button @click="shareProfile" class="action-btn">
        🔗 分享链接
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  user: {
    type: Object,
    default: null
  }
});

const copied = ref(false);

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const formatUrl = (url) => {
  if (!url.startsWith('http')) {
    return 'https://' + url;
  }
  return url;
};

const copyUsername = async () => {
  const username = document.querySelector('.username')?.textContent?.replace('@', '').trim();
  if (username) {
    try {
      await navigator.clipboard.writeText(username);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
};

const shareProfile = async () => {
  const url = document.querySelector('.username')?.href;
  if (url) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GitHub Profile',
          url: url
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Profile link copied to clipboard!');
    }
  }
};
</script>

<style scoped>
.user-profile {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: var(--shadow-lg);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--border-color);
  box-shadow: var(--shadow-lg);
  transition: var(--transition);
}

.avatar:hover {
  transform: scale(1.05);
}

.profile-info {
  flex: 1;
  min-width: 250px;
}

.name-section {
  margin-bottom: 0.75rem;
}

h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
}

.username {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 1.125rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: var(--transition);
}

.username:hover {
  text-decoration: underline;
}

.external-icon {
  font-size: 0.875rem;
}

.bio {
  color: var(--text-primary);
  margin: 1rem 0;
  line-height: 1.6;
  font-size: 1rem;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.meta-item {
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-item a {
  color: var(--primary-color);
  text-decoration: none;
}

.meta-item a:hover {
  text-decoration: underline;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: var(--transition);
  border: 1px solid var(--border-color);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.action-btn {
  flex: 1;
  min-width: 150px;
  padding: 0.75rem 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: var(--transition);
}

.action-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

@media (max-width: 768px) {
  .user-profile {
    padding: 1.5rem;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}
</style>