import { Router } from 'express'

import {
  makeCreatePartnerController,
  makeFindOnePartnerController
} from '../../factories'
import { expressRouteAdapter } from '../../adapters'

const createPartnerController = makeCreatePartnerController()
const findOnePartnerController = makeFindOnePartnerController()

const createPartnerRoute = expressRouteAdapter(createPartnerController)
const findOnePartnerRoute = expressRouteAdapter(findOnePartnerController)

const expressPartnerRoutes = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
expressPartnerRoutes.post('/', createPartnerRoute)
expressPartnerRoutes.get('/:id', findOnePartnerRoute)

export { expressPartnerRoutes }
