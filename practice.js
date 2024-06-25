app.get('/hello/:name',(req,res)=>{
    let age = req.params.age
    res.send("hello"+age)
}) 