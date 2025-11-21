import { IMCClasificacion } from 'generated/prisma';

type ImcType = {
    peso: number
    talla: number
}


export function IMC({peso, talla}: ImcType): number{
    if(talla <10){
        talla = talla * 100
    }
    const imc = peso / ((talla/100)**2)
    return imc;
}

export function ImcClasificacion(imc: number): IMCClasificacion{
    let clasificacion: IMCClasificacion = IMCClasificacion.NORMO_PESO;
    switch(true){
        case imc < 18.5:
            clasificacion = IMCClasificacion.BAJO_PESO;;
            break;
        case imc >= 18.5 && imc < 25:
            clasificacion = IMCClasificacion.NORMO_PESO;
            break;
        case imc >= 25 && imc < 30:
            clasificacion = IMCClasificacion.SOBRE_PESO;
            break;
        case imc >= 30:
            clasificacion = IMCClasificacion.OBESIDAD_I;
            break;
        case imc >= 35 && imc < 40:
            clasificacion = IMCClasificacion.OBESIDAD_II;
            break;
        case imc >= 40:
            clasificacion = IMCClasificacion.OBESIDAD_III;
            break;
        }
    return clasificacion;
}