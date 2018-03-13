


//////////////
const express = require('express');
const app = express();
const ejs = require('ejs');
 
app.set('views','views');
app.set('view engine', 'ejs');

app.listen(8000,function(){
  console.log('server is running');
});


app.get('/',(req,res)=>{
  res.send('hello');
});


 


var myPromise = new Promise(function (res,rej){
  var file = ['first', 'second', 'third'];
  res.render('first');
  
})

myPromise.then(function(result){
  console.log("status=",result);
}).catch(function(result){
  console.log("status=",result);
})

