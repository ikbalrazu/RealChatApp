const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    // cloud_name: process.env.CLOUD_NAME, 
    // api_key: process.env.CLOUD_API_KEY, 
    // api_secret: process.env.CLOUD_API_SECRET 
    cloud_name: "iqbalraju", 
    api_key: "178291738327194", 
    api_secret: "NTA93JmQOEGNcANVb_Zxr0QN1G4"
  });

module.exports= cloudinary;