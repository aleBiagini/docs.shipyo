<template>
  <div class="header-badge">
    <span class="badge" :class="type">{{ icon }} {{ label }}</span>
    <div class="headers">
      <code v-for="header in headers" :key="header">{{ header }}</code>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: String,   // 'anonymous', 'apikey', 'jwt'
  icon: String,   // '🌐', '🔑', '🔒'
  label: String,  // 'Anonymous', 'API Key', 'JWT Required'
  headers: Array  // ['x-api-key: <key>', 'Authorization: Bearer <token>']
})
</script>

<style scoped>
.header-badge {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.badge.anonymous { 
  background: #e7f5e7; 
  color: #2d5f2d; 
}

.badge.apikey { 
  background: #fff3e0; 
  color: #8b4513; 
}

.badge.jwt { 
  background: #e3f2fd; 
  color: #1565c0; 
}

.headers code {
  display: block;
  margin: 0.25rem 0;
  padding: 0.25rem 0.5rem;
  background: var(--vp-code-bg);
  border-radius: 3px;
  font-size: 0.875rem;
}
</style>
