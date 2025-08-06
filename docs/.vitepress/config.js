// docs/.vitepress/config.js

export default {
  title: 'ShipYo API',
  description: 'Complete API reference and integration guides for ShipYo services.',

  themeConfig: {
    // -- Logo & Title --
    logo: '/logo.svg',
    siteTitle: 'ShipYo API',
    appearance: false,

    // -- Navbar Links --
    nav: [
      { text: 'API Reference', link: '/' },
      { text: 'Integration Guide', link: '/integration-guide' },
      {
        text: 'v1.0.0', link: '#',
      },
    ],

    // -- Sidebar --
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'API Overview', link: '/' },
          { text: 'Integration Guide', link: '/integration-guide' }
        ]
      },
      {
        text: 'Authentication',
        items: [
          { text: 'User Login', link: '/#user-login' },
          { text: 'Generate JWT Token', link: '/#generate-jwt-token' },
          { text: 'Token from API Key', link: '/#generate-token-from-api-key' },
          { text: 'Password Reset', link: '/#request-password-reset' }
        ]
      },
      {
        text: 'User Management',
        items: [
          { text: 'Create User', link: '/#create-user' },
          { text: 'Get All Users', link: '/#get-all-users' },
          { text: 'Get User by ID', link: '/#get-user-by-id' },
          { text: 'Update User', link: '/#update-user' },
          { text: 'Delete User', link: '/#delete-user' }
        ]
      },
      {
        text: 'Tenant Management',
        items: [
          { text: 'Get All Tenants', link: '/#get-all-tenants' },
          { text: 'Get Tenant by ID', link: '/#get-tenant-by-id' },
          { text: 'Create Tenant', link: '/#create-tenant' },
          { text: 'Update Tenant', link: '/#update-tenant' },
          { text: 'Delete Tenant', link: '/#delete-tenant' }
        ]
      },
      {
        text: 'API Key Management',
        items: [
          { text: 'Get All API Keys', link: '/#get-all-api-keys' },
          { text: 'Get API Key by ID', link: '/#get-api-key-by-id' },
          { text: 'Create API Key', link: '/#create-api-key' },
          { text: 'Update API Key', link: '/#update-api-key' },
          { text: 'Delete API Key', link: '/#delete-api-key' }
        ]
      }
    ],

    // -- Social Icons --
    socialLinks: [
     
    ],
  },
};