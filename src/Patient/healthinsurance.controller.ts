import { Request, Response, NextFunction } from "express";
import { HealthInsurance } from "./healthinsurance.entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em
em.getRepository(HealthInsurance)


/*function sanitizeHealthInsuranceInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        name: req.body.name,
        code: req.body.code
        
    } 

    //validar info traida (validar info maliciosa, tipo de dato, etc...)
     //Validamos que los campos no sean undefined ( para el patch)
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key]
        }
      })
    next()
}
*/


async function findAll(req: Request, res: Response) {
    try{
        const healthInsurances = await em.find(HealthInsurance, {})
        res.json({data: healthInsurances})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const healthInsurance = await em.findOneOrFail(HealthInsurance, {id})
        
        res.status(200).json({message: "Health Insurance Found", data: healthInsurance})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try{
        const healthInsurance = em.create(HealthInsurance, req.body)
        await em.flush()
        res.status(201).json({message: "HealthInsurance created", data: healthInsurance})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const healthInsurance =  em.getReference(HealthInsurance, id)
        em.assign(healthInsurance, req.body)
        await em.flush()
        res.status(200).json({message: "Health Insurance updated", data: healthInsurance})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const healthInsurance =  em.getReference(HealthInsurance, id)
        await em.removeAndFlush(healthInsurance)
        res.status(200).json({message: "Health Insurance removed", data: healthInsurance})
    }
    catch(error : any){
        res.status(500).json({message: error.message})
    
    }
}

export { findAll, findOne, add, update, remove }