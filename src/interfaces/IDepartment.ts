import {City} from "./ICity";
import {IOrganization} from "./IOrganization";
import {IDivision} from "./IDivision";

export interface IDepartment {
    id_department: number;
    title: string;
    city: City
    organization: IOrganization
    division: IDivision
}