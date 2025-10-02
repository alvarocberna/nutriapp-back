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
import { ConsultaModule } from './presentation/consulta/consulta.module';
import { MedicionesModule } from './presentation/mediciones/mediciones.module';

@Module({
  // 1. PrismaModule debe ser importado aquí para que sus providers (PrismaService) estén disponibles globalmente.
  imports: [PrismaModule, UsuarioModule, ConsultaModule, MedicionesModule, UsuarioDatasourceModule], //modulos importados, lo cual proporciona sus providers
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