import { Router } from "express";
import { findAll, findOne, add, update, remove, findOneByDni , getAttentionsForOneMedic} from "./patient.controller.js";
import validateRole from "../shared/validateRole.js";
import { Validator } from "../shared/Validator/validator.js";
export const PatientRouter = Router()

PatientRouter.get('/', findAll)
// PatientRouter.get('/:Id/attentions', findAttentionsByID) 

PatientRouter.get('/:id',validateRole('secretary'), Validator.validateIdParam, findOne)

PatientRouter.get('/dni/:dni',validateRole('both'), findOneByDni)

PatientRouter.get('/:patientId/attentions', validateRole('medic'), getAttentionsForOneMedic)

PatientRouter.post('/',validateRole('both'), Validator.validatePatientInput,add)

PatientRouter.put('/:id',validateRole('both'), Validator.validateIdParam, Validator.validatePatientInput, update)

PatientRouter.patch('/:id',validateRole('both'), Validator.validateIdParam, Validator.validatePatientInput, update)

PatientRouter.delete('/:id',validateRole('secretary'), Validator.validateIdParam, remove)
