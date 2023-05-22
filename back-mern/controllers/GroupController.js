import GroupModel from '../models/Group.js';

export const createGroup = async (req, res) => {
    try {
        const existingGroup = await GroupModel.findOne({ groupName: req.body.groupName });

        if (existingGroup) {
            return res.status(400).json({ message: 'Există deja un grup cu același nume' });
        }

        const group = new GroupModel({
            groupName: req.body.groupName,
            description: req.body.description,
            emails: req.body.emails
        });

        const savedGroup = await group.save();
        res.json(savedGroup);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Eroare la crearea grupului' });
    }
};


export const updateGroup = async (req, res) => {
    try {
        const group = await GroupModel.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ message: 'Grupul nu există' });
        }

        const existingGroup = await GroupModel.findOne({ groupName: req.body.groupName });

        if (existingGroup && existingGroup._id.toString() !== req.params.id) {
            return res.status(400).json({ message: 'Există deja un grup cu același nume' });
        }

        group.groupName = req.body.groupName;
        group.description = req.body.description;
        group.emails = req.body.emails;
        const updatedGroup = await group.save();
        res.json(updatedGroup);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Eroare la actualizarea grupului' });
    }
};

export const getGroups = async (req, res) => {
    try {
        const groups = await GroupModel.find();
        res.json(groups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Eroare la obținerea grupurilor" });
    }
}


export const deleteGroup = async (req, res) => {
    try {
      const groupId = req.params.id;
      const group = await GroupModel.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      // Verifică dacă utilizatorul are permisiunile necesare pentru a șterge grupul
      // Implementează condițiile specifice pentru verificarea permisiunilor
      const userHasPermission = true; // Exemplu: Permisiuni verificate și setate în funcție de utilizator
  
      if (!userHasPermission) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
  
      // Alte verificări și condiții specifice pentru ștergerea grupului
      // Implementează condițiile specifice pentru cazurile suplimentare
  
      await group.deleteOne();
  
      return res.json({ message: 'Group deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting group' });
    }
  };
  