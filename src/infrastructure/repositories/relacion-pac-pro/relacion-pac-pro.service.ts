//nest
import { Injectable } from '@nestjs/common';
//domain
import { RelacionPacProRepository, UsuarioEntity } from 'src/domain';
//infrastructure - local
import { RelacionPacProDatasourceService } from 'src/infrastructure/datasources/relacion-pac-pro/relacion-pac-pro.service';

@Injectable()
export class RelacionPacProRepositoryService implements RelacionPacProRepository {
    constructor(
        private readonly relacionPacProDatasourceService: RelacionPacProDatasourceService
    ){}

    createRelacion(paciente_id: string, profesional_id: string): Promise<void>{
        return this.relacionPacProDatasourceService.createRelacion(paciente_id, profesional_id);
    };
    getProfesionalesByPaciente(paciente_id: string): Promise<UsuarioEntity[]>{
        return this.relacionPacProDatasourceService.getProfesionalesByPaciente(paciente_id);
    };
    getPacientesByProfesional(profesional_id: string): Promise<UsuarioEntity[]>{
        return this.relacionPacProDatasourceService.getPacientesByProfesional(profesional_id);
    };
    deleteRelacion(pacienteId: string, profesionalId: string): Promise<void>{
        return this.relacionPacProDatasourceService.deleteRelacion(pacienteId, profesionalId);
    };


}
