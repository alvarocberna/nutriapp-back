//nest
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
//prisma
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../../../generated/prisma';

/**
 * Service que gestiona la conexión con la base de datos mediante Prisma ORM.
 * 
 * Extiende PrismaClient e implementa los hooks del ciclo de vida de NestJS
 * para conectar y desconectar automáticamente de la base de datos.
 * 
 * @class PrismaService
 * @extends PrismaClient
 * @implements OnModuleInit - Se ejecuta cuando el módulo se inicializa
 * @implements OnModuleDestroy - Se ejecuta cuando el módulo se destruye
 * 
 * @example
 * // En app.module.ts
 * @Module({
 *   providers: [PrismaService],
 * })
 * export class AppModule {}
 * 
 * @example
 * // Uso en otros servicios
 * constructor(private prisma: PrismaService) {}
 * 
 * async getUser(id: string) {
 *   return this.prisma.user.findUnique({ where: { id } });
 * }
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

//Este servicio expone el cliente de Prisma y se encarga de manejar la conexión: