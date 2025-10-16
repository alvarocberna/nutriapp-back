//nest
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//infrastructure
import { PrismaModule } from './infrastructure/prisma/prisma.module';
//presentation
import { UsuarioModule } from './presentation/usuario/usuario.module';
import { ConsultaModule } from './presentation/consulta/consulta.module';
import { MedicionesModule } from './presentation/mediciones/mediciones.module';
import { AuthModule } from './presentation/auth/auth.module';

@Module({
  imports: [
          PrismaModule, //Importamos prisma para que esté disponible globalmente
          UsuarioModule, //Importamos este módulo y los otros para conectarlo a la app
          ConsultaModule, 
          MedicionesModule, 
          AuthModule,
          ConfigModule.forRoot({
            isGlobal: true, // hace que las variables estén disponibles en todo el proyecto
          }),
        ], //modulos importados, lo cual proporciona sus providers
  exports: [], //proveedores de este módulo que se podrán usar por otros módulos que importen este
})
export class AppModule {}