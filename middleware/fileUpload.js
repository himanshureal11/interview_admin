const multer  = require('multer')
const fs = require('fs');
const { get, isEmpty } = require('lodash');
const { execSync } = require('child_process');

const fileStorage = multer.diskStorage({
    destination: async function(req, file, cb) {
    let  dir = `${process.env.BASE_IMAGE_PATH}file/${get(file, 'fieldname', 'unknown')}`
        if (!fs.existsSync(dir)) {
            const script = `mkdir -p ${dir}`
            try {
                execSync(script)
            }catch (e){
                console.log(`error while create dir in multer storage`,'error in file:middlewares/multer-storage at function:fileStorage ', e)
            }
        }
        cb(null, dir)
    },
    filename: function(req, file, cb) {
        const type = get(file, 'fieldname', 'unknown')
        let fileName = `${type}-${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.]/g, "")}`
        cb(null,fileName)
    }
});

function checkFileType (req, file, cb) {
    if(!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|pdf|xlsx|xls|doc|docx|zip|amr|aac|mp4|wav|aiff|mp3|wma|m4a|mkv)$/)) {
        return cb(new Error('Only jpg|jpeg|png|pdf|xlsx|xls|doc|docx|zip|amr|aac|mp4|wav|aiff|mp3|wma|m4a|mkv files are allowed!'));
    }
    if(isEmpty(file.fieldname.match(/^[a-zA-Z]*/g))){
        console.log('DocType must start with Alphabets.')
        return cb(new Error('DocType must start with Alphabets.'))
    }
    cb(null, true)
};

const fileUpload = multer({storage: fileStorage,
    fileFilter: checkFileType
});

module.exports = {
    fileUpload
}