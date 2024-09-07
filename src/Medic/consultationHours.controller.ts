import { Request, Response, NextFunction } from "express";
import { ConsultationHours } from "./consultationHours.entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em
em.getRepository(ConsultationHours)


function sanitizeHealthInsuranceInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        day: req.body.day,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        medic: req.body.medic
        
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



async function findAll(req: Request, res: Response) {
    try{
        const _consultationHours = await em.find(ConsultationHours, {})
        res.status(200).json({message: "Found all HealthInsurances", data: _consultationHours})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aconsultationHours = await em.findOneOrFail(ConsultationHours, {id})
        
        res.status(200).json({message: "Health Insurance Found", data: aconsultationHours})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try{
        const aconsultationHours = em.create(ConsultationHours, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({message: "HealthInsurance created", data: aconsultationHours})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aconsultationHours =  em.getReference(ConsultationHours, id)
        em.assign(aconsultationHours, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: "Health Insurance updated", data: aconsultationHours})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aconsultationHours =  em.getReference(ConsultationHours, id)
        await em.removeAndFlush(aconsultationHours)
        res.status(200).json({message: "Health Insurance removed", data: aconsultationHours})
    }
    catch(error : any){
        res.status(500).json({message: error.message})
    
    }
}

export {sanitizeHealthInsuranceInput, findAll, findOne, add, update, remove}