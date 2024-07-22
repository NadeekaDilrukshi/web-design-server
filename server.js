var express = require("express");
var app = express();
var db = require("./database.js");
var cron = require('node-cron');
var bodyParser = require("body-parser"); 
const{request,response} = require("express");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const creditCardRegex = /^\d{12}$/;


let HTTP_PORT = 8081
const cors =require('cors');
app.use(cors({
    origin:'*'
}));


app.listen(HTTP_PORT, () => {
    console.log("Server is running on %PORT%".replace("%PORT%", HTTP_PORT));
});

app.post("/api/products/", (req, res, next) => {

    try {

            const {
            productName,
            description,
            category,
            brand,
            expiredDate,
            manufacturedDate,
            batchNumber,
            unitPrice,
            quantity,
            createdDate,
        } = req.body;

        if (!req.body)  {
            res.status(400).json({ "error": "Invalid Input" });
            return;
        }

        var sql = 'INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)';
        var params = [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate,];

        db.run(sql, params, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;

            } else {
                res.json({
                    "message": "success",
                    "data": req.body,
                    "id": this.lastID,
                });
            }
        });



    } catch (E) {
        res.status(400).send(E);
    }
});

app.get("/api/products/", (req, res, next) => {

    try {

        var sql = "SELECT *FROM products";
        var params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows,

            });

        });
    } catch (E) {
        res.status(400).send(E);
    }

});


app.put("/api/products/:id", (req, res, next) => {
    const {
        id,
        productName,
        description,
        category,
        brand,
        expiredDate,
        manufacturedDate,
        batchNumber,
        unitPrice,
        quantity,
        createdDate,
    } = req.body;

    db.run(`UPDATE products set productName = ?, description = ?, category = ?, brand = ?, expiredDate = ?, manufacturedDate = ?, batchNumber = ?, unitPrice = ?,quantity = ? createddate = ? WHERE id = ?`,
        [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate,req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message });
                return;

            }
            res.status(200).json({ "updated": this.changes });

        });

});

app.delete("/api/products/:id", (req, res, next) => {
    try {
        db.run(`DELETE FROM products WHERE id =?`,
            req.params.id,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message });
                    return;
                }
                res.json({ "message": "deleted", rows: this.changes });
            });

    } catch (E) {
        res.status(400).send(E)
    }

});




app.post("/api/customer/",  (req,res,next) => {
    try{
        var errors =[]
        if(!req.body){
            errors.push("An invalid input");
        }

        const {
        name,
        address,
        email,
        dateOfBirth,
        gender,
        age,
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv,
        timeStamp,

        } = req.body;

       
        var sql = 'INSERT INTO customer (name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiryDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        var params = [name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiryDate,cvv,timeStamp];

        db.run(sql, params, function (err) {
            

            if (!emailRegex.test(email)){
                return res.status(400).json({error:"invalid email address",
                "reference": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"});
            };

            if (!creditCardRegex.test(cardNumber)){
            return res.status(400).json({error:"Invalid CreditCard Number",
            "reference": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"});
            };
            
            if (err) {
                    res.status(400).json({ "error": err.message,
                    "reference": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" });
                    return;

            } else {
                    res.status(201).json({
                        "message"  : `Customer ${name} has registered`,
                        "customerId": this.lastID,
                    
                
                });
            }
        });



    } catch (E) {
        res.status(400).send(E);
    }
       
});


module.exports = app;
