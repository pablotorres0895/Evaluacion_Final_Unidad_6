const router = require('express').Router()
    

router.get('/',(req, res)=>{
    res.send('<h2>Esta es la respuesta inicial</h2>');
});
module.exports= router;