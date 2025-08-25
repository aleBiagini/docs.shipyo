<template>
  <div class="status-code-section">
    <h3 class="status-title">
      <span class="status-badge" :class="statusClass">{{ code }}</span>
      {{ title }}
    </h3>
    
    <div class="status-content">
      <div class="status-description" v-if="description">
        <p>{{ description }}</p>
      </div>
      
      <div class="status-example" v-if="example">
        <h4>Example Response:</h4>
        <pre><code>{{ example }}</code></pre>
      </div>
      
      <div class="status-details">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  code: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  example: {
    type: String,
    default: ''
  }
})

const statusClass = computed(() => {
  const code = parseInt(props.code)
  if (code >= 200 && code < 300) return 'success'
  if (code >= 400 && code < 500) return 'client-error'
  if (code >= 500) return 'server-error'
  return 'info'
})
</script>

<style scoped>
.status-code-section {
  margin: 2rem 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.status-title {
  margin: 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-weight: 700;
  font-size: 0.9rem;
  min-width: 3rem;
  text-align: center;
}

.status-badge.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.status-badge.client-error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.status-badge.server-error {
  background: #451a03;
  color: #ffffff;
  border: 1px solid #92400e;
}

.status-badge.info {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.status-content {
  padding: 1rem;
}

.status-description {
  margin-bottom: 1rem;
}

.status-description p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.status-example {
  margin: 1rem 0;
}

.status-example h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.status-example pre {
  margin: 0;
  background: var(--vp-code-bg);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85rem;
}

.status-example code {
  background: none;
  padding: 0;
  color: var(--vp-code-color);
}

.status-details {
  margin-top: 1rem;
}

/* Dark mode adjustments */
.dark .status-badge.success {
  background: #064e3b;
  color: #6ee7b7;
  border-color: #065f46;
}

.dark .status-badge.client-error {
  background: #7f1d1d;
  color: #fca5a5;
  border-color: #991b1b;
}

.dark .status-badge.info {
  background: #1e3a8a;
  color: #93c5fd;
  border-color: #1d4ed8;
}
</style>
