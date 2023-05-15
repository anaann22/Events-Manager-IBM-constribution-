import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true, // atribut obligatoriu
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    eventDetails: {
        type: String,
        required: true,
    },
    eventPerson: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);