import { Router } from "express";
import * as controllers from "../../controllers/users.controllers";

const routes = Router();

routes.route("/register").post(controllers.create);
routes.route("/login").post(controllers.getUser);
routes.route("/protected").post(controllers.authenticate);

export default routes;
