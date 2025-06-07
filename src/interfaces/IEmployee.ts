import {IDepartment} from "./IDepartment";
import {IPosition} from "./IPosition";
import {IImage} from "./IImage";
import {IDate} from "./IDate";

export interface Employee {
    id_user: number,
    name: string,
    surname: string,
    patronymic: string,
    uid: string,
    phone: string,
    email: string | null,
    birthday: IDate,
    is_retired: boolean,
    is_hidden: boolean,
    department: IDepartment,
    position: IPosition,
    image: IImage
}