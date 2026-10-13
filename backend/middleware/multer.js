import multer from "multer";

const storage = multer.diskStorage({
    filename: (req, file, callback) => callback(null, file.originalname)
})

// Only images, max 5 MB each
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true)
        } else {
            callback(new Error('Only image files are allowed'))
        }
    }
})

export default upload
