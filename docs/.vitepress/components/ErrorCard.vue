<template>
  <div class="error-card" :class="type">
    <div class="error-header">
      <span class="error-code">{{ code }}</span>
      <span class="error-title">{{ title }}</span>
    </div>
    
    <div class="error-body">
      <div class="error-response" v-if="response">
        <h4>Response:</h4>
        <pre><code>{{ response }}</code></pre>
      </div>
      
      <div class="error-cause">
        <h4>Cause:</h4>
        <p>{{ cause }}</p>
      </div>
      
      <div class="error-solution">
        <h4>Solution:</h4>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  code: String,    // '401', '403'
  type: String,    // 'unauthorized', 'forbidden'
  title: String,   // 'API Key Missing'
  response: String, // JSON response
  cause: String    // Explanation
})
</script>

<style scoped>
.error-card {
  margin: 1.5rem 0;
  border-radius: 8px;
  border: 1px solid;
  overflow: hidden;
}

.error-card.unauthorized {
  border-color: #f56565;
  background: #fed7d7;
}

.error-card.forbidden {
  border-color: #ed8936;
  background: #feebc8;
}

.error-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.error-code {
  background: rgba(0,0,0,0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
}

.error-body {
  padding: 0 1rem 1rem;
  background: white;
}

.error-body h4 {
  margin: 1rem 0 0.5rem;
  color: #2d3748;
}

.error-response pre {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
