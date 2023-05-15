import EventModel from '../models/Event.js'

export const create = async(req, res) => {
    try{
        const doc = new EventModel({
            eventName: req.body.title,
            startDate: req.body.date1,
            endDate: req.body.date2,
            eventDetails: req.body.details,
            eventPerson: req.body.person,
        });

        const event = await doc.save();
        res.json(event)
        
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Creare postare esuata",
        })

    }
}
