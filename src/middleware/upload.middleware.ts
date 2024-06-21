import { v2 as cloudinary } from 'cloudinary'
import { Request } from 'express'
import multer from 'multer'

// Define storage for uploaded images in Cloudinary
const storage = multer.memoryStorage()

// Define file filter to only allow jpg, png, and jpeg files
const fileFilter = (_: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

// Define limits for file size
const limits = {
  fileSize: 2 * 1024 * 1024 // 2MB in bytes
}

// Initialize multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
})

export default upload
