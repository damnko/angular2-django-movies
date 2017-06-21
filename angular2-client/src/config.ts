const isDev = process.env.NODE_ENV === 'development';

export const config = {
  themoviedb: {
    apiKey: '737d47b7285bab76358e9cbe46b76b35',
    endpoint: 'https://api.themoviedb.org/3'
  },
  api: isDev ? '/api' : 'http://localhost:8000'
};

