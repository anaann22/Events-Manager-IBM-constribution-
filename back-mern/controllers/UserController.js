import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js'
import {validationResult} from 'express-validator';

export const register = async(req, res) => {
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
        const fullName = req.body.fullName;
        console.log({email,password,fullName});

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email,
            fullName: req.body?.fullName,
            passwordHash,
            avatarUrl: req.body?.avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
                isAdmin: user.isAdmin,
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
};

export const getEmails = async (req, res) => {
  try {
      const users = await UserModel.find({}, 'email'); // selectează doar câmpul 'email'
      const emails = users.map(user => user.email); // extrage adresele de e-mail
      res.json(emails);
  } catch (err) {
      console.log(err);
      res.status(500).json({
          message: 'Error retrieving emails'
      });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  // Afiseaza emailul si parola in consola
  console.log(`Email: ${email}, Password: ${password}`);

  try {
    // Verifica dacă utilizatorul există în baza de date
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'Unknown user.',
      });
    }

    // Verifica dacă parola introdusă este corectă
    const isValidPass = await bcrypt.compare(password, user.passwordHash);
if (!isValidPass) {
  return res.status(401).json({
    message: 'Invalid password.',
  });
}

    // Genereaza tokenul JWT-SEPARAT
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: '30d',
      },
    );

    // Returnează tokenul și datele utilizatorului
    res.status(200).json({
      ...user.toObject(),
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Connection error.',
    });
  }
};

  
export const getMe = async(req, res) =>{
    try{
        const user = await UserModel.findById(req.userId)

        if(!user){
            return res.status(404).json({
                message: 'undefined user',
            })
        }
        const {passwordHash, ...userData} = user._doc;
        res.json(userData)
        }catch(err) {}
      
};

export const getAll = async () => {
  try {
    const users = await fullName.find();
    console.log(users);
  } catch (error) {
    console.error(error);
  }
};
