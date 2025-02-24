
const axios = require('axios')
async function sendSMS(phone,otp){
    try{
    console.log("reach")
    var Data = {"messaging_product": "whatsapp", "to":`${phone}` ,"type": "template",
    "template": {
          "namespace":process.env.nameSpace,
          "name": "otp",
          "language": {
              "code": "ar",
              "policy": "deterministic"
          },
          "components": [
              {
          "type": "body",
          "parameters":[{
            "type": "text",
            "text": `${otp}`
          }]
              },
              {
               
        "type": "button",
        "sub_type": "url",
        "index": 0,
        "parameters": [
          {
            "type": "text",
            "text": `${otp}`
          }
        ]
          }]
      }
  }

    console.log("reach2")
    var header = {'Authorization': `Bearer ${process.env.otpApiKey}`,'Content-Type': 'application/json'}
    console.log("reached")
    await axios.post(process.env.optDomain, JSON.stringify(Data),{
        headers: header
      }).catch(function (error) {
        return console.log(error)
      });
      console.log("reached2")
//console.log(data)
console.log('success')
    }catch(e){
        console.log(e)
    }
}
module.exports = sendSMS;
