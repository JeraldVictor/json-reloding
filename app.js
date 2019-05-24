//Imports
const express = require('express')
let db = require('diskdb');
let bodyParser = require('body-parser')

//Configs
db = db.connect('DB', ['users']);
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))


//login boolean
let isLogged = false;

//Routes
app.get('/', (req, res) => {
  res.render('index',{msg:null});
});

app.post('/',(req,res)=>{
    isLogged = true;
    res.redirect('/form')
});

app.get('/form',(req,res)=>{
    if(isLogged === false){
        res.render('index',{msg:'Please Login'})
    }else{
        let list = db.users.find();
        res.render('form',{users:list});
    }
})
 
app.post('/form',(req,res)=>{
    let user = {
        username:req.body.username,
        password :req.body.password
    }
    db.users.save(user);
    let list = db.users.find();
    res.render('form',{users:list});
})






const port = 3030;
app.listen(port,()=>{
    console.log(`app running in port ${port}`);
})