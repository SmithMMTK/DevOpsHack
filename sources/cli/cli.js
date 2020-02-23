const request = require('request')


request.post('http://middle-tier:3000/validate', {
  json: {
    name : "SmithM",
    title : "CSA"
    
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  
  
  console.log(`statusCode: ${res.statusCode}`)
  console.log("====")
  console.log(res.body)
})


