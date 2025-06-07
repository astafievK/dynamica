import { IDepartment } from "./IDepartment";
import {IPosition} from "./IPosition";
import {IImage} from "./IImage";
import { IPermission } from "./IPermission";

export interface IUser {
    id_user: number;
    login: string;
    name: string;
    surname: string;
    phoneNumber: string;
    department: IDepartment;
    position: IPosition;
    image: IImage;
    permissions: IPermission[];
}