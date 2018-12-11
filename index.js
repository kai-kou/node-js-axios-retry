noRetry = () => {
  const axiosBase = require('axios');
  const axios = axiosBase.create({
    baseURL: 'https://qiita.com/api/v2/',
  });

  axios.get('users/kai_kou')
  .then(function(res) {
    console.log(res.data);
  });
};

noRetry();