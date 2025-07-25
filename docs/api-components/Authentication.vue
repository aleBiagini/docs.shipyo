<template>
  <div class="authentication-section">
    <h1 id="authentication">Authentication</h1>
    <p>
      To get started with the ShipYo API, the first step is to authenticate your requests. This is done by obtaining a temporary <strong>JWT session token</strong>, which you will use for all subsequent API calls.
    </p>

    <h2 id="get-api-token">1. Get Session Token</h2>
    <p>
      To generate a session token, you need to make a <code>GET</code> request to the <code>/api/Token/generate-from-apikey</code> endpoint. You must include your <strong>global API Key</strong> in the header of your request.
    </p>

    <CodeBlock 
      :code="shellCode" 
      language="shell" 
      filename="Terminal" 
    />

    <h3 id="responses">Responses</h3>
    <p>If your API Key is valid, the server will respond with a <strong>JWT token</strong>:</p>

    <CodeBlock 
      :code="jsonCode" 
      language="json" 
      filename="Response" 
    />

    <p>
      This token should be included in the header of all subsequent requests to authenticate your access to the API.
    </p>
  </div>
</template>

<script setup>
// Import the new reusable component
import CodeBlock from './CodeBlock.vue';

// Define the code strings here for better readability
const shellCode = `curl -X GET /api/Token/generate-from-apikey -H 'Accept: application/json' -H 'ApiKey: YOUR_API_KEY'`;

const jsonCode = `{
  "success": true,
  "data": "your_jwt_token_here",
  "message": "Token generated successfully."
}`;
</script>

<style scoped>
/* All the code-block specific styles can now be removed from this component! */
</style>