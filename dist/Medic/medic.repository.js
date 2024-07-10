import { Medic } from "./medic.entity.js";
const Medics = [
    new Medic('John', 'Cataldi', 52542, 451235132),
];
export class MedicRepository {
    findAll() {
        return Medics;
    }
    findOne(item) {
        return Medics.find(medic => medic.dni === Number(item.id));
    }
    add(item) {
        Medics.push(item);
        return item;
    }
    update(item) {
        const index = Medics.findIndex(medic => medic.dni === item.dni);
        if (index !== -1) {
            Medics[index] = { ...Medics[index], ...item };
        }
        return Medics[index];
    }
    delete(item) {
        const index = Medics.findIndex(medic => medic.dni === Number(item.id));
        if (index !== -1) {
            const deletedMedics = Medics[index];
            Medics.splice(index, 1);
            return deletedMedics;
        }
    }
}
//# sourceMappingURL=medic.repository.js.map