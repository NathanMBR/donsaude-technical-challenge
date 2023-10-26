import { Router } from 'express'

import { makeCreatePartnerController } from '../../factories'
import { expressRouteAdapter } from '../../adapters'

const createPartnerController = makeCreatePartnerController()

const createPartnerRoute = expressRouteAdapter(createPartnerController)

const expressPartnerRoutes = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
expressPartnerRoutes.post('/', createPartnerRoute)

export { expressPartnerRoutes }
