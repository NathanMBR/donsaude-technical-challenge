import { Router } from 'express'

import { expressAddressRoutes } from './expressAddressRoutes'

const expressRouter = Router()
expressRouter.use('/addresses', expressAddressRoutes)

export { expressRouter }
