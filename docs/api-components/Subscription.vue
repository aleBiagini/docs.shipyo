<template>
  <div class="subscription-section">
    <h1 id="subscription">Subscription</h1>
    <p>
      After the user has selected a plan, the final step is to create a subscription. This is the core of the checkout process.
    </p>

    <h2 id="create-subscription">3. Create a Subscription (Checkout)</h2>
    <p>
      To create a subscription, you will need to make a <code>POST</code> request to the <code>/api/Subscription/subscribe</code> endpoint. The request body must include the <code>userID</code> and <code>planID</code>.
    </p>

    <CodeBlock 
      :code="javascriptCode" 
      language="javascript" 
      filename="request.js" 
    />

    <h3 id="responses">Responses</h3>
    <p>If the subscription is created successfully, the API will return the new subscription's details.</p>
    
    <CodeBlock 
      :code="jsonCode" 
      language="json" 
      filename="Response" 
    />
  </div>
</template>

<script setup>
// Import the reusable component
import CodeBlock from './CodeBlock.vue';

// Define the code strings
const javascriptCode = `const response = await fetch('/api/Subscription/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    userID: 123,
    planID: 1
  })
});`;

const jsonCode = `{
  "success": true,
  "data": {
    "id": 1,
    "userID": 123,
    "planID": 1,
    "startDate": "2024-07-22T14:15:22Z",
    "subscriptionStatus": 1 // 1 = Active
  }
}`;
</script>

<style scoped>
/* No component-specific styles needed here */
</style>