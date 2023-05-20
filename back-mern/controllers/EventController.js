import EventModel from '../models/Event.js';
import sgMail from '@sendgrid/mail';

// SETEAZĂ AICI CHEIA TA DE LA SENDGRID
sgMail.setApiKey('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');

export const create = async (req, res) => {
    try {
        const doc = new EventModel({
            eventName: req.body.title,
            startDate: req.body.startdate,
            endDate: req.body.enddate,
            eventDetails: req.body.details,
            eventPerson: req.body.person,
        });

        const event = await doc.save();

        for (let i = 0; i < req.body.person.length; i++) {
            const emailMessage = {
                to: req.body.person[i],
                from: 'adrianberindeieconstantin@gmail.com',
                subject: 'New Event Invitation',
                text: `${req.body.title} - ${req.body.details}
          Confirm your attendance by clicking the following link: 
          http://localhost:4444/event/confirm/${event._id}/${req.body.person[i]}`,
            };
            console.log(`Sending email to ${req.body.person[i]}`);
            try {
                await sgMail.send(emailMessage);
                console.log(`1`);
            } catch (err) {
                console.error(`Failed to send email to ${req.body.person[i]}`, err.response.body.errors);
            }

        }

        res.json(event)

    } catch (err) {
        console.log(err)
        res.status(502).json({
            message: "Creare postare esuata",
        })

    }
}

export const confirmAttendance = async (req, res) => {
    try {
        const { eventId, userEmail } = req.params;
        const event = await EventModel.findById(eventId);

        // Verificăm dacă adresa de email este deja în listă
        if (!event.attendees.includes(userEmail)) {
            // Dacă nu este, o adăugăm
            event.attendees.push(userEmail);
            await event.save();
        }

        res.json({ message: "Attendance confirmed" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred" });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find();
        const formattedEvents = events.map(event => ({
            id: event._id,
            title: event.eventName,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            details: event.eventDetails,
            person: event.eventPerson
        }));

        // Trimite evenimentele formatate înapoi către client
        res.json(formattedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Eroare la obținerea evenimentelor din baza de date" });
    }
};
