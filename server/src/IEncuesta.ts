import { IPregunta } from "./IPregunta";

export interface IEncuesta{
    titulo: string,
    preguntas: IPregunta[],
    pin: string
}