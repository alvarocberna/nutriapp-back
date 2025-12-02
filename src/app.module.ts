//nest
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; //permite llamar env var
//infrastructure
import { PrismaModule } from './infrastructure/prisma/prisma.module';
//presentation
import { UsuarioModule } from './presentation/usuario/usuario.module';
import { ConsultaModule } from './presentation/consulta/consulta.module';
import { MedicionesModule } from './presentation/mediciones/mediciones.module';
import { AuthModule } from './presentation/auth/auth.module';

@Module({
  imports: [ 
          PrismaModule, //prisma disponible globalmente
          UsuarioModule, 
          ConsultaModule, 
          MedicionesModule, 
          AuthModule,
          ConfigModule.forRoot({
            isGlobal: true, //env var disponibles en todo el proyecto
          }),
        ], 
  exports: [], 
})
export class AppModule {}