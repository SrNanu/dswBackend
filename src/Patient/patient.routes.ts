import { Router } from "express";
import { findAll, findOne, add, update, remove, findOneByDni } from "./patient.controller.js";

export const PatientRouter = Router()

PatientRouter.get('/', findAll)
// PatientRouter.get('/:Id/attentions', findAttentionsByID) 

PatientRouter.get('/:id', findOne)

PatientRouter.get('/dni/:dni', findOneByDni)

PatientRouter.post('/', add)

PatientRouter.put('/:id', update)

PatientRouter.patch('/:id', update)

PatientRouter.delete('/:id', remove)
