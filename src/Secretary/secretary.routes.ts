import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./secretary.controller.js";
import validateRole from "../shared/validateRole.js";

export const SecretaryRouter = Router()

SecretaryRouter.get('/',validateRole('secretary'), findAll)

SecretaryRouter.get('/:id',validateRole('secretary'), findOne)

SecretaryRouter.post('/',validateRole('secretary'), add)

SecretaryRouter.put('/:id',validateRole('secretary'), update)

SecretaryRouter.patch('/:id',validateRole('secretary'), update)

SecretaryRouter.delete('/:id', validateRole('secretary'), remove)
