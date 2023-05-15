import EventModel from '../models/Event.js'

export const create = async(req, res) => {
    try{
        const doc = new EventModel({
            eventName: req.body.title,
            eventDate: req.body.date,
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

export const getAll = async(req, res) => {
    try{
        const posts = await PostModel.find().populate('events').exec();
        res.json(posts)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Nu s-au gasit date",
        })

    }
}


  