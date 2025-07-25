<template>
  <div class="code-block-container">
    <div class="code-block-header">
      <span class="filename">{{ filename }}</span>
      <button class="copy-button" @click="copyCode">
        {{ copyButtonText }}
      </button>
    </div>
    
    <pre><code ref="codeElement" :class="`language-${language}`">{{ code }}</code></pre>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// Define the component's props
const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    default: '',
  },
});

const codeElement = ref(null);
const copyButtonText = ref('Copy');

// Highlight the code block after the component is mounted
onMounted(() => {
  if (codeElement.value) {
    hljs.highlightElement(codeElement.value);
  }
});

// Function to copy the code to the clipboard
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copyButtonText.value = 'Copied!';
    setTimeout(() => {
      copyButtonText.value = 'Copy';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code: ', err);
    copyButtonText.value = 'Error!';
  }
};
</script>

<style scoped>
.code-block-container {
  background-color: #282c34; /* atom-one-dark background color */
  border-radius: 8px;
  margin: 1.5em 0;
  overflow: hidden; /* Important for border-radius */
}

.code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #21252b;
  padding: 0.5em 1em;
  border-bottom: 1px solid #181a1f;
}

.filename {
  color: #abb2bf;
  font-family: sans-serif;
  font-size: 0.85em;
}

.copy-button {
  background-color: #374151;
  color: white;
  border: 1px solid #4b5563;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 0.8em;
  transition: all 0.2s;
}

.copy-button:hover {
  background-color: #4b5563;
}

/* Let highlight.js handle the padding and styling of the code itself */
pre code {
  margin: 0;
  padding: 1.25em;
}
</style>