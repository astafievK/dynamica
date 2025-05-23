import {Date} from "./IDate.ts";
import {Image} from "./IImage.ts";
import {Position} from "./IPosition.ts";
import {Department} from "./IDepartment.ts";

export interface Employee {
    id_user: number,
    name: string,
    surname: string,
    patronymic: string,
    uid: string,
    phone: string,
    email: string | null,
    birthday: Date,
    is_retired: boolean,
    is_hidden: boolean,
    department: Department,
    position: Position,
    image: Image
}