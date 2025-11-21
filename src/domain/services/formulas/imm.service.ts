//prisma
import { EvaClasificacion } from 'generated/prisma';

type ImmType = {
    peso: number
    talla: number
    gckg: number
}

type ImmClasificacionType = {
    imm: number
    sexo: string
}

export function IMM({peso, talla, gckg}: ImmType): number{
    peso = peso - gckg;
    if(talla <10){
        talla = talla * 100
    }
    const imm = ( peso / ((talla/100)**2) ) + (6.3 * (1.8 - (talla/100)))
    return imm;
}

export function ImmClasificacion({imm, sexo}: ImmClasificacionType): EvaClasificacion{
    sexo = sexo[0].toUpperCase();
    let clasificacion: EvaClasificacion = EvaClasificacion.MEDIO;
    if(sexo === 'M'){
        switch(true){
            case imm < 19:
                clasificacion = EvaClasificacion.BAJO;;
                break;
            case imm >= 19 && imm < 21:
                clasificacion = EvaClasificacion.MEDIO;
                break;
            case imm >= 21 && imm < 23:
                clasificacion = EvaClasificacion.ALTO;
                break;
            case imm >= 23:
                clasificacion = EvaClasificacion.MUY_ALTO;
                break;
        }
    }else if(sexo === 'F'){
        switch(true){
            case imm < 15:
                clasificacion = EvaClasificacion.BAJO;;
                break;
            case imm >= 15 && imm < 17:
                clasificacion = EvaClasificacion.MEDIO;
                break;
            case imm >= 17 && imm < 19:
                clasificacion = EvaClasificacion.ALTO;
                break;
            case imm >= 19:
                clasificacion = EvaClasificacion.MUY_ALTO;
                break;
        }
    }
    return clasificacion;
}