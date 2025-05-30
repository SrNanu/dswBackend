import { MikroORM } from "@mikro-orm/postgresql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { ReflectMetadataProvider } from "@mikro-orm/core";

import { Secretary } from "../Secretary/secretary.entity.js";
import { Patient } from "../Patient/patient.entity.js";
import { Attention } from "../Attention/attention.entity.js";
import { Medic } from "../Medic/medic.entity.js";
import { Specialty } from "../Specialty/specialty.entity.js";
import { ConsultationHours } from "../Medic/consultationHours.entity.js";
import { HealthInsurance } from "../Patient/healthinsurance.entity.js";
import { UserBase } from "../UserBase/userBase.entity.js";
import { BaseEntity } from "../shared/baseEntity.entity.js";

// Inicializa MikroORM
export const orm = await MikroORM.init({
  metadataProvider: ReflectMetadataProvider,
  discovery: {
    requireEntitiesArray: true,
    disableDynamicFileAccess: true,
  },
  entities: [
    Secretary,
    Patient,
    Attention,
    Medic,
    Specialty,
    ConsultationHours,
    HealthInsurance,
    UserBase,
    BaseEntity
  ],
  clientUrl: process.env.DATABASE_URL, // Asegúrate de que DATABASE_URL esté correctamente configurado en el entorno
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

// Función para sincronizar el esquema con la base de datos
export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema(); // Sincroniza el esquema con la base de datos
};
