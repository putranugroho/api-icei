const express = require("express");
const path = require('path')
const multer = require('multer')
const router = express.Router();
const db = require("../connection");
const formidableMiddleware = require('express-formidable');
 
var app = express();
 
app.use(formidableMiddleware());

// __dirname: alamat folder file userRouter.js
const rootdir = path.join(__dirname,'/..')
const filelocation = path.join(rootdir, '/file')

const folder = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null, filelocation)
        },
        filename: function (req, file, cb){
            // Waktu upload, nama field, extension file
            cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
        }
    }
)

const upstore = multer(
    {
        storage: folder,
        limits: {
            fileSize: 100000000 // Byte , default 1MB
        },
        fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.(pdf)$/)){ // will be error if the extension name is not one of these
                return cb(new Error('Please upload PDF file')) 
            }
    
            cb(undefined, true)
        }
    }
)

router.post('/upload', upstore.single('file'), async (req, res) => {
    let {
        pihak_satu,
        pihak_dua,
        pihak_tiga,
        no_pks,
        nama_kerjasama,
        detail,
        tanggal_kerjasama,
        expired_kerjasama,
        type_dokumen,
        status,
    } = req.body;
    let url =`https://api.icei.ac.id/kerjasama/view/${req.file.filename}`
    try {
        let [results, metadata] = await db.sequelize.query(
            `INSERT INTO folder_pks(pihak_satu, pihak_dua, nama_kerjasama, detail, tanggal_kerjasama, expired_kerjasama, url, type_dokumen, status) VALUES (?,?,?,?,?,?,?,?,?)`,
            {
                replacements: [
                    pihak_satu,
                    pihak_dua,
                    nama_kerjasama,
                    detail,
                    tanggal_kerjasama,
                    expired_kerjasama,
                    url,
                    type_dokumen,
                    status
                ],
            }
        );
        res.send({
            code: "000",
            status: "Success",
            message: 'Upload berhasil',
            url
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.get('/view/:file', (req, res) => {
    const options = {
        root: filelocation
    }
    const fileName = req.params.file
    console.log(options);
    console.log(fileName);

    res.sendFile(fileName, options, function(err){
        if(err) return res.send(err)

    })

})

router.get("/get-files", async (req, res) => {
  try {
    let data = await db.sequelize.query(
        `SELECT * FROM folder_pks` ,
        {
            type: db.sequelize.QueryTypes.SELECT,
        }
    )
    if (!data.length) {
        res.status(200).send({
            message: "data kosong",
            status: "fail",
            data: []
        });
    } else {
        res.status(200).send({
            message: "Success",
            status: "ok",
            data: data
        });
    }
  } catch (error) {}
});

module.exports = router;