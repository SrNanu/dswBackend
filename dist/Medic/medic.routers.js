import { Router } from "express";
import { sanitizeMedicInput, findAll, findOne, add, update, remove } from "./medic.controler.js";
export const medicRouter = Router();
medicRouter.get('/', findAll);
medicRouter.get('/:dni', findOne);
medicRouter.post('/', sanitizeMedicInput, add);
medicRouter.put('/:dni', sanitizeMedicInput, update);
medicRouter.patch('/:dni', sanitizeMedicInput, update);
medicRouter.delete('/:dni', remove);
//# sourceMappingURL=medic.routers.js.map