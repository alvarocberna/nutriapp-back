//nest
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
//prisma
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../../../generated/prisma';

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