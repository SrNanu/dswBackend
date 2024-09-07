import { Router } from "express";
import { sanitizeHealthInsuranceInput, findAll, findOne, add , update, remove} from "./consultationHours.controller.js";


export const ConsultationHoursRouter = Router()

ConsultationHoursRouter.get('/', findAll)

ConsultationHoursRouter.get('/:id', findOne)

ConsultationHoursRouter.post('/',sanitizeHealthInsuranceInput, add)

ConsultationHoursRouter.put('/:id', sanitizeHealthInsuranceInput, update)

ConsultationHoursRouter.patch('/:id',sanitizeHealthInsuranceInput, update)

ConsultationHoursRouter.delete('/:id', remove)