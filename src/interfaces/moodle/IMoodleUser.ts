import {IMoodlePreference} from "./IMoodlePreference";

export interface IMoodleUser {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    department: string;
    firstaccess: bigint
    lastaccess: bigint
    auth: string
    suspended: boolean
    confirmed: boolean
    lang: string
    theme: string
    timezone: string
    mailformat: number
    description: string
    descriptionFormat: number
    profileimageurlsmall: string
    profileimageurl: string
    preferences: IMoodlePreference[]
}