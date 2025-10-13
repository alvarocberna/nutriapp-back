-- CreateTable
CREATE TABLE "public"."relacion_pac_pro" (
    "id" SERIAL NOT NULL,
    "profesional_id" VARCHAR NOT NULL,
    "paciente_id" VARCHAR NOT NULL,

    CONSTRAINT "relacion_pac_pro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."relacion_pac_pro" ADD CONSTRAINT "relacion_pac_pro_profesional_id_fkey" FOREIGN KEY ("profesional_id") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."relacion_pac_pro" ADD CONSTRAINT "relacion_pac_pro_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
