const router = require('express').Router(),
    path = require("path")

router.get('/',(req, res)=>{
    res.sendFile(path.join());
});
module.exports= router;