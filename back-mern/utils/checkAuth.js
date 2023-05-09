import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try{
            const decoded = jwt.verify(token, 'secret');
            req.userId = decoded._id;
            //daca am decodat si am salvat tokenul in req.userId => next
            next();

        }catch (err) {
            return res.status(403).json({
                message: 'no access'
            }) 
        }
    }else {
        return res.status(403).json({
            message: 'no access'
        })
    }

}