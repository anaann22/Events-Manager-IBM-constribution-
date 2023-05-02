import express from 'express'; //generare web server
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from './models/User.js'
import {validationResult} from 'express-validator';
import {registerValidation} from './validations/auth.js'
import mongoose from 'mongoose'; //legatura cu mongodb

//cream legatura cu mongodb
mongoose
.connect('mongodb+srv://ana:gorihonamu85@cluster0.yivkgdq.mongodb.net/mern?retryWrites=true&w=majority', //linkul pt baza de date
).then(() => console.log('db ok')) //mesaj care este afisat in consola(terminal), daca a reusit legatura cu bd, apare dupa ce merge randul 22 
.catch((err)=>console.log('db error', err));

const app = express();
app.use(express.json());

//async await - gasirea utilizatorului
app.post('/auth/login', async(req, res)=> {
    try{
        const user = await UserModel.findOne({email : req.body.email});
        if (!user){
            return res.status(404).json({
                message : 'unknown user'
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass){
            return res.status(404).json({
                message : "invalid password"
            })
        }

        const token = jwt.sign( //3 parametri
            {
                _id: user._id, //id este destul pentru a afla celelalte infodespre user
            },
            'secret', //cheia pentru codificarea de token 
            {
                expiresIn: '30d', //peste 30 de zile tokenul nu mai este valid
            },
        );

        res.status(200).json({
            ...user.toObject(),
            token,
        });

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'login error'
        });
    }
});



app.post('/auth/register', registerValidation, async(req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }

        const email = req.body.email;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'This email is already in use.' });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email,
            fullName: req.body.fullName,
            passwordHash,
            avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret',
            {
                expiresIn: '30d',
            },
        );

        res.json({
            user,
            token,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'register error'
        });
    }
});


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