retry = () => {
  const axios = require('axios');
  const retryx = require('retryx');

  const client = axios.create({
    baseURL: 'https://qiita.comaaaa/api/v2/',
  });

  retryx(() => client.get('users/kai_kou')
    .then((res) => {
      if (res.data.items_count < 108) {
        return Promise.reject(Error('記事が少ないです'));
      }

      return Promise.resolve(res.data);
    }),
    {
      beforeWait: (tries) => {
        console.log('beforeWait');
        console.log(tries);
      },
    })
  .then((res) => {
    console.log(res);
  });
};

retry();