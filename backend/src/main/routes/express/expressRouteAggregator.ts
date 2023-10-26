import { Router } from 'express'

import { expressAddressRoutes } from './expressAddressRoutes'
import { expressPartnerRoutes } from './expressPartnerRoutes'

const expressRouter = Router()
expressRouter.use('/addresses', expressAddressRoutes)
expressRouter.use('/partners', expressPartnerRoutes)

export { expressRouter }
