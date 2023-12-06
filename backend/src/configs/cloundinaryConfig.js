const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dlkbqvbxc', 
  api_key: '936423329935493', 
  api_secret: '4nliqehUbLf1sXsqEkr7IqFdUuk',
  secure: true
});

module.exports = cloudinary