
import PostModel from '../models/Post.js'

export const getAll = async(req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Nu s-au gasit postari",
        })

    }
}

export const getOne = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const doc = await PostModel.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: 'after',
        }
      );
  
      if (!doc) {
        return res.status(404).json({
          message: 'Nu a fost gasita postarea',
        });
      }
  
      res.json(doc);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Eroare',
      });
    }
  };

  export const remove = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const doc = await PostModel.findOneAndDelete({ _id: postId });
  
      if (!doc) {
        return res.status(404).json({
          message: 'Nu a fost gasit',
        });
      }
  
      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Eroare',
      });
    }
  };

  export const update = async (req, res) => {
    try {
      const postId = req.params.id;
  
      await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          user: req.userId,
          tags: req.body.tags,
        },
      );
  
      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Eroare',
      });
    }
  };
  

export const create = async(req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.title,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post)
        
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Creare postare esuata",
        })

    }
}

