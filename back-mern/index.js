import express from 'express'; //generare web server
import multer from 'multer'
import {handleValidationErrors, checkAuth} from './utils/index.js'
import {registerValidation, loginValidation, postCreateValidation} from './validations.js'
import mongoose from 'mongoose'; //legatura cu mongodb
import {PostController, UserController} from './controllers/index.js'

//cream legatura cu mongodb
mongoose
.connect('mongodb+srv://ana:gorihonamu85@cluster0.yivkgdq.mongodb.net/mern?retryWrites=true&w=majority', //linkul pt baza de date
).then(() => console.log('db ok')) //mesaj care este afisat in consola(terminal), daca a reusit legatura cu bd, apare dupa ce merge randul 22 
.catch((err)=>console.log('db error', err));

const app = express();

const storage = multer.diskStorage({
   destination: (_, __, cb) => {
      cb(null, 'uploads');
   },
   filename:(_, file, cb) => {
      cb(null, file.originalname); 
},
})

const upload = multer({storage})


app.use(express.json());
app.use('/uploads', express.static('uploads'))

//async await - gasirea utilizatorului
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation,handleValidationErrors, UserController.register);
//utilizatorul primeste date despre el
app.get('/auth/me', checkAuth,  UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
   res.json({
     url: `/uploads/${req.file.originalname}`,
   });
 });

app.post('/posts',checkAuth, postCreateValidation, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id',checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

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