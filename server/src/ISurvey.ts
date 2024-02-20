import { IQuestion } from "./IQuestion";

export interface ISurvey {
    title: string;
    questions: IQuestion[];
    pin: string;
}