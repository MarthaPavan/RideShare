const axios = require('axios');

require("dotenv").config();
const MAP_API_KEY = process.env.MAP_API_KEY;
class MapApiController {
    
    async autoComplete(req, res) {
        console.log(req.query.input)
        try {
            const response = await axios.get(`https://api.locationiq.com/v1/autocomplete?q=${req.query.input}&countrycodes=in&limit=20&normalizecity=1&accept-language=en&importancesort=0&key=${MAP_API_KEY}`);
            response.data = response.data.map((loc)=>loc.display_name);
            res.send(response.data);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(400)
    }
};
}

module.exports = new MapApiController();