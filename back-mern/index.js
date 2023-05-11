import express from 'express'; //generare web server
import checkAuth from './utils/checkAuth.js';
import {registerValidation} from './validations/auth.js'
import mongoose from 'mongoose'; //legatura cu mongodb
import * as UserController from './controllers/UserController.js'
import cors from 'cors'
//cream legatura cu mongodb
mongoose
.connect('mongodb+srv://ana:gorihonamu85@cluster0.yivkgdq.mongodb.net/mern?retryWrites=true&w=majority', //linkul pt baza de date
).then(() => console.log('db ok')) //mesaj care este afisat in consola(terminal), daca a reusit legatura cu bd, apare dupa ce merge randul 22 
.catch((err)=>console.log('db error', err));

const app = express();
app.use(express.json());
const corsOptions = {
   origin: 'http://localhost:3000',
   // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
 }
app.use(cors(corsOptions))

//async await - gasirea utilizatorului
app.post('/auth/login', UserController.login);
app.post('/auth/register', UserController.register);
//utilizatorul primeste date despre el
app.get('/auth/me', checkAuth,  UserController.getMe)


//portul care l-am folosit   ---localhost:4444
app.listen(4444, (err) => {
   if(err){
    return console.log(err);
   }
   console.log("ok");
})

//npm install express-validator - validare a datelor trimise
// npm install jsonwebtoken - transmiterea obiectelor sub forma de token
//npm install bcrypt - codificare parola