-- CreateEnum
CREATE TYPE "public"."IMCClasificacion" AS ENUM ('BAJO_PESO', 'NORMOPESO', 'SOBREPESO', 'OBESIDAD_I', 'OBESIDAD_II', 'OBESIDAD_III');

-- CreateEnum
CREATE TYPE "public"."EvaClasificacion" AS ENUM ('BAJO', 'MEDIO', 'ALTO', 'MUY_ALTO');

-- CreateEnum
CREATE TYPE "public"."Rol" AS ENUM ('ADMIN', 'PROFESIONAL', 'PACIENTE');

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id" SERIAL NOT NULL,
    "rut" INTEGER NOT NULL,
    "dv_rut" VARCHAR NOT NULL,
    "nombre_primero" VARCHAR NOT NULL,
    "nombre_segundo" VARCHAR NOT NULL,
    "apellido_paterno" VARCHAR NOT NULL,
    "apellido_materno" VARCHAR NOT NULL,
    "correo" VARCHAR NOT NULL,
    "celular" INTEGER NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "fecha_creacion" DATE NOT NULL,
    "password" VARCHAR NOT NULL,
    "rol" "public"."Rol" NOT NULL DEFAULT 'PACIENTE',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."consulta" (
    "id" SERIAL NOT NULL,
    "fecha_consulta" DATE NOT NULL,
    "profesional_id" INTEGER NOT NULL,
    "paciente_id" INTEGER NOT NULL,

    CONSTRAINT "consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."anamnesis" (
    "id" SERIAL NOT NULL,
    "consulta_id" INTEGER NOT NULL,

    CONSTRAINT "anamnesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."anamnesis_cli" (
    "id" SERIAL NOT NULL,
    "patologias" VARCHAR NOT NULL,
    "antecedentes_fam" VARCHAR NOT NULL,
    "alergias" VARCHAR NOT NULL,
    "intolerancias" VARCHAR NOT NULL,
    "farmacos" VARCHAR NOT NULL,
    "antecedentes_gi" VARCHAR NOT NULL,
    "cirugias" VARCHAR NOT NULL,
    "deposiciones" VARCHAR NOT NULL,
    "examenes" VARCHAR NOT NULL,
    "anamnesis_id" INTEGER NOT NULL,

    CONSTRAINT "anamnesis_cli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."anamnesis_ali" (
    "id" SERIAL NOT NULL,
    "tipo_dieta" VARCHAR NOT NULL,
    "alergia" VARCHAR NOT NULL,
    "intolerancia" VARCHAR NOT NULL,
    "suplemento" VARCHAR NOT NULL,
    "anamnesis_id" INTEGER NOT NULL,

    CONSTRAINT "anamnesis_ali_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."r24h" (
    "id" SERIAL NOT NULL,
    "tiempo" VARCHAR NOT NULL,
    "hora" VARCHAR NOT NULL,
    "lugar" VARCHAR NOT NULL,
    "descripcion" VARCHAR NOT NULL,
    "anamnesis_ali_id" INTEGER NOT NULL,

    CONSTRAINT "r24h_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."anamnesis_psi" (
    "id" SERIAL NOT NULL,
    "ocupacion" VARCHAR NOT NULL,
    "educacion" VARCHAR NOT NULL,
    "ingreso" VARCHAR NOT NULL,
    "grupo_familiar" VARCHAR NOT NULL,
    "anamnesis_id" INTEGER NOT NULL,

    CONSTRAINT "anamnesis_psi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."evs" (
    "id" SERIAL NOT NULL,
    "tabaco" VARCHAR NOT NULL,
    "alcohol" VARCHAR NOT NULL,
    "deporte" VARCHAR NOT NULL,
    "anamnesis_id" INTEGER NOT NULL,

    CONSTRAINT "evs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mediciones" (
    "id" SERIAL NOT NULL,
    "nivel" VARCHAR NOT NULL,
    "consulta_id" INTEGER NOT NULL,

    CONSTRAINT "mediciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."basicas" (
    "id" SERIAL NOT NULL,
    "peso" REAL NOT NULL,
    "talla" REAL NOT NULL,
    "talla_sentado" REAL NOT NULL,
    "envergadura" REAL NOT NULL,
    "mediciones_id" INTEGER NOT NULL,

    CONSTRAINT "basicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pliegues" (
    "id" SERIAL NOT NULL,
    "tricep" REAL NOT NULL,
    "subescapular" REAL NOT NULL,
    "bicep" REAL NOT NULL,
    "cresta_iliaca" REAL NOT NULL,
    "supraespinal" REAL NOT NULL,
    "abdominal" REAL NOT NULL,
    "muslo" REAL NOT NULL,
    "pierna" REAL NOT NULL,
    "mediciones_id" INTEGER NOT NULL,

    CONSTRAINT "pliegues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."perimetros" (
    "id" SERIAL NOT NULL,
    "brazo_relajado" REAL NOT NULL,
    "brazo_flexionado" REAL NOT NULL,
    "cintura" REAL NOT NULL,
    "cadera" REAL NOT NULL,
    "muslo_medio" REAL NOT NULL,
    "pierna" REAL NOT NULL,
    "mediciones_id" INTEGER NOT NULL,

    CONSTRAINT "perimetros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."diametros" (
    "id" SERIAL NOT NULL,
    "humero" REAL NOT NULL,
    "biestiloideo" REAL NOT NULL,
    "femur" REAL NOT NULL,
    "mediciones_id" INTEGER NOT NULL,

    CONSTRAINT "diametros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."resultados_med" (
    "id" SERIAL NOT NULL,
    "imc" REAL NOT NULL,
    "imc_clasificacion" "public"."IMCClasificacion" NOT NULL,
    "gc_kg" REAL NOT NULL,
    "gc_porcentaje" REAL NOT NULL,
    "gc_clasificacion" "public"."EvaClasificacion" NOT NULL,
    "gv_kg" REAL NOT NULL,
    "gv_porcentaje" REAL NOT NULL,
    "gv_clasificacion" "public"."EvaClasificacion" NOT NULL,
    "mm_kg" REAL NOT NULL,
    "mm_porcentaje" REAL NOT NULL,
    "mm_clasificacion" "public"."EvaClasificacion" NOT NULL,
    "imm" REAL NOT NULL,
    "imm_clasificacion" "public"."EvaClasificacion" NOT NULL,
    "endo" REAL NOT NULL,
    "meso" REAL NOT NULL,
    "ecto" REAL NOT NULL,
    "pha_peso" REAL NOT NULL,
    "pha_pli_triceps" REAL NOT NULL,
    "pha_pli_subescapular" REAL NOT NULL,
    "pha_pli_biceps" REAL NOT NULL,
    "pha_pli_cresta_iliaca" REAL NOT NULL,
    "pha_pli_supraespinal" REAL NOT NULL,
    "pha_pli_abdominal" REAL NOT NULL,
    "pha_pli_muslo" REAL NOT NULL,
    "pha_pli_pierna" REAL NOT NULL,
    "pha_per_brazo" REAL NOT NULL,
    "pha_per_brazo_flex" REAL NOT NULL,
    "pha_per_cintura" REAL NOT NULL,
    "pha_per_cadera" REAL NOT NULL,
    "pha_per_muslo" REAL NOT NULL,
    "pha_per_pierna" REAL NOT NULL,
    "pha_dia_humero" REAL NOT NULL,
    "pha_dia_biestiloideo" REAL NOT NULL,
    "pha_dia_femur" REAL NOT NULL,
    "mediciones_id" INTEGER NOT NULL,

    CONSTRAINT "resultados_med_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plan" (
    "id" SERIAL NOT NULL,
    "descripcion" VARCHAR NOT NULL,
    "consulta_id" INTEGER NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."requerimiento" (
    "id" SERIAL NOT NULL,
    "descripcion" VARCHAR NOT NULL,
    "tmb" INTEGER NOT NULL,
    "actividad_fisica" INTEGER NOT NULL,
    "termogenesis" INTEGER NOT NULL,
    "ejercicio_fisico" INTEGER NOT NULL,
    "f_patologias" INTEGER NOT NULL,
    "f_crecimiento" INTEGER NOT NULL,
    "get" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "dist_proteina" INTEGER NOT NULL,
    "dist_carbohidrato" INTEGER NOT NULL,
    "dist_lipido" INTEGER NOT NULL,
    "req_cal" INTEGER NOT NULL,
    "req_proteina" INTEGER NOT NULL,
    "req_carbohidrato" INTEGER NOT NULL,
    "req_lipido" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,

    CONSTRAINT "requerimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comida" (
    "id" SERIAL NOT NULL,
    "descripcion" VARCHAR NOT NULL,
    "cereal" INTEGER NOT NULL,
    "verdura_lc" INTEGER NOT NULL,
    "verdura_cg" INTEGER NOT NULL,
    "fruta" INTEGER NOT NULL,
    "carne" INTEGER NOT NULL,
    "legumbre" INTEGER NOT NULL,
    "lacteo" INTEGER NOT NULL,
    "rico_lipido" INTEGER NOT NULL,
    "aceite" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,

    CONSTRAINT "comida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "public"."usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "anamnesis_consulta_id_key" ON "public"."anamnesis"("consulta_id");

-- CreateIndex
CREATE UNIQUE INDEX "anamnesis_cli_anamnesis_id_key" ON "public"."anamnesis_cli"("anamnesis_id");

-- CreateIndex
CREATE UNIQUE INDEX "anamnesis_ali_anamnesis_id_key" ON "public"."anamnesis_ali"("anamnesis_id");

-- CreateIndex
CREATE UNIQUE INDEX "r24h_anamnesis_ali_id_key" ON "public"."r24h"("anamnesis_ali_id");

-- CreateIndex
CREATE UNIQUE INDEX "anamnesis_psi_anamnesis_id_key" ON "public"."anamnesis_psi"("anamnesis_id");

-- CreateIndex
CREATE UNIQUE INDEX "evs_anamnesis_id_key" ON "public"."evs"("anamnesis_id");

-- CreateIndex
CREATE UNIQUE INDEX "mediciones_consulta_id_key" ON "public"."mediciones"("consulta_id");

-- CreateIndex
CREATE UNIQUE INDEX "basicas_mediciones_id_key" ON "public"."basicas"("mediciones_id");

-- CreateIndex
CREATE UNIQUE INDEX "pliegues_mediciones_id_key" ON "public"."pliegues"("mediciones_id");

-- CreateIndex
CREATE UNIQUE INDEX "perimetros_mediciones_id_key" ON "public"."perimetros"("mediciones_id");

-- CreateIndex
CREATE UNIQUE INDEX "diametros_mediciones_id_key" ON "public"."diametros"("mediciones_id");

-- CreateIndex
CREATE UNIQUE INDEX "resultados_med_mediciones_id_key" ON "public"."resultados_med"("mediciones_id");

-- CreateIndex
CREATE UNIQUE INDEX "plan_consulta_id_key" ON "public"."plan"("consulta_id");

-- AddForeignKey
ALTER TABLE "public"."consulta" ADD CONSTRAINT "consulta_profesional_id_fkey" FOREIGN KEY ("profesional_id") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."consulta" ADD CONSTRAINT "consulta_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."anamnesis" ADD CONSTRAINT "anamnesis_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "public"."consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."anamnesis_cli" ADD CONSTRAINT "anamnesis_cli_anamnesis_id_fkey" FOREIGN KEY ("anamnesis_id") REFERENCES "public"."anamnesis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."anamnesis_ali" ADD CONSTRAINT "anamnesis_ali_anamnesis_id_fkey" FOREIGN KEY ("anamnesis_id") REFERENCES "public"."anamnesis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."r24h" ADD CONSTRAINT "r24h_anamnesis_ali_id_fkey" FOREIGN KEY ("anamnesis_ali_id") REFERENCES "public"."anamnesis_ali"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."anamnesis_psi" ADD CONSTRAINT "anamnesis_psi_anamnesis_id_fkey" FOREIGN KEY ("anamnesis_id") REFERENCES "public"."anamnesis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."evs" ADD CONSTRAINT "evs_anamnesis_id_fkey" FOREIGN KEY ("anamnesis_id") REFERENCES "public"."anamnesis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mediciones" ADD CONSTRAINT "mediciones_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "public"."consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."basicas" ADD CONSTRAINT "basicas_mediciones_id_fkey" FOREIGN KEY ("mediciones_id") REFERENCES "public"."mediciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pliegues" ADD CONSTRAINT "pliegues_mediciones_id_fkey" FOREIGN KEY ("mediciones_id") REFERENCES "public"."mediciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."perimetros" ADD CONSTRAINT "perimetros_mediciones_id_fkey" FOREIGN KEY ("mediciones_id") REFERENCES "public"."mediciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."diametros" ADD CONSTRAINT "diametros_mediciones_id_fkey" FOREIGN KEY ("mediciones_id") REFERENCES "public"."mediciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."resultados_med" ADD CONSTRAINT "resultados_med_mediciones_id_fkey" FOREIGN KEY ("mediciones_id") REFERENCES "public"."mediciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plan" ADD CONSTRAINT "plan_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "public"."consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."requerimiento" ADD CONSTRAINT "requerimiento_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comida" ADD CONSTRAINT "comida_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
