import constantsConfig from '../../config/constants.config'
import cloudinary from '../utils/cloudinary.util'

type ImageId = string | undefined | null
type ImageFile = Express.Multer.File | null | undefined

/**
 * Converts an image file to a data URI.
 *
 * @param {Express.Multer.File} file - The image file to convert.
 * @return {string} The data URI representation of the image file.
 */
const fromImageToDataURI = (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString('base64')
  const dataURI = 'data:' + file.mimetype + ';base64,' + b64

  return dataURI
}

/**
 * Uploads an image file to Cloudinary and returns the secure URL and public ID of the uploaded image.
 *
 * @param {ImageFile} imageFile - The image file to be uploaded.
 * @return {Promise<{imageUrl: string, imageId: string | null}>} - An object containing the secure URL and public ID of the uploaded image.
 */
const uploadImage = async (imageFile: ImageFile) => {
  if (imageFile) {
    const dataURI = fromImageToDataURI(imageFile)

    const { public_id, secure_url } = await cloudinary.uploader.upload(dataURI)

    return {
      imageUrl: secure_url,
      imageId: public_id
    }
  }

  return {
    imageUrl: constantsConfig.defaultProfileImage,
    imageId: null
  }
}

/**
 * Deletes an image from Cloudinary if the provided imageId is not null or undefined.
 *
 * @param {ImageId} imageId - The public ID of the image to delete.
 * @return {Promise<void>} - A Promise that resolves when the image is successfully deleted.
 */
const deleteImage = async (imageId: ImageId) => {
  if (imageId) {
    await cloudinary.uploader.destroy(imageId)
  }
}

/**
 * Updates an image by deleting the old image and uploading a new image to Cloudinary.
 *
 * @param {ImageId} oldImageId - The ID of the old image to be deleted.
 * @param {ImageFile} newImageFile - The new image file to be uploaded.
 * @return {{ newImageUrl: string, newImageId: string }} - An object containing the secure URL and public ID of the newly uploaded image.
 */
const updateImage = async (oldImageId: ImageId, newImageFile: ImageFile) => {
  await deleteImage(oldImageId)

  const { imageUrl, imageId } = await uploadImage(newImageFile)

  return {
    newImageUrl: imageUrl,
    newImageId: imageId
  }
}

export { deleteImage, updateImage, uploadImage }
