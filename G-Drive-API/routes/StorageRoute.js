const router = require("express").Router()
const multer = require("multer");
const admin = require("../firebase");

const upload = multer({storage :multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
      } });

// router.post("/upload" , upload.single('file') , async(req ,res)=>{
//     const bucket = admin.storage().bucket();
//     const file = bucket.file(`uploads/${req.file.originalname}`);
//     const stream = file.createWriteStream();
//     stream.end(req.file.buffer);
//     await new Promise((resolve , reject)=>{
//         stream.on("finish" , resolve)
//         stream.on("error" , reject)
//     })
//     res.sendStatus(200);
// })



router.delete('/delete/:fileName', async (req, res) => {
    const bucket = admin.storage().bucket();
    const file = bucket.file(`uploads/${req.params.fileName}`);
    const exists = await file.exists();
    if (!exists[0]) {
    return res.sendStatus(404);
    }
    await file.delete();
    res.sendStatus(200);
    });

module.exports = router