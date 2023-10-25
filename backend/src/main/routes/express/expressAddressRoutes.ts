import { Router } from 'express'

import { makeCreateAddressController } from '../../factories'
import { expressRouteAdapter } from '../../adapters'

const createAddressController = makeCreateAddressController()

const createAddressRoute = expressRouteAdapter(createAddressController)

const expressAddressRoutes = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
expressAddressRoutes.post('/', createAddressRoute)

export { expressAddressRoutes }
