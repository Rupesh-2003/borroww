const axios = require("axios")
var request  = require('request')

// request({
//     url: 'http://localhost:6000/signup',
//     method: 'POST',
//   }, function(error, response, body){
//     console.log(body);
//     console.log(response)
//     console.log(error)
//   });

axios
.post('http://localhost:6000/signup')
.then((res) => {
    console.log(res)
})
