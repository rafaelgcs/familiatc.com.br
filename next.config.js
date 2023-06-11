const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/home/content',
        destination: 'http://localhost:9000/api/home/content',
      },
      {
        source: '/api/auth/authenticate',
        destination: 'http://localhost:9000/api/auth/authenticate',
      },
      {
        source: '/api/product',
        destination: 'http://localhost:9000/api/product',
      },
      {
        source: '/api/product/update/:id',
        destination: 'http://localhost:9000/api/product/update/:id',
      },
      {
        source: '/api/product/delete/:id',
        destination: 'http://localhost:9000/api/product/delete/:id',
      },
      {
        source: '/api/testimonial',
        destination: 'http://localhost:9000/api/testimonial',
      },
      {
        source: '/api/testimonial/update/:id',
        destination: 'http://localhost:9000/api/testimonial/update/:id',
      },
      {
        source: '/api/testimonial/delete/:id',
        destination: 'http://localhost:9000/api/testimonial/delete/:id',
      },
      {
        source: '/api/faq',
        destination: 'http://localhost:9000/api/faq',
      },
      {
        source: '/api/faq/update/:id',
        destination: 'http://localhost:9000/api/faq/update/:id',
      },
      {
        source: '/api/faq/delete/:id',
        destination: 'http://localhost:9000/api/faq/delete/:id',
      },
    ]
  },
};


module.exports = withImages(redirects);
