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
router.get('/city/:city/type/:type/min/:min/max/:max', (req, res)=>{
    let parameters = req.params
    storage.GetAllInfo()
        .then((data) => {
            let typeFilters = []
            let cityFilters = []
            // first get all houses in that range
            let pricesFilters = data.filter((d)=>{
                return Number(d.Precio.replace('$','').replace(',','')) >= parameters.min && 
                    Number(d.Precio.replace('$','').replace(',','')) <= parameters.max
            })
            // second get all types or type selected
            if (parameters.type == 'all'){
                typeFilters = pricesFilters

            }else{
                typeFilters = pricesFilters.filter((d)=>{
                    return d.Tipo === parameters.type
                })
            }
            // finally we filter city or get all
            if (parameters.city == 'all'){
                cityFilters = typeFilters

            }else{
                cityFilters = typeFilters.filter((d)=>{
                    return d.Ciudad === parameters.city
                })
            }
            res.json({ "error": false, "datos": cityFilters })
        })
        .catch((error) => {
            res.json({ "error": true, "error": error })
        })
})

module.exports= router