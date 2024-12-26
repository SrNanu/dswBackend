import { Router } from "express";
import {findAll, findOne, add , update, remove, findAllByID} from "./attention.controller.js";
import validateRole from "../shared/validateRole.js";

export const AttentionRoutes = Router()
// hay que ver bien cuales son para medico y cuales para secretaria
AttentionRoutes.get('/',validateRole('both'), findAll)

AttentionRoutes.get('/ByPatient/:patientId',validateRole('medic'), findAllByID) // Tendria que estar en paciente/attention

AttentionRoutes.get('/:id',validateRole('medic'), findOne)

AttentionRoutes.post('/',validateRole('secretary'), add)

AttentionRoutes.put('/:id',validateRole('medic'), update)

AttentionRoutes.patch('/:id',validateRole('medic'), update)

AttentionRoutes.delete('/:id',validateRole('secretary'), remove)
