const notFoundMiddleware = (req,res)=>{
    res.status(400).json({
        error:"No route found"
    })
}

module.exports = notFoundMiddleware