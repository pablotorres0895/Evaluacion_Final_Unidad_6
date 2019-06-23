const router = require('express').Router(),
    storage = require('../storage')
    

router.get('/',(req, res)=>{
    storage.GetAllInfo()
        .then((data) => {
            res.json({ "error": false, "datos": data })
        })
        .catch((error) => {
            res.json({ "error": true, "datos": error })
        })
});
router.get('/filters',(req, res)=>{
    storage.GetAllInfo()
        .then((data) => {
            let cities = []
            let types = []
            data.forEach(function(value, index){
                if (cities.indexOf(value.Ciudad) < 0)
                    cities.push(value.Ciudad)
                if (types.indexOf(value.Tipo) < 0)
                    types.push(value.Tipo)
            })
            res.json({ "error": false, "cities": cities, "types" : types })
        })
        .catch((error) => {
            res.json({ "error": true, "error": error })
        })
});

module.exports= router;