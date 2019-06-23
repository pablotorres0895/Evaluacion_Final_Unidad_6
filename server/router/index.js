const router = require('express').Router(),
    storage = require('../storage')
    

router.get('/',(req, res)=>{
    storage.getDataAll()
        .then((data) => {
            res.json({ "error": false, "datos": data });
        })
        .catch((err) => {
            res.json({ "error": true, "datos": error });
        });
});

module.exports= router;