import { Router } from 'express'

import {
  makeCreatePartnerController,
  makeFindOnePartnerController,
  makeFindManyPartnersController
} from '../../factories'
import { expressRouteAdapter } from '../../adapters'

const createPartnerController = makeCreatePartnerController()
const findOnePartnerController = makeFindOnePartnerController()
const findManyPartnersController = makeFindManyPartnersController()

const createPartnerRoute = expressRouteAdapter(createPartnerController)
const findOnePartnerRoute = expressRouteAdapter(findOnePartnerController)
const findManyPartnersRoute = expressRouteAdapter(findManyPartnersController)

const expressPartnerRoutes = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
expressPartnerRoutes.post('/', createPartnerRoute)
expressPartnerRoutes.get('/:id', findOnePartnerRoute)
expressPartnerRoutes.get('/', findManyPartnersRoute)

export { expressPartnerRoutes }
