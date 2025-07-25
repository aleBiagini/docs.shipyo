<template>
  <div class="plans-section">
    <h1 id="plans">Plans</h1>
    <p>
      Once you have authenticated, the next step is to fetch the list of available subscription plans. This allows you to display the options to your users.
    </p>

    <h2 id="get-all-plans">2. Get Subscription Plans</h2>
    <p>
      To retrieve the plans, make a <code>GET</code> request to the <code>/api/Plan/getAll</code> endpoint. Remember to include your <strong>JWT session token</strong> in the header.
    </p>

    <CodeBlock 
      :code="shellCode" 
      language="shell" 
      filename="Terminal" 
    />

    <h3 id="responses">Responses</h3>
    <p>The API will return a list of all available plans, including details such as cost, features, and recurrence type.</p>
    
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

// Define the code strings for clarity
const shellCode = `curl -X GET /api/Plan/getAll -H 'Accept: application/json' -H 'Authorization: Bearer YOUR_JWT_TOKEN'`;

const jsonCode = `{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Basic Plan",
        "recurringCostBeforeVAT": 10.0,
        "vatPercentage": 0.2,
        "recurrenceType": 0, // 0 = Monthly
        "isActive": true,
        "planFeatures": [
          { "id": 1, "featureName": "Basic Feature 1" },
          { "id": 2, "featureName": "Basic Feature 2" }
        ]
      }
    ],
    "totalCount": 1
  }
}`;
</script>

<style scoped>
/* Component-specific styles can go here if needed */
</style>