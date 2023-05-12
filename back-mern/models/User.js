//structura tabelului
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : false, //atribut obligator
    },
    email : {
        type : String,
        required : true,
        unique : true, //este unic in tabel
    },
    //parola codificata
    passwordHash : {
        type : String,
        required : true,
    },
    avatarUrl : String, //nu este un obiect => nu este obligator, nu este necesar un tip
}, {
    timestamps : true, //data crearii
    isAdmin:{type: Boolean, default: false}
});

//am creat modelul userului

export default mongoose.model('User', UserSchema);