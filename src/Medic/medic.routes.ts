import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./medic.controler.js";
import validateRole from "../shared/validateRole.js";

export const MedicRouter = Router()

MedicRouter.get('/',validateRole('secretary'), findAll)
MedicRouter.get('/:id',validateRole('secretary'), findOne)
MedicRouter.post('/',validateRole('secretary'), add )
MedicRouter.put('/:id',validateRole('secretary'), update)
MedicRouter.patch('/:id',validateRole('secretary'), update)
MedicRouter.delete('/:id',validateRole('secretary'), remove)
