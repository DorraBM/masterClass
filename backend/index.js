const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const multer = require("multer");
const storage = multer.memoryStorage();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(cors());
app.use(bodyparser.json());

/***----------------------------------------------------------------------------- */
 this.storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
app.post("/formateur", upload.single('imageFormateur'),upload.single('cvFormateur'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        let nomFormateur = req.body.nomFormateur;
        let TelFormateur = req.body.TelFormateur;
        let categorieFormateur = req.body.categorieFormateur;
        let emailFormateur = req.body.emailFormateur;
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:3000/public/images/' + req.file.filename
        var insertData = "INSERT INTO demandeFormateu(imageFormateur)VALUES(?)"
        db.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
});

/***--------------------------------------------------------------------------- */
/**-----------inscription formateur-------------------------------------------------------------------------------------------------- */
//inscription formateur
app.post('/formateurdd', (req, res) => {
    /*let imageFormateur = req.files.imageFormateur;*/
    if (req.method == "POST") {
        let nomFormateur = req.body.nomFormateur;
        let TelFormateur = req.body.TelFormateur;
  

        let categorieFormateur = req.body.categorieFormateur;
        let emailFormateur = req.body.emailFormateur;
      /*let cvFormateur = req.files.cvFormateur;*/
        /*if (!req.files) {
            return res.status(400).send('No file were upload');
        }*/
        let imageFormateur = req.files.imageFormateur;
        let cvFormateur = req.files.cvFormateur;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            file.mv('public/images/imageFormateur/' + imageFormateur.name, function (err) {
                if (err)
                    return res.status(500).send(err);
                let qr = `insert into  demandeformateur(nomFormateur,TelFormateur,imageFormateur,cvFormateur,categorieFormateur,emailFormateur)
            values ('${nomFormateur}','${TelFormateur}','${imageFormateur}','${cvFormateur}','${categorieFormateur}','${emailFormateur}')`;
            db.query(qr, (err, result) => {
                if (err) { console.log(err); }
                console.log(result, "result")
                res.send({
                    message: 'formateur data inserted'
                });
    
            });
            });
        }
        /*if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No file were upload');
        }*/
        console.log(imageFormateur, "image");

      
    }
});
/**-----------inscription formateur------------------------------------------------------------------------------------------- */
//database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'masterclass',
    port: 3306
});

//check data base connection
db.connect(err => {
    if (err) { console.log(err, 'bderr'); }
    console.log('database connected ..');
});

//get all Formationdata
app.get('/formation', (req, res) => {
    let qr = 'select * from formation';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'all formation data',
                data: result
            });
        }
    });
});

//get categories by name
/*app.get('/formation/:id',(req,res)=>
{let qcateg = req.params.id;
    let qr=` select * from formation where categorieFormation= ${qcateg}`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        if (result.length > 0) {
            res.send({
                message: 'get categories data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found'
            });
        }
    });
});*/
//get single Formationdata 
app.get('/formation/:id', (req, res) => {
    let qId = req.params.id;
    let qr = `select * from formation where idFormation= ${qId} `;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        if (result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found'
            });
        }
    });
});
//get all instructordata
app.get('/instructor', (req, res) => {
    let qr = 'select * from isntructor';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'all Instuctor data',
                data: result
            });
        }
    });
});

//get single Instructordata 
app.get('/instructor/:id', (req, res) => {
    let qId = req.params.id;
    let qr = `select * from isntructor where 	idInstructor= ${qId} `;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        if (result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found'
            });
        }
    });
});

//get categorieData
app.get('/categorie', (req, res) => {
    let qr = 'select * from categorie';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'all categorie data',
                data: result
            });
        }
    });
});

//get contact data
app.get('/contact', (req, res) => {
    let qr = 'select * from contact ';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'all contact data',
                data: result
            });
        }
    });
});
//create contact data
app.post('/contact', (req, res) => {
    console.log(req.body, "createdata");
    let contactNom = req.body.contactNom;
    let contactMail = req.body.contactMail;
    let contactTel = req.body.contactTel;
    let contactMessage = req.body.contactMessage;

    let qr = ` insert into contact (contactNom,contactMail,contactTel,contactMessage) values('${contactNom}','${contactMail}','${contactTel}','${contactMessage}')`;
    console.log(qr, 'qr');
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, "result")
        res.send({
            message: 'studiant data inserted'
        });
    });
});

//get studiant Data
app.get('/inscription', (req, res) => {
    let qr = 'select * from etudiant';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'all categorie data',
                data: result
            });
        }
    });
});


//create studiant data
app.post('/inscription', (req, res) => {
    console.log(req.body, "createdata");
    let firstname = req.body.nomEtudiant;
    let lastname = req.body.prenomEtudiant;
    let numTel = req.body.numeroTelEtudiant;
    let email = req.body.emailEtudiant;
    let categorie = req.body.nomCategorie;

    let qr = `insert into etudiant(nomEtudiant,prenomEtudiant,numeroTelEtudiant,emailEtudiant,nomCategorie) values('${firstname}','${lastname}','${numTel}','${email}','${categorie}')`;
    console.log(qr, 'qr');
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, "result")
        res.send({
            message: 'studiant data inserted'
        });
    });



});

//get blog Data
app.get('/blog', (req, res) => {
    let qr = 'select * from blog';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'all blog data',
                data: result
            });
        }
    });
});
//get single blog Data
app.get('/blog/:id', (req, res) => {
    let qId = req.params.id;
    let qr = `select * from blog where 	idBlog= ${qId} `;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        if (result.length > 0) {
            res.send({
                message: 'get single blog data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found'
            });
        }
    });
});

/**---------Comment Data-------------- */
app.get('/comment', (req, res) => {
    let qr = 'select * from comment';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'all comment data',
                data: result
            });
        }
    });
});



app.listen(3000, () => { console.log('server running ..'); });