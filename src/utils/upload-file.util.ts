import cloudinary from './cloudinary.util'

async function handleUpload(file: any) {
  const b64 = Buffer.from(file.buffer).toString('base64')
  let dataURI = 'data:' + file.mimetype + ';base64,' + b64

  return cloudinary.uploader.upload(dataURI, {
    resource_type: 'image'
  })
}

export default handleUpload
