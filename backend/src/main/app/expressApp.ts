import { expressAddressRoutes } from '../routes'

import express from 'express'
import cors from 'cors'

const expressApp = express()

expressApp.use(cors())
expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: false }))
expressApp.disable('x-powered-by')

expressApp.use('/address', expressAddressRoutes)

export { expressApp }
