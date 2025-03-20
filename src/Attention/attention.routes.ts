import { Router } from "express";
import {findAll, findOne, add , update, remove, findAllByID, obtenerFechasOcupadas} from "./attention.controller.js";
import validateRole from "../shared/validateRole.js";

export const AttentionRoutes = Router()
// hay que ver bien cuales son para medico y cuales para secretaria
AttentionRoutes.get('/', findAll) // ,validateRole('both')

AttentionRoutes.get('/ByPatient/:patientId',validateRole('medic'), findAllByID) // Tendria que estar en paciente/attention

AttentionRoutes.get('/:id',validateRole('both'), findOne)

AttentionRoutes.post('/',validateRole('secretary'), add)

AttentionRoutes.put('/:id',validateRole('both'), update)

AttentionRoutes.patch('/:id',validateRole('both'), update)

AttentionRoutes.delete('/:id', remove) // ,validateRole('secretary')

    AttentionRoutes.get("/unavailable-dates/:medicoId", obtenerFechasOcupadas);