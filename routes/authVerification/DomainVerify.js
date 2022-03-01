
const verify = (req,res,next) => {

    if(req.headers['host'].startsWith('local')){
       
        next()
    }else{
        res.json({error:'FORIDEN '})
    }
// if(req.headers['host'])
}
module.exports=verify