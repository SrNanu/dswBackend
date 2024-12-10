import { Router } from "express";
import { login } from "./userBase.controller.js";

export const UserBaseRouter = Router()

UserBaseRouter.post('/', login)


