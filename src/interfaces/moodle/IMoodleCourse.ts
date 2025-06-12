export interface IMoodleCourse {
    id: number;
    shortname: string;
    fullname: string;
    displayname: string;
    enrolledusercount: number;
    idnumber: string | null;
    visible: number;
    summary: string;
    summaryformat: number;
    format: string;
    courseimage: string;
    showgrades: number;
    lang: string;
    enablecompletion: number;
    completionhascriteria: boolean | null;
    completionusertracked: number;
    category: number;
    progress: number;
    completed: boolean | null;
    startdate: number;
    enddate: number;
    marker: number;
    lastaccess: number;
    isfavourite: boolean | null;
    hidden: boolean | null;
    overviewfiles: any[]; // можешь уточнить, если будет известно
    showactivitydates: number;
    showcompletionconditions: number;
    timemodified: number;
}
