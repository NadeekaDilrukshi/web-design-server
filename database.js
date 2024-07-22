var sqlite3 = require ('sqlite3').verbose();
var md5 = require ('md5')

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite Database');
        db.run(`CREATE TABLE products(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName text,
            description text,
            category text,
            brand text,
            expiredDate text,
            manufacturedDate text,
            batchNumber INTEGER,
            unitPrice INTEGER,
            quantity INTEGER,
            createdDate text
        )`, (err) => {
            if (err) {
                //table already created
            } else {
                //Table just created,creating some rows
                var insert = 'INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)';
                db.run(insert, ["white Basmathi Rice", "white basmathi Rice imported from Pakistan", "Rice", "CIC", "23.08.2025", "23.08.2022", 1223, 450, 2000, "23.05.2023"]);
            }

        });
            

            db.run(`CREATE Table customer(
            customerId INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            address text,
            email text,
            dateOfBirth DATE,
            gender text,
            age INTEGER,
            cardHolderName text,
            cardNumber text,
            expiryDate text,
            cvv INTEGER,
            timeStamp TIMESTAMP
        )`, (err) => {
                if (err) {
                    //table already created
                } else {
                    //table just creater,creating rows
                    var insert = 'INSERT INTO customer(name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiryDate,cvv,timeStamp) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
                    db.run(insert, ["A.D. Lakith Dharmasiri", "No 324/A Ra De Mel Road,Colombo", "lakith@gmail.com", "1991.02.25", "female", 28, "A.D.L.Dharmasiri", "102445217895", "12/2022", 246, "2022-12-3123:59:59"]);
                    }
                      
                    });
                }
            } 
            
    
);
 

module.exports = db;