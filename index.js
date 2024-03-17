const express = require('express')
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
    next();
    }
    };
    
    app.use(allowCrossDomain);

app.post('/check', async (req, res)=> {
  console.log(req.body.insta);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  axios.get(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${req.body.insta}`, {
    headers: {
      'User-Agent' : 'Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)',
      'Origin': "https://www.instagram.com", 
      'Referer': "https://www.instagram.com/",
      'Access-Control-Allow-Origin': "*"
    }
  }).then(({data})=>{
    console.log(data.data.user.edge_followed_by.count);
    res.status(200).json(data.data.user.edge_followed_by.count);
  }); 
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    });

