import { IDepartment } from "./IDepartment";
import {IPosition} from "./IPosition";
import {IImage} from "./IImage";
import { IPermission } from "./IPermission";
import {IMoodleUser} from "./moodle/IMoodleUser";

export interface IAuthorizedUser {
    id_user: number;
    login: string;
    name: string;
    surname: string;
    email: string | null;
    phoneNumber: string;
    department: IDepartment;
    position: IPosition;
    image: IImage;
    permissions: IPermission[];
    moodleUser: IMoodleUser;
}