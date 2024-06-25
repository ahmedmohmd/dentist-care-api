import { Request } from 'express'
import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (_: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  fileSize: 2 * 1024 * 1024
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
})

export default upload
