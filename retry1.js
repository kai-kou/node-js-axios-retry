retry = () => {
  const axiosBase = require('axios');
  const axios = axiosBase.create({
    baseURL: 'https://qiita.com/api/v2/',
  });

  const retryPromise = (func, delay) => {
    const retry = (resolve, reject) => func()
    .then((result) => ({result, isCompleted: (result.items_count >= 108)}))
    .then((data) => {
      if (data.isCompleted) {
        resolve(data.result);
      }
      else {
        console.log('retry...');
        setTimeout(() => retry(resolve, reject), delay);
      }
    })
    .catch(reject);
    return new Promise(retry);
  };

  const func = () => {
    return axios.get('users/kai_kou')
    .then((res) => {
      return Promise.resolve(res.data);
    });
  };

  retryPromise(func, 1000)
  .then((result) => {
    console.log(result);
  });
};

retry();