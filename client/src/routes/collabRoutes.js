import express from 'express'
import { createCollab } from '../controllers/collabController.js'

const router = express.Router()

router.post('/', createCollab)

export default router
