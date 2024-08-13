import { Router } from "express";
import * as controllers from "../../controllers/users.controllers";
// import authenticationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();

routes.route("/register").post(controllers.create);
routes.route("/login").post(controllers.getOne);

export default routes;
