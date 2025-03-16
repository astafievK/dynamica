import {City} from "./ICity.ts";
import {Organization} from "./IOrganization.ts";
import {Division} from "./IDivision.ts";

export interface Department {
    id_department: number;
    title: string | null;
    city: City
    organization: Organization
    division: Division
}