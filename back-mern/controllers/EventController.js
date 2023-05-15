import EventModel from '../models/Event.js'

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
        res.json(event)

    } catch (err) {
        console.log(err)
        res.status(502).json({
            message: "Creare postare esuata",
        })

    }
}
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

