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
        // lista de email-uri
        type: [String],
        required: true,
    },
    attendees: {
        // lista de email-uri care au confirmat participarea
        type: [String],
        default: [],
    },
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);