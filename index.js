
const express = require('express')
const axios = require('axios');
const createClient = require('@supabase/supabase-js')
const mail = require('./mail')

const PORT = process.env.PORT || 3001;

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { sheetsBrand, sheetsCreator } = require('./sheets');
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

    const supabase = createClient.createClient("https://jeqafxlpwbyxgqfeufjz.supabase.co", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcWFmeGxwd2J5eGdxZmV1Zmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4Njg1MzcsImV4cCI6MjAyNjQ0NDUzN30.m3lk4-fjePT5TxzQpHN_iX9TvIu6-HPcnVmtPoZmsE4');

app.post('/creatorReg', async (req, res)=> {
  
  console.log(req.body);
  const body = req.body;
  mail.mail(body.email, false);
  try {
    sheetsCreator([body.name, body.email, body.phone, body.insta, body.category])
  } catch (error) {
    console.log(error);
  res.status(500).json('failure');
  }
  const { data, error } = await supabase
  .from('Creators')
  .insert([{email: body.email, name: body.name, insta_id: body.insta, ph_no: body.phone, category: body.category} ])
  .select()
          
if (error){
  console.log(error);
  res.status(500).json('failure');
} 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.status(200).json('success');
})

app.post('/brandReg', async (req, res)=> {
  
  console.log(req.body);
  const body = req.body;
  try {
    sheetsBrand([body.brand, body.email, body.phone, body.insta, body.targetAudience, body.budgetRange])
  } catch (error) {
    console.log(error);
  res.status(500).json('failure');
  }
  const { data, error } = await supabase
  .from('Brand')
  .insert([{email: body.email, brand: body.brand, insta_id: body.insta, contact_no: body.phone, target_audience: body.targetAudience, budget_range: body.budgetRange} ])
  .select()
          
if (error){
  console.log(error);
  res.status(500).json('failure');
} 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.status(200).json('success');
})

app.post('/contact', async (req, res)=> {
  
  console.log(req.body);
  const body = req.body;
  mail.mail(body.email, body.message);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.status(200).json('success');
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    });

