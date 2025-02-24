const storage = require('../../../Config/cloudStorage')
async function uploadImage(filename,image) {
    try {
        console.log('in')
        const realFile = Buffer.from(image,"base64");
        const bucket = storage.bucket('hospitalfiles');
        const file = bucket.file(filename);
        await file.save(realFile);
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  }
  module.exports = uploadImage;