import { Router } from 'express'
import { getJobType } from '../controllers/CommonController'

const route = Router()

route.get('/get-job-type',getJobType)

export default route;