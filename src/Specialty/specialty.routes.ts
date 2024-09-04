import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./specialty.controller.js";

export const SpecialtyRouter = Router()

SpecialtyRouter.get('/', findAll)

SpecialtyRouter.get('/:id', findOne)

SpecialtyRouter.post('/', add)

SpecialtyRouter.put('/:id', update)

SpecialtyRouter.patch('/:id', update)

SpecialtyRouter.delete('/:id', remove)