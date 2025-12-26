import { CreateConsultaUseCase } from '../create-consulta.use-case';

describe('CreateConsulta UseCase', () => {
  it('calls all repository create methods with correct arguments and creates resultados med', async () => {
    const consultaRepo = { createConsulta: jest.fn().mockResolvedValue(undefined) } as any;
    const medicionesRepo = { createMediciones: jest.fn().mockResolvedValue(undefined) } as any;
    const basicasRepo = { createBasicas: jest.fn().mockResolvedValue(undefined) } as any;
    const plieguesRepo = { createPliegues: jest.fn().mockResolvedValue(undefined) } as any;
    const perimetrosRepo = { createPerimetros: jest.fn().mockResolvedValue(undefined) } as any;
    const diametrosRepo = { createDiametros: jest.fn().mockResolvedValue(undefined) } as any;
    const resultadosMedRepo = { createResultadosMed: jest.fn().mockResolvedValue(undefined) } as any;

    const useCase = new CreateConsultaUseCase(
      consultaRepo,
      medicionesRepo,
      basicasRepo,
      plieguesRepo,
      perimetrosRepo,
      diametrosRepo,
      resultadosMedRepo
    );

    const id_prof = 'prof-123';
    const dto = {
      consulta: { titulo: 'consulta demo' },
      mediciones: { peso: 70 },
      basicas: { edad: 30 },
      pliegues: { tricep: 10 },
      perimetros: { cintura: 80 },
      diametros: { femur: 20 }
    } as any;

    await expect(useCase.execute(id_prof, dto)).resolves.toBeUndefined();

    expect(consultaRepo.createConsulta).toHaveBeenCalledWith(id_prof, dto.consulta);
    expect(medicionesRepo.createMediciones).toHaveBeenCalledWith(id_prof, dto.mediciones);
    expect(basicasRepo.createBasicas).toHaveBeenCalledWith(id_prof, dto.basicas);
    expect(plieguesRepo.createPliegues).toHaveBeenCalledWith(id_prof, dto.pliegues);
    expect(perimetrosRepo.createPerimetros).toHaveBeenCalledWith(id_prof, dto.perimetros);
    expect(diametrosRepo.createDiametros).toHaveBeenCalledWith(id_prof, dto.diametros);

    expect(resultadosMedRepo.createResultadosMed).toHaveBeenCalledWith(id_prof, {
      mediciones: dto.mediciones,
      basicas: dto.basicas,
      pliegues: dto.pliegues,
      perimetros: dto.perimetros,
      diametros: dto.diametros
    });
  });
});
