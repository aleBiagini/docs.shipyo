<template>
  <div class="success-response-section">
    <h3 class="success-title">
      <span class="success-badge" :class="statusClass">{{ code }}</span>
      {{ title }}
    </h3>
    
    <div class="success-content">
      <div class="success-description" v-if="description">
        <p>{{ description }}</p>
      </div>
      
      <div class="success-example" v-if="example">
        <h4>Example Response:</h4>
        <pre><code>{{ formattedExample }}</code></pre>
      </div>
      
      <div class="success-details">
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
    type: [String, Object],
    default: ''
  }
})

const statusClass = computed(() => {
  const code = parseInt(props.code)
  if (code >= 200 && code < 300) return 'success'
  return 'info'
})

const formattedExample = computed(() => {
  if (typeof props.example === 'object') {
    return JSON.stringify(props.example, null, 2)
  }
  if (typeof props.example === 'string' && props.example.startsWith('{')) {
    try {
      return JSON.stringify(JSON.parse(props.example), null, 2)
    } catch {
      return props.example
    }
  }
  return props.example
})
</script>

<style scoped>
.success-response-section {
  margin: 2rem 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.success-title {
  margin: 0;
  padding: 1rem;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-bottom: 1px solid var(--vp-c-border);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #166534;
}

.success-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-weight: 700;
  font-size: 0.9rem;
  min-width: 3rem;
  text-align: center;
}

.success-badge.success {
  background: #15803d;
  color: #ffffff;
  border: 1px solid #166534;
}

.success-badge.info {
  background: #1d4ed8;
  color: #ffffff;
  border: 1px solid #1e40af;
}

.success-content {
  padding: 1rem;
}

.success-description {
  margin-bottom: 1rem;
}

.success-description p {
  margin: 0;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.success-example {
  margin: 1rem 0;
}

.success-example h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.success-example pre {
  margin: 0;
  background: var(--vp-code-bg);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85rem;
  border: 1px solid var(--vp-c-border-soft);
}

.success-example code {
  background: none;
  padding: 0;
  color: var(--vp-code-color);
}

.success-details {
  margin-top: 1rem;
}

.success-details h4 {
  margin: 1rem 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  font-weight: 600;
}

.success-details ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.success-details li {
  margin: 0.25rem 0;
  color: var(--vp-c-text-2);
}

.success-details .field-table {
  margin: 1rem 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  overflow: hidden;
}

.success-details .field-table table {
  width: 100%;
  border-collapse: collapse;
}

.success-details .field-table th,
.success-details .field-table td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-border-soft);
}

.success-details .field-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.success-details .field-table td {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.success-details .field-table code {
  background: var(--vp-c-bg-soft);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

/* Dark mode adjustments */
.dark .success-title {
  background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
  color: #6ee7b7;
}

.dark .success-badge.success {
  background: #059669;
  color: #ffffff;
  border-color: #047857;
}

.dark .success-badge.info {
  background: #1e40af;
  color: #93c5fd;
  border-color: #1d4ed8;
}
</style>
