import { FC, useState } from "react";
import {FilterButtons} from "../../FilterButtons/FilterButtons.tsx";
import {TestCard} from "./TestCard/TestCard.tsx";
import './WidgetTests.css'
import {IMoodleUserTestsInfoResponse} from "../../../interfaces/moodle/IMoodleUserTestsInfoResponse.ts";

interface IWidgetTestsProps {
    tests: IMoodleUserTestsInfoResponse[];
}

const testsStatuses: string[] = [
    "Новое",
    "В процессе",
    "Завершено"
];

export const WidgetTests: FC<IWidgetTestsProps> = ({ tests }) => {
    const [testStatus, setTestStatus] = useState<string>(testsStatuses[0])

    return (
        <div className="widget widget-tests">
            <div className="widget__header">
                <span className="widget__title">Тестирование и анкетирование</span>
            </div>
            <div className="widget__filters">
                <FilterButtons
                    filter={testStatus}
                    setFilter={setTestStatus}
                    data={testsStatuses}
                    renderLabel={(item) => item}
                />
            </div>
            <div className="widget__body">
                {
                    tests.map((test) => {
                        return <TestCard
                            key={test.quiz_id}
                            title={test.quiz_name}
                            status={test.status}
                            id={test.quiz_id}
                            quizEndUnix={test.quiz_close_date}
                            questionsCount={test.questions_count}
                        />
                    })
                }
            </div>
        </div>
    );
}
