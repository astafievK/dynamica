import {ICity} from "./ICity";
import {IOrganization} from "./IOrganization";
import {IDivision} from "./IDivision";

export interface IDepartment {
    id_department: number;
    title: string;
    city: ICity
    organization: IOrganization
    division: IDivision
}