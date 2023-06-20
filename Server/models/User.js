//structura tabelului
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true, //atribut obligator
    },
    email: {
        type: String,
        required: true,
        unique: true, //este unic in tabel
    },
    //parola codificata
    passwordHash: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false, //nu este obligatoriu
    },
    avatarUrl: String, //nu este un obiect => nu este obligator, nu este necesar un tip
}, {
    timestamps: true, //data crearii
});

//am creat modelul userului

export default mongoose.model('User', UserSchema);