const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: '/uploads' });


// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         return cb(null,"./uploads");
//     },
//         filename: function(req,file,cb){
//             ;    
//     },
// });






router.use(express.urlencoded({ extended: false }));

router.post("/upload",upload.single("file"),(req,res)=>{
  console.log(req.body);
  console.log(req.file);

  return res.redirect('/');

});

module.exports = router;