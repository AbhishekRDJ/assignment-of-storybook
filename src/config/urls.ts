// Configuration for different environments
export const config = {
  // Development environment
  development: {
    storybookUrl: 'http://localhost:6006',
    apiBaseUrl: 'http://localhost:3000',
  },
  // Production environment
  production: {
    storybookUrl: '/storybook-static/',
    apiBaseUrl: 'https://your-api-domain.com',
  },
  // Get current environment
  get isDevelopment() {
    return import.meta.env.DEV;
  },
  // Get current environment config
  get current() {
    return this.isDevelopment ? this.development : this.production;
  },
  // Get Storybook URL for current environment
  get storybookUrl() {
    return this.current.storybookUrl;
  },
  // Get API base URL for current environment
  get apiBaseUrl() {
    return this.current.apiBaseUrl;
  },
};

// Alternative: Simple function approach
export const getStorybookUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:6006';
  }
  
  // For different deployment platforms, you can customize this
  const hostname = window.location.hostname;
  
  if (hostname.includes('vercel.app')) {
    // Vercel deployment
    return '/storybook-static/';
  } else if (hostname.includes('netlify.app')) {
    // Netlify deployment
    return '/storybook-static/';
  } else if (hostname.includes('github.io')) {
    // GitHub Pages deployment
    return '/storybook-static/';
  } else {
    // Default fallback
    return '/storybook-static/';
  }
};

// Export default config
export default config;
