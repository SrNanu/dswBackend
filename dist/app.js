import express from 'express';
import { HealthInsurance } from './HealthInsurance.js';
const app = express();
app.use(express.json());
const HealthInsurances = [
    new HealthInsurance('Osde', 1),
];
function sanitizeHealthInsuranceInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
    };
    //validar info traida (validar info maliciosa, tipo de dato, etc...)
    next();
}
app.get('/api/HealthInsurances', (req, res) => {
    res.json(HealthInsurances);
});
app.get('/api/HealthInsurances/:code', (req, res) => {
    const aHealthInsurance = HealthInsurances.find((HealthInsurance) => HealthInsurance.code === Number(req.params.code));
    if (!aHealthInsurance) {
        res.status(404).send({ message: 'Health Insurance not found' });
    }
    res.json(aHealthInsurance);
});
app.post('/api/HealthInsurances', (req, res) => {
    const { name, code } = req.body;
    const aNewHealthInsurance = new HealthInsurance(name, code);
    HealthInsurances.push(aNewHealthInsurance);
    res.status(201).send({ message: 'Character created succesfully', data: aNewHealthInsurance });
});
app.put('/api/HealthInsurances/:code', sanitizeHealthInsuranceInput, (req, res) => {
    const HealthInsuranceIdx = HealthInsurances.findIndex((HealthInsurance) => HealthInsurance.code === Number(req.params.code));
    if (HealthInsuranceIdx === -1) {
        res.status(404).send({ message: 'Health Insurance not found' });
    }
    const { name } = req.body;
    HealthInsurances[HealthInsuranceIdx] = { ...HealthInsurances[HealthInsuranceIdx], ...req.body.sanitizedInput };
    res.status(200).send({ message: 'Character updated succesfully', data: HealthInsurances[HealthInsuranceIdx] });
});
app.delete('/api/characters/:code', (req, res) => {
    const HealthInsuranceIdx = HealthInsurances.findIndex((HealthInsurance) => HealthInsurance.code === Number(req.params.code));
    if (HealthInsuranceIdx === -1) {
        res.status(404).send({ message: 'Character not found' });
    }
    else {
        HealthInsurances.splice(HealthInsuranceIdx, 1);
        res.status(200).send({ message: 'Character deleted succesfully' });
    }
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
//# sourceMappingURL=app.js.map