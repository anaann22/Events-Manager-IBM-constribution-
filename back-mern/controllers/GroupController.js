import GroupModel from '../models/Group.js';

export const createGroup = async (req, res) => {
    try {
        const group = new GroupModel({
            groupName: req.body.groupName,
            description: req.body.description,
            emails: req.body.emails
        });

        const savedGroup = await group.save();
        res.json(savedGroup);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Eroare la crearea grupului" });
    }
}

export const getGroups = async (req, res) => {
    try {
        const groups = await GroupModel.find();
        res.json(groups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Eroare la obținerea grupurilor" });
    }
}

export const updateGroup = async (req, res) => {
    try {
        const group = await GroupModel.findById(req.params.id);
        group.groupName = req.body.groupName;
        group.description = req.body.description;
        group.emails = req.body.emails;
        const updatedGroup = await group.save();
        res.json(updatedGroup);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Eroare la actualizarea grupului" });
    }
}

export const deleteGroup = async (req, res) => {
    try {
        const group = await GroupModel.findById(req.params.id);
        await group.remove();
        res.json({ message: "Grupul a fost șters cu succes" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Eroare la ștergerea grupului" });
    }
}
