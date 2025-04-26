import {Department} from "./IDepartment.ts";
import {Position} from "./IPosition.ts";
import {Image} from "./IImage.ts";

export interface User {
    id_user: number;
    login: string;
    name: string;
    surname: string;
    phoneNumber: string;
    department: Department;
    position: Position;
    image: Image;
}