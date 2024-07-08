import express, { NextFunction, Request, Response } from 'express'
import { HealthInsurance } from './HealthInsurance.js'
import { Medic } from './Medic.js'

const app = express()

app.use(express.json())

const HealthInsurances = [
    new HealthInsurance(
        'Osde'
        ,1
    ),
]

const Medics = [
    new Medic(
        'John',
        'Doe',
        525425,
        451235132,
    ),
]

//rutas de obras sociales

function sanitizeHealthInsuranceInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        name: req.body.name,
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

app.get('/api/HealthInsurances', (req, res) => {
    res.json(HealthInsurances)
})


app.get('/api/HealthInsurances/:code', (req, res) => {
    const aHealthInsurance = HealthInsurances.find( (HealthInsurance) => HealthInsurance.code === Number(req.params.code) )
    
    if(!aHealthInsurance){
        return res.status(404).send({message: 'Health Insurance not found'})
    }
    res.json(aHealthInsurance)
})


app.post('/api/HealthInsurances', (req, res) => {
    const {name, code} = req.body

    const aNewHealthInsurance = new HealthInsurance( name, code )

    HealthInsurances.push(aNewHealthInsurance)

    return res.status(201).send({message: 'Health Insurance created succesfully', data: aNewHealthInsurance})
})


app.put('/api/HealthInsurances/:code', sanitizeHealthInsuranceInput, (req, res) => {
    const HealthInsuranceIdx = HealthInsurances.findIndex((HealthInsurance) => HealthInsurance.code === Number(req.params.code))

    if(HealthInsuranceIdx === -1){
        return res.status(404).send({ message: 'Health Insurance not found' })
    }

    const {name} = req.body.sanitizedInput

    HealthInsurances[HealthInsuranceIdx] = { ...HealthInsurances[HealthInsuranceIdx], ...req.body.sanitizedInput}
    //Otra forma de hacerlo...
    //Object.assign(HealthInsurances[HealthInsuranceIdx], req.body.sanitizedInput)

    res.status(200).send({ message:'Health Insurance updated succesfully', data: HealthInsurances[HealthInsuranceIdx]})
})

app.patch('/api/HealthInsurances/:code', sanitizeHealthInsuranceInput, (req, res) => {
    const HealthInsuranceIdx = HealthInsurances.findIndex((HealthInsurance) => HealthInsurance.code === Number(req.params.code))

    if(HealthInsuranceIdx === -1){
        return res.status(404).send({ message: 'Health Insurance not found' })
    }

    const {name} = req.body.sanitizedInput

    HealthInsurances[HealthInsuranceIdx] = { ...HealthInsurances[HealthInsuranceIdx], ...req.body.sanitizedInput}

    res.status(200).send({ message:'Health Insurance updated succesfully', data: HealthInsurances[HealthInsuranceIdx]})
})

app.delete('/api/HealthInsurances/:code', (req, res) => {
    const HealthInsuranceIdx = HealthInsurances.findIndex((HealthInsurance) => HealthInsurance.code === Number(req.params.code))

    if(HealthInsuranceIdx === -1){
        res.status(404).send({message: 'Medic not found'})
    }else{
        HealthInsurances.splice(HealthInsuranceIdx, 1)
        res.status(200).send({message: 'Medic deleted succesfully'})
    }
})


//rutas de medicos

function sanitizeMedicInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        name: req.body.name,
        surname: req.body.surname,
        dni: req.body.dni,
        license: req.body.license,
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

app.get('/api/Medics', (req, res) => {
    res.json(Medics)
})


app.get('/api/Medics/:dni', (req, res) => {
    const aMedic = Medics.find( (Medic) => Medic.dni === Number(req.params.dni) )
    
    if(!aMedic){
        return res.status(404).send({message: 'Medic not found'})
    }
    res.json(aMedic)
})


app.post('/api/Medics', (req, res) => {
    const {name, surname, dni, license} = req.body

    const aNewMedic = new Medic( name, surname, dni, license )

    Medics.push(aNewMedic)

    res.status(201).send({message: 'Medic created succesfully', data: aNewMedic})
})


app.put('/api/Medics/:dni', sanitizeMedicInput, (req, res) => {
    const MedicIdx = Medics.findIndex((Medic) => Medic.dni === Number(req.params.dni))

    if(MedicIdx === -1){
        res.status(404).send({ message: 'Medic not found' })
    }

    const {name, surname, dni, license} = req.body.sanitizedInput

    Medics[MedicIdx] = { ...Medics[MedicIdx], ...req.body.sanitizedInput}

    res.status(200).send({ message:'Medic updated succesfully', data: Medics[MedicIdx]})
})
app.patch('/api/Medics/:dni', sanitizeMedicInput, (req, res) => {
    const MedicIdx = Medics.findIndex((Medic) => Medic.dni === Number(req.params.dni))

    if(MedicIdx === -1){
        res.status(404).send({ message: 'Medic not found' })
    }

    const {name, surname, dni, license} = req.body.sanitizedInput

    Medics[MedicIdx] = { ...Medics[MedicIdx], ...req.body.sanitizedInput}

    res.status(200).send({ message:'Medic updated succesfully', data: Medics[MedicIdx]})
})

app.delete('/api/Medics/:dni', (req, res) => {
    const MedicIdx = Medics.findIndex((Medic) => Medic.dni === Number(req.params.dni))

    if(MedicIdx === -1){
        res.status(404).send({message: 'Medic not found'})
    }else{
        Medics.splice(MedicIdx, 1)
        res.status(200).send({message: 'Medic deleted succesfully'})
    }
})

app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' })
  })
  

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/")
})