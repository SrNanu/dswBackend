import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import { MedicRouter } from './Medic/medic.routes.js'
import { HealthInsuranceRouter } from './Patient/healthinsurance.routes.js'
import { orm, syncSchema } from './shared/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { PatientRouter } from './Patient/patient.routes.js'
import { SecretaryRouter } from './Secretary/secretary.routes.js'
import cors from 'cors'
import { SpecialtyRouter } from './Specialty/specialty.routes.js'
import { ConsultationHoursRouter } from './Medic/consultationHours.routes.js'
import { AttentionRoutes } from './Attention/attention.routes.js'
import { UserBaseRouter } from './UserBase/userBase.routes.js'

const app = express()

app.use(express.json())

// Configuración de CORS
app.use(cors());

// Middleware de contextos de MikroORM
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

// Routers de las diferentes entidades
app.use('/api/medics', MedicRouter)
app.use('/api/patients', PatientRouter)
app.use('/api/secretaries', SecretaryRouter)
app.use('/api/specialties', SpecialtyRouter)
app.use('/api/consultation-hours', ConsultationHoursRouter)
app.use('/api/attentions', AttentionRoutes)
app.use('/api/health-insurances', HealthInsuranceRouter)
app.use('/api/login', UserBaseRouter)

// Middleware de errores
app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

// Sincronización del esquema (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  await syncSchema(); // Sincroniza el esquema solo en desarrollo
}

const PORT = Number(process.env.PORT || 3000)

// Activar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})
