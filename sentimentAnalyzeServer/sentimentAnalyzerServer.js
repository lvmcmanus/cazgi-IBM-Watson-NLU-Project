const express = require('express');
const app = new express();

app.use(express.static('client'))
const cors_app = require('cors');
app.use(cors_app());

const dotenv = require('dotenv');
const { request } = require('express');
dotenv.config();

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;


function getNLUInstance() {    

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}






app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
 
const analyzeParams = {
 "url": req.query.url,
 "features": {
 "entities": {
 "emotion": true,
 "sentiment": true,
 "limit": 1
 },
 "keywords": {
 "emotion": true,
 "sentiment": true,
 "limit": 1
 }
 }
 }
 
 const natLanUnder = getNLUInstance();
 
 natLanUnder.analyze(analyzeParams)
 .then(analysisResults => {
 console.log(analysisResults);
 console.log(JSON.stringify(analysisResults.result.keywords[0].emotion,null,2));
 return res.send(analysisResults.result.keywords[0].emotion,null,2);
 })
 .catch(err => {
 return res.send("Could not do desired operation "+err);
 });
});


app.get("/url/sentiment", (req,res) => { 
const analyzeParams = {
 "url": req.query.url,
 "features": {
 "entities": {
 "sentiment": true,
 "emotion": true,
 "limit": 1
 },
 "keywords": {
 "sentiment": true,
 "emotion": true,
 "limit": 1
 }
 }
 }
 
 const natLanUnder = getNLUInstance();
 
 natLanUnder.analyze(analyzeParams)
 .then(analysisResults => {
 console.log(analysisResults);
 console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment,null,2));
 return res.send(analysisResults.result.keywords[0].sentiment,null,2);
 })
 .catch(err => {
 return res.send("Could not do desired operation "+err);
 });
});

app.get("/text/emotion", (req,res) => { 
const analyzeParams = {
 "text": req.query.text,
 "features": {
 "entities": {
 "emotion": true,
 "sentiment": true,
 "limit": 1
 },
 "keywords": {
 "emotion": true,
 "sentiment": true,
 "limit": 1
 }
 }
 }
 
 const natLanUnder = getNLUInstance();
 
 natLanUnder.analyze(analyzeParams)
 .then(analysisResults => {
 console.log(analysisResults);
 console.log(JSON.stringify(analysisResults.result.keywords[0].emotion,null,2));
 return res.send(analysisResults.result.keywords[0].emotion,null,2);
 })
 .catch(err => {
 return res.send("Could not do desired operation "+err);
 });
});


app.get("/text/sentiment", (req,res) => { 
const analyzeParams = {
 "text": req.query.text,
 "features": {
 "entities": {
 "emotion": true,
 "sentiment": true,
 "limit": 1
 },
 "keywords": {
 "emotion": true,
 "sentiment": true,
 "limit": 1
 }
 }
 }
 
 const natLanUnder = getNLUInstance();
 
 natLanUnder.analyze(analyzeParams)
 .then(analysisResults => {
 console.log(analysisResults);
 console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment,null,2));
 return res.send(analysisResults.result.keywords[0].sentiment,null,2);
 })
 .catch(err => {
 return res.send("Could not do desired operation "+err);
 });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})