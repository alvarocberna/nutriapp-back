export type Suma4pType = {
    bicep: number
    tricep: number   
    subescapular: number
    crestailiaca: number
}

export type Suma6pType = {
    tricep: number
    subescapular: number
    supraespinal: number
    abominal: number
    muslo: number
    pierna: number
}

export type Suma8pType = {
    tricep: number
    subescapular: number
    bicep: number
    crestailiaca: number
    supraespinal: number
    abominal: number
    muslo: number
    pierna: number
}

export function Suma4p(props: Suma4pType){
    const {bicep, tricep, subescapular, crestailiaca} = props;
    const suma = bicep + tricep + subescapular + crestailiaca;
    return suma;
}    

export function Suma6p(props: Suma6pType){
    const {tricep, subescapular, supraespinal, abominal, muslo, pierna} = props;
    const suma = tricep + subescapular + supraespinal + abominal + muslo + pierna;
    return suma;
}

export function Suma8p(props: Suma8pType){
    const {tricep, subescapular, bicep, crestailiaca, supraespinal, abominal, muslo, pierna} = props
    const suma = tricep + subescapular + bicep + crestailiaca + supraespinal + abominal + muslo + pierna;
    return suma;
}