
type BrazoCorregidoType = {
    brazoPer: number
    tricepPli: number
}

type MusloCorregidoType = {
    musloPer: number
    musloPli: number
}

type PiernaCorregidaType = {
    piernaPer: number
    piernaPli: number
}

export function BrazoCorregido({brazoPer, tricepPli}: BrazoCorregidoType): number{
    const brazoCorregido = brazoPer - ((tricepPli/10)*Math.PI);
    return brazoCorregido;
}

export function MusloCorregido({musloPer, musloPli}: MusloCorregidoType): number{
    const musloCorregido = musloPer - ((musloPli/10)*Math.PI);
    return musloCorregido;
}   

export function PiernaCorregido({piernaPer, piernaPli}: PiernaCorregidaType): number{
    const piernaCorregida = piernaPer - ((piernaPli/10)*Math.PI);
    return piernaCorregida;
}