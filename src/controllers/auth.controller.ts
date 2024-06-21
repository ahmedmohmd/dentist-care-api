import { RequestHandler } from 'express'
import authService from '../services/auth.service'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'

const signIn: RequestHandler = async (req, res) => {
  const token = await authService.signIn(req.body)

  return customResponseUtil.successResponse(res, HttpCode.OK, {
    token
  })
}

const signUp: RequestHandler = async (req, res) => {
  const profileImage: Express.Multer.File | undefined = req.file

  const patientData = Object.assign({}, req.body, {
    profileImage: profileImage
  })

  const createdUser = await authService.signUp(patientData)

  return res.json(createdUser)
}

export default { signIn, signUp }
