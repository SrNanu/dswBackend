import { Router } from "express";
import {findAll, findOne, add , update, remove, findAllByID} from "./attention.controller.js";
import validateRole from "../shared/validateRole.js";

export const AttentionRoutes = Router()
// hay que ver bien cuales son para medico y cuales para secretaria
AttentionRoutes.get('/', findAll)

AttentionRoutes.get('/ByPatient/:patientId',validateRole('medic'), findAllByID) // Tendria que estar en paciente/attention

AttentionRoutes.get('/:id', findOne)

AttentionRoutes.post('/', add)

AttentionRoutes.put('/:id', update)

AttentionRoutes.patch('/:id', update)

AttentionRoutes.delete('/:id', remove)
