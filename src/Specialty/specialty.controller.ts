import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Specialty } from "./specialty.entity.js";

const em = orm.em
em.getRepository(Specialty)

async function findAll(req: Request, res: Response) {
  try {
    const specialties = await em.find(Specialty, {})
    res.json({ data: specialties })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const specialty = await em.findOneOrFail(Specialty, { id });
    res.status(200).json({ message: 'Found Specialty', data: specialty });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const specialty = em.create(Specialty, req.body)
    await em.flush()
    res.status(201).json({ message: 'Specialty created', data: specialty })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const specialty = em.getReference(Specialty, id)
    em.assign(specialty, req.body)
    await em.flush()
    res.status(200).json({ message: 'Specialty updated', data: specialty })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const specialty = em.getReference(Specialty, id)
    await em.removeAndFlush(specialty)
    res.status(200).json({ message: 'Specialty deleted', data: specialty })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })

  }
}

export { findAll, findOne, add, update, remove }