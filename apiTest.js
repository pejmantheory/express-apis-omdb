const axios = require('axios')

axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(console.log)
