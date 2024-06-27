
import Route from '../models/route.model.js';
class Ride{

    async fetchRides(req,res){
        try{
            const {date,seats} = req.query;
            const rides = await Route.find({date,seats});
            if(rides.length === 0){
                return res.status(404).json({message: "No rides found"});
            }
            res.status(200).json(rides);
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
    }
}