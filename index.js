let express = require("express");
let app = express();
require('dotenv').config()
app.use(express.json())
let product = []


app.get('/getHello', (req, res) => {
    try {
        res.staus(200).send("Hello");
    }
    catch (err) {
        res.status(500).send({
            "msg": "Internal Server Error"
        })
    }
});


app.post('/createProduct', (req, res) => {
    try {
        console.log(req.body)
        let obj = req.body
        product.isdeleted = false
        obj.id = product.length + 1
        product.push(obj)
        console.log("product", product)

        res.status(200).send({
            "msg": "Product added sucessfully"
        })
    }
    catch (err) {
        res.status(500).send({
            "msg": "Internal Server Error"
        })
    }

})
app.get('/getproduct', (req, res) => {
    try {
        let x = product.filter((val) => {
            if ((val.isdeleted != false)) {
                return true;
            }
        })
        res.status(201).send({ isSuccess: true, data: x });
    }
    catch (err) {
        res.status(500).send({
            "msg": "Internal Server Error"
        })
    }
})



app.put('/updateProduct', (req, res) => {
    try {
        console.log(req.query)
        let id = req.query.id
        let obj = req.body
        let searchPro = product.find((val) => {
            return val.id == id

        })
        if (searchPro && searchPro.isDeleted == true) {
            res.status(404).send({ isSuccess: false, msg: "Product not found" });

        } else {
            searchPro.productname = obj.productname ? obj.productname : searchPro.productname,
                searchPro.cost = obj.cost ? obj.cost : searchPro.cost,
                searchPro.Description = obj.Description ? obj.Description : searchPro.Description,
                product.push(searchPro)
            console.log("product", product)
        }
    }
    catch (err) {
        res.status(500).send({
            "msg": "Internal Server Error"
        })
    }
})

app.delete('/deleteProduct', (req, res) => {
    try {
        let id = req.query.id
        let idx = product.findIndex((val) => {
            val.id == id
        })
        product.splice(idx, 1)
    }
    catch (err) {
        res.status(500).send({
            "msg": "Internal Server Error"
        })
    }


})



app.put("/softDelete", (req, res) => {
    try {
        let id = req.query.id;
        let idx = product.findIndex((fld) => {
            if (fld.id == id) {
                return true
            }
        });
        product[idx].isDelted = true;
        res.status(200).send({ isSuccess: true, id: idx })
    }
    catch (err) {
        res.status(500).send({
            "msg": "Internal Server Error"
        })
    }
})

app.get('/sortascdes', (req, res) => {
    try {
        let sor = req.query.sort
        product.sort((a, b) => {
            if (sor == "asc") {
                return a.cost - b.cost
            }
            else {
                return b.cost - a.cost
            }

        })
        res.send({ data: product })
    }
    catch (err) {

    }
})




app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log("Server running on", +process.env.PORT)
    }
});
