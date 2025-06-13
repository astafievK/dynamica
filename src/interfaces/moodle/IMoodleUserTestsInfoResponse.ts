export interface IMoodleUserTestsInfoResponse {
    course_id: number;
    course_name: string;
    section_id: number;
    section_name: string | null;
    quiz_internal_id: number | null;
    quiz_id: number;
    quiz_name: string;
    quiz_type_system: "quiz" | "assign" | "feedback" | "survey" | "questionnaire";
    quiz_type: string;
    instance_id: number;
    attempt_id: number | null;
    state: "inprogress" | "everdue" | "finished" | "abandoned" | null;
    time_modified: number | null;
    time_finish: number | null;
    quiz_open_date: number | null;
    quiz_close_date: number | null;
    user_start_date: number | null;
    user_finish_date: number | null;
    status: "Завершено" | "Новое" | "В процессе"
    questions_count: number | null;
}