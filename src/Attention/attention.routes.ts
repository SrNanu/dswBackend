import { Router } from "express";
import {
  findAll,
  findOne,
  add,
  update,
  remove,
  findAllByID,
  obtenerFechasOcupadas,
  getAttentionsByDate,
} from "./attention.controller.js";
import validateRole from "../shared/validateRole.js";
import { Validator } from "../shared/Validator/validator.js";

export const AttentionRoutes = Router()
// hay que ver bien cuales son para medico y cuales para secretaria
AttentionRoutes.get('/', findAll) // ,validateRole('both')

AttentionRoutes.get('/ByPatient/:patientId',validateRole('medic'), Validator.validateIdParam, findAllByID) // Tendria que estar en paciente/attention

AttentionRoutes.get('/:id',validateRole('both'), Validator.validateIdParam, findOne)

AttentionRoutes.post('/',validateRole('secretary'), Validator.validateAttentionInput, add)

AttentionRoutes.put('/:id',validateRole('both'), Validator.validateIdParam,
Validator.validateAttentionInput, update)

AttentionRoutes.patch('/:id',validateRole('both'), update)

AttentionRoutes.delete('/:id', Validator.validateIdParam, validateRole('secretary'), remove)

AttentionRoutes.get("/unavailable-dates/:medicoId", Validator.validateIdParam, obtenerFechasOcupadas);

AttentionRoutes.get("/unavailable-hours/:date", getAttentionsByDate);