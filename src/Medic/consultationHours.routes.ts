import { Router } from "express";
import { sanitizeHealthInsuranceInput, findAll, findOne, add , update, remove} from "./consultationHours.controller.js";
import validateRole from "../shared/validateRole.js";


export const ConsultationHoursRouter = Router()

ConsultationHoursRouter.get('/', findAll)

ConsultationHoursRouter.get('/:id', findOne)

ConsultationHoursRouter.post('/',validateRole('secretary'),sanitizeHealthInsuranceInput, add)

ConsultationHoursRouter.put('/:id',validateRole('secretary'), sanitizeHealthInsuranceInput, update)

ConsultationHoursRouter.patch('/:id',validateRole('secretary'),sanitizeHealthInsuranceInput, update)

ConsultationHoursRouter.delete('/:id',validateRole('secretary'), remove)