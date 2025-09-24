//nest
import { Module } from '@nestjs/common';
//local
import { AppController } from './app.controller';
import { AppService } from './app.service';
//infrastructure
// import { UsuarioRepositoryModule } from './infrastructure/repositories/usuario.repository/usuario.repository.module';
import { UsuarioDatasourceModule } from './infrastructure/datasources/usuario.datasource/usuario.datasource.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
//presentation
import { UsuarioModule } from './presentation/usuario/usuario.module';
@Module({
  // 1. PrismaModule debe ser importado aquí para que sus providers (PrismaService) estén disponibles globalmente.
  imports: [PrismaModule, UsuarioModule, UsuarioDatasourceModule], //modulos importados - además de los providers de estos (?)
  controllers: [AppController], //controllers ok
  providers: [AppService,
    //   {
    //   provide: 'UsuarioRepository', // Token de inyección
    //   useClass: UsuarioDatasourceModule,
    // },
  ], // proveedores de este modulo: services, etc |
  exports: [], //proveedores de este módulo que se podrán usar por otros módulos que importen este
})
export class AppModule {}

//dudas
//1-Para usar un servicio de otro modulo, debo incluirlo en el providers de este módulo?
//2-Como crear una instancia de un servicio importado dentro de mi módulo???