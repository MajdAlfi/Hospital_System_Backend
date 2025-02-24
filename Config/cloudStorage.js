const { Storage } = require('@google-cloud/storage');
const path = require('path')

 const gc = new Storage({
  projectId:'hospitalsystem-447422',
  keyFilename: path.join(__dirname,'../hospitalsystem-447422-84de673d480e.json') ,
});
module.exports = gc