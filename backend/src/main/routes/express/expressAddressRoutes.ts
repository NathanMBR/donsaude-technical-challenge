import { Router } from 'express'

import {
  makeCreateAddressController,
  makeFindOneAddressController,
  makeFindManyAddressesController,
  makeUpdateAddressController,
  makeDeleteAddressController
} from '../../factories'
import { expressRouteAdapter } from '../../adapters'

const createAddressController = makeCreateAddressController()
const findOneAddressController = makeFindOneAddressController()
const findManyAddressesController = makeFindManyAddressesController()
const updateAddressController = makeUpdateAddressController()
const deleteAddressController = makeDeleteAddressController()

const createAddressRoute = expressRouteAdapter(createAddressController)
const findOneAddressRoute = expressRouteAdapter(findOneAddressController)
const findManyAddressesRoute = expressRouteAdapter(findManyAddressesController)
const updateAddressRoute = expressRouteAdapter(updateAddressController)
const deleteAddressRoute = expressRouteAdapter(deleteAddressController)

const expressAddressRoutes = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
expressAddressRoutes.post('/', createAddressRoute)
expressAddressRoutes.get('/:id', findOneAddressRoute)
expressAddressRoutes.get('/', findManyAddressesRoute)
expressAddressRoutes.put('/:id', updateAddressRoute)
expressAddressRoutes.delete('/:id', deleteAddressRoute)

export { expressAddressRoutes }
