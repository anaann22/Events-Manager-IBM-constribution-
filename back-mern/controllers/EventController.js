import EventModel from '../models/Event.js'

export const create = async(req, res) => {
    try{
        const doc = new EventModel({
            eventName: req.body.title,
            startDate: req.body.startdate,
            endDate: req.body.enddate,
            eventDetails: req.body.details,
            eventPerson: req.body.person,
        });

        const event = await doc.save();
        res.json(event)
        
    }catch(err){
        console.log(err)
        res.status(502).json({
            message: "Creare postare esuata",
        })

    }
}
