import { Router } from 'express'

import {
  makeCreatePartnerController,
  makeFindOnePartnerController,
  makeFindManyPartnersController,
  makeUpdatePartnerController,
  makeDeletePartnerController
} from '../../factories'
import { expressRouteAdapter } from '../../adapters'

const createPartnerController = makeCreatePartnerController()
const findOnePartnerController = makeFindOnePartnerController()
const findManyPartnersController = makeFindManyPartnersController()
const updatePartnerController = makeUpdatePartnerController()
const deletePartnerController = makeDeletePartnerController()

const createPartnerRoute = expressRouteAdapter(createPartnerController)
const findOnePartnerRoute = expressRouteAdapter(findOnePartnerController)
const findManyPartnersRoute = expressRouteAdapter(findManyPartnersController)
const updatePartnerRoute = expressRouteAdapter(updatePartnerController)
const deletePartnerRoute = expressRouteAdapter(deletePartnerController)

const expressPartnerRoutes = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
expressPartnerRoutes.post('/', createPartnerRoute)
expressPartnerRoutes.get('/:id', findOnePartnerRoute)
expressPartnerRoutes.get('/', findManyPartnersRoute)
expressPartnerRoutes.put('/:id', updatePartnerRoute)
expressPartnerRoutes.delete('/:id', deletePartnerRoute)

export { expressPartnerRoutes }
