import { Router } from "express";
import { findAll, findOne, add, update, remove, findOneByDni } from "./patient.controller.js";
import validateRole from "../shared/validateRole.js";

export const PatientRouter = Router()

PatientRouter.get('/', findAll)
// PatientRouter.get('/:Id/attentions', findAttentionsByID) 

PatientRouter.get('/:id',validateRole('secretary'), findOne)

PatientRouter.get('/dni/:dni',validateRole('both'), findOneByDni)

PatientRouter.post('/',validateRole('both'), add)

PatientRouter.put('/:id',validateRole('both'), update)

PatientRouter.patch('/:id',validateRole('both'), update)

PatientRouter.delete('/:id',validateRole('secretary'), remove)
