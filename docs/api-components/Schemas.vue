<template>
  <div class="schemas-section">
    <h1 id="schemas">Schemas</h1>
    <p>
      This section provides detailed information about the data models used in the ShipYo API.
    </p>

    <h2 id="plan-dto">PlanDto</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>id</td>
          <td>integer</td>
          <td>The unique identifier for the plan.</td>
        </tr>
        <tr>
          <td>name</td>
          <td>string</td>
          <td>The name of the plan.</td>
        </tr>
        <tr>
          <td>recurringCostBeforeVAT</td>
          <td>number</td>
          <td>The cost of the plan before VAT.</td>
        </tr>
        <tr>
          <td>recurrenceType</td>
          <td>integer</td>
          <td>The billing cycle (0 = Monthly, 1 = Yearly, 2 = OneTime).</td>
        </tr>
      </tbody>
    </table>

    <h2 id="subscription-dto">SubscriptionDto</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>id</td>
          <td>integer</td>
          <td>The unique identifier for the subscription.</td>
        </tr>
        <tr>
          <td>userID</td>
          <td>integer</td>
          <td>The ID of the user who is subscribed.</td>
        </tr>
        <tr>
          <td>planID</td>
          <td>integer</td>
          <td>The ID of the plan to which the user is subscribed.</td>
        </tr>
        <tr>
          <td>subscriptionStatus</td>
          <td>integer</td>
          <td>The current status of the subscription.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>