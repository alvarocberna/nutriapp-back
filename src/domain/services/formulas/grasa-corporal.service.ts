import { EvaClasificacion } from 'generated/prisma';
import {Suma6p, Suma6pType} from './suma-pliegues.service';

type FaulknerType = {
    sexo: string,
    suma6p: number,
}

type YuhaszType = {
    sexo: string,
    pliegues: {
        tricep: number
        subescapular: number
        suprailiaco: number
        abdominal: number
    }
}

type DensidadType = {
    edad: number
    sexo: string
    suma4p: number
}

type MasaGrasaKgType = {
    peso: number
    gcPorc: number
}

type gcClasificacionType = {
    sexo: string
    edad: number
    gcPorc: number
}


export function MasaGrasaFaulknerPorc({sexo, suma6p}: FaulknerType): number{
    sexo = sexo[0].toUpperCase();
    let grasaCorporal = 0;
    if(sexo === 'M'){
        grasaCorporal = 0.1051*(suma6p)+2.58;
    }else if(sexo === 'F'){
        grasaCorporal = 0.1548*(suma6p)+3.58;
    }
    return grasaCorporal;
}

export function MasaGrasaYuhaszPorc({sexo, pliegues}: YuhaszType): number{
    sexo = sexo[0].toUpperCase();
    const {tricep, subescapular, suprailiaco, abdominal} = pliegues;
    let grasaCorporal = 0;
    if(sexo === 'M'){
        grasaCorporal = 5.783+(tricep+subescapular+suprailiaco+abdominal)*0.153;
    }else if(sexo === 'F'){
        grasaCorporal = 7.9+(tricep+subescapular+suprailiaco+abdominal)*0.213;
    }
    return grasaCorporal;
}

export function MasaGrasaSiriPorc(densidad: number): number{
    const grasaCorporal = ((4.95/densidad) - 4.5 ) * 100;
    return grasaCorporal;
}

export function Densidad({edad, sexo, suma4p}: DensidadType): number{
    sexo = sexo[0].toUpperCase();
    let densidad: number = 1;
    if(sexo === 'M'){
        switch(true){
            case edad<20:
                densidad = 1.162-(0.063*(Math.log10(suma4p)))
                break;
            case edad<30:
                densidad = 1.1631-(0.0632*(Math.log10(suma4p)))
                break;
            case edad<40:
                densidad = 1.1422-(0.0544*(Math.log10(suma4p)))
                break;
            case edad<50:
                densidad = 1.162-(0.07*(Math.log10(suma4p)))
                break;
            case edad>50:
                densidad = 1.1715-(0.0779*(Math.log10(suma4p)))
                break;
    }}else if(sexo === 'F'){
        switch(true){
            case edad<20:
                densidad = 1.1549-(0.0678*(Math.log10(suma4p)))
                break;
            case edad<30:
                densidad = 1.1599-(0.0717*(Math.log10(suma4p)))
                break;
            case edad<40:
                densidad = 1.1423-(0.0632*(Math.log10(suma4p)))
                break;
            case edad<50:
                densidad = 1.1333-(0.0612*(Math.log10(suma4p)))
                break;
            case edad>50:
                densidad = 1.1339-(0.0645*(Math.log10(suma4p)))
                break;
        }}
    return densidad;
}

export function MasaGrasaKg({peso, gcPorc}: MasaGrasaKgType): number{
    const grasaCorporal = ( gcPorc * peso ) / 100;
    return grasaCorporal;
}

export function GCClasificacion({sexo, edad, gcPorc}: gcClasificacionType): EvaClasificacion{
    sexo = sexo[0].toUpperCase();
    let clasificacion: EvaClasificacion = EvaClasificacion.MEDIO;
    if(sexo === 'M'){
        switch(true){
            case edad < 40:
                if(gcPorc < 8){
                    clasificacion = EvaClasificacion.BAJO;
                }else if (gcPorc < 20 && gcPorc >=8){
                    clasificacion = EvaClasificacion.MEDIO;
                }else if(gcPorc < 25 &&gcPorc >= 20){
                    clasificacion = EvaClasificacion.ALTO;
                }else if(gcPorc >= 25){
                    clasificacion = EvaClasificacion.MUY_ALTO;
                }
                break;
            case edad < 60:
                if(gcPorc < 11){
                    clasificacion = EvaClasificacion.BAJO;
                }else if (gcPorc < 22 && gcPorc >=11){
                    clasificacion = EvaClasificacion.MEDIO;
                }else if(gcPorc < 28 &&gcPorc >= 22){
                    clasificacion = EvaClasificacion.ALTO;
                }else if(gcPorc >= 28){
                    clasificacion = EvaClasificacion.MUY_ALTO;
                }
            case edad >= 60:
                if(gcPorc < 13){
                    clasificacion = EvaClasificacion.BAJO;
                }else if (gcPorc < 25 && gcPorc >=13){
                    clasificacion = EvaClasificacion.MEDIO;
                }else if(gcPorc < 30 &&gcPorc >= 25){
                    clasificacion = EvaClasificacion.ALTO;
                }else if(gcPorc >= 30){
                    clasificacion = EvaClasificacion.MUY_ALTO;
                }
                break;
        }
    }else if(sexo === 'F'){
        switch(true){
            case edad < 40:
                if(gcPorc < 21){
                    clasificacion = EvaClasificacion.BAJO;
                }else if (gcPorc < 33 && gcPorc >=21){
                    clasificacion = EvaClasificacion.MEDIO;
                }else if(gcPorc < 39 &&gcPorc >= 33){
                    clasificacion = EvaClasificacion.ALTO;
                }else if(gcPorc >= 39){
                    clasificacion = EvaClasificacion.MUY_ALTO;
                }
                break;
            case edad < 60:
                if(gcPorc < 23){
                    clasificacion = EvaClasificacion.BAJO;
                }else if (gcPorc < 35 && gcPorc >=23){
                    clasificacion = EvaClasificacion.MEDIO;
                }else if(gcPorc < 40 &&gcPorc >= 35){
                    clasificacion = EvaClasificacion.ALTO;
                }else if(gcPorc >= 40){
                    clasificacion = EvaClasificacion.MUY_ALTO;
                }
                break;
            case edad >= 60:
                if(gcPorc < 24){
                    clasificacion = EvaClasificacion.BAJO;
                }else if (gcPorc < 36 && gcPorc >=24){
                    clasificacion = EvaClasificacion.MEDIO;
                }else if(gcPorc < 42 &&gcPorc >= 36){
                    clasificacion = EvaClasificacion.ALTO;
                }else if(gcPorc >= 42){
                    clasificacion = EvaClasificacion.MUY_ALTO;
                }
                break;
        }
    }
    return clasificacion;
}