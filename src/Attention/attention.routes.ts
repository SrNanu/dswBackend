import { Router } from "express";
import {findAll, findOne, add , update, remove, findAllByID} from "./attention.controller.js";

export const AttentionRoutes = Router()

AttentionRoutes.get('/', findAll)

AttentionRoutes.get('/ByPatient/:patientId', findAllByID) // Tendria que estar en paciente/attention

AttentionRoutes.get('/:id', findOne)

AttentionRoutes.post('/', add)

AttentionRoutes.put('/:id', update)

AttentionRoutes.patch('/:id', update)

AttentionRoutes.delete('/:id', remove)
