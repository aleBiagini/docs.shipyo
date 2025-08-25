// docs/.vitepress/config.js

export default {
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('-')
      }
    }
  },
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
          { text: 'Integration Guide', link: '/integration-guide' },
          { text: 'Status Codes', link: '/status-codes' }
        ]
      },
      {
        text: 'Authentication',
        items: [
          { text: 'HTTP Headers', link: '/headers' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'User Login', link: '/auth/login' },
          { text: 'Generate JWT Token', link: '/auth/token' },
          { text: 'Token from API Key', link: '/auth/token-from-key' },
          { text: 'Password Reset', link: '/auth/password-reset' }
        ]
      },
      {
        text: 'User Management',
        items: [
          { text: 'Create User', link: '/users/create' },
          { text: 'Get All Users', link: '/users/get-all' },
          { text: 'Get User by ID', link: '/users/get-by-id' },
          { text: 'Update User', link: '/users/update' },
          { text: 'Delete User', link: '/users/delete' }
        ]
      },
      {
        text: 'Tenant Management',
        items: [
          { text: 'Get All Tenants', link: '/tenants/get-all' },
          { text: 'Get Tenant by ID', link: '/tenants/get-by-id' },
          { text: 'Create Tenant', link: '/tenants/create' },
          { text: 'Update Tenant', link: '/tenants/update' },
          { text: 'Delete Tenant', link: '/tenants/delete' }
        ]
      },
      {
        text: 'API Key Management',
        items: [
          { text: 'Get All API Keys', link: '/api-keys/get-all' },
          { text: 'Get API Key by ID', link: '/api-keys/get-by-id' },
          { text: 'Create API Key', link: '/api-keys/create' },
          { text: 'Update API Key', link: '/api-keys/update' },
          { text: 'Delete API Key', link: '/api-keys/delete' },
          { text: 'Get Tenant API Key', link: '/api-keys/get-tenant-key' }
        ]
      }
    ],

    // -- Social Icons --
    socialLinks: [
     
    ],
  },
};