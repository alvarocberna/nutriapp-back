import {BrazoCorregido, PiernaCorregido, MusloCorregido} from './perimetros-corregidos.service';

type MasaMuscularLeeKgType = {
    sexo: string
    edadDecimal: number
    talla: number
    brazoCorregido: number
    piernaCorregida: number
    musloCorregido: number
}

type MasaMuscularPorcType = {
    peso: number
    mmKg: number
}

export function MasaMuscularLeeKg({sexo, edadDecimal, talla, brazoCorregido, piernaCorregida, musloCorregido}: MasaMuscularLeeKgType): number{
    sexo = sexo[0].toUpperCase();
    let masaMuscular = 0;
    if(sexo === 'M'){
        masaMuscular = (talla/100)*(0.00744*(brazoCorregido**2)) + 0.00088*(musloCorregido**2) + 0.00441*(piernaCorregida**2) + 2.4*1 - 0.048*edadDecimal + 7.8;
    }else if(sexo === 'F'){
        masaMuscular = (talla/100)*(0.00744*(brazoCorregido**2)) + 0.00088*(musloCorregido**2) + 0.00441*(piernaCorregida**2) + 2.4*0 - 0.048*edadDecimal + 7.8;
    }
    return masaMuscular;
}

export function MasaMuscularPorc({peso, mmKg}: MasaMuscularPorcType): number{
    const masaMuscular = ((mmKg * 100) / peso);
    return masaMuscular;
}