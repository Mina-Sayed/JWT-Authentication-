import { Router } from 'express'
import * as controllers from '../../controllers/user.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const routes = Router()
// api/users
routes.route('/').post(controllers.create)
routes.route('/').get(authenticationMiddleware, controllers.getMany)
routes.route('/:id').get(authenticationMiddleware, controllers.getOne)
routes.route('/:id').patch(authenticationMiddleware, controllers.updateOne)
routes.route('/:id').delete(authenticationMiddleware, controllers.deleteOne)
// authentication
routes.route('/authenticate').post(controllers.authenticate1)

export default routes
