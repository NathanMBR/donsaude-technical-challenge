import { Router } from 'express'

import {
  makeCreateAddressController,
  makeFindOneAddressController
} from '../../factories'
import { expressRouteAdapter } from '../../adapters'

const createAddressController = makeCreateAddressController()
const findOneAddressController = makeFindOneAddressController()

const createAddressRoute = expressRouteAdapter(createAddressController)
const findOneAddressRoute = expressRouteAdapter(findOneAddressController)

const expressAddressRoutes = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
expressAddressRoutes.post('/', createAddressRoute)
expressAddressRoutes.get('/:id', findOneAddressRoute)

export { expressAddressRoutes }
