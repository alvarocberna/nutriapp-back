/*
  Warnings:

  - The values [MUYALTO] on the enum `EvaClasificacion` will be removed. If these variants are still used in the database, this will fail.
  - The values [BAJOPESO,NORMOPESO,SOBREPESO] on the enum `IMCClasificacion` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."EvaClasificacion_new" AS ENUM ('BAJO', 'MEDIO', 'ALTO', 'MUY_ALTO');
ALTER TABLE "public"."resultados_med" ALTER COLUMN "gc_clasificacion" TYPE "public"."EvaClasificacion_new" USING ("gc_clasificacion"::text::"public"."EvaClasificacion_new");
ALTER TABLE "public"."resultados_med" ALTER COLUMN "gv_clasificacion" TYPE "public"."EvaClasificacion_new" USING ("gv_clasificacion"::text::"public"."EvaClasificacion_new");
ALTER TABLE "public"."resultados_med" ALTER COLUMN "mm_clasificacion" TYPE "public"."EvaClasificacion_new" USING ("mm_clasificacion"::text::"public"."EvaClasificacion_new");
ALTER TABLE "public"."resultados_med" ALTER COLUMN "imm_clasificacion" TYPE "public"."EvaClasificacion_new" USING ("imm_clasificacion"::text::"public"."EvaClasificacion_new");
ALTER TYPE "public"."EvaClasificacion" RENAME TO "EvaClasificacion_old";
ALTER TYPE "public"."EvaClasificacion_new" RENAME TO "EvaClasificacion";
DROP TYPE "public"."EvaClasificacion_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."IMCClasificacion_new" AS ENUM ('BAJO_PESO', 'NORMO_PESO', 'SOBRE_PESO', 'OBESIDAD_I', 'OBESIDAD_II', 'OBESIDAD_III');
ALTER TABLE "public"."resultados_med" ALTER COLUMN "imc_clasificacion" TYPE "public"."IMCClasificacion_new" USING ("imc_clasificacion"::text::"public"."IMCClasificacion_new");
ALTER TYPE "public"."IMCClasificacion" RENAME TO "IMCClasificacion_old";
ALTER TYPE "public"."IMCClasificacion_new" RENAME TO "IMCClasificacion";
DROP TYPE "public"."IMCClasificacion_old";
COMMIT;
