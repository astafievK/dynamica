import {Date} from "./IDate.ts";
import {Image} from "./IImage.ts";
import {Position} from "./IPosition.ts";

export interface Employee {
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    uid: string,
    phone: string,
    email: string | null,
    birthday: Date,
    is_retired: boolean,
    department_id: number | null,
    position: Position,
    image: Image
}