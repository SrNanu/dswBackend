import { Router } from "express";
import { findAll, findOne, add , update, remove } from "./healthinsurance.controller.js";

export const HealthInsuranceRouter = Router()

HealthInsuranceRouter.get('/', findAll)

HealthInsuranceRouter.get('/:id', findOne)

HealthInsuranceRouter.post('/', add)

HealthInsuranceRouter.put('/:id', update)

HealthInsuranceRouter.patch('/:id', update)

HealthInsuranceRouter.delete('/:id', remove)