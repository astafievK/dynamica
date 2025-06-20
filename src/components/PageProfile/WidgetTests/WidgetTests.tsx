import React, { FC, useMemo, useState } from "react";
import { TestCard } from "./TestCard/TestCard.tsx";
import { BannerNoData } from "../../BannerNoData/BannerNoData.tsx"; // убедись, что путь верный
import './WidgetTests.css';
import '../Widget.css';
import { useGetUserTestsQuery } from "../../../api/methods/moodle/testMoodleApi.ts";
import { useTypedSelector } from "../../../store/hooks/redux.ts";
import {Dropdown} from "../../Dropdown/Dropdown.tsx";

const testStatuses = [
    { id: 0, title: "Все" },
    { id: 1, title: "Новое" },
    { id: 2, title: "В процессе" },
    { id: 3, title: "Завершено" },
];

export const WidgetTests: FC = React.memo(() => {
    const [selectedStatus, setSelectedStatus] = useState<{id: number, title: string}>(testStatuses[0]);
    const { user } = useTypedSelector(state => state.auth);
    const moodleUserId = user?.moodleUser?.id;

    const { data: coursesData } = useGetUserTestsQuery(
        { idUser: moodleUserId },
        { skip: !moodleUserId }
    );

    const tests = useMemo(() => coursesData?.data ?? [], [coursesData]);

    const filteredTests = useMemo(() => {
        return selectedStatus.title === "Все"
            ? tests
            : tests.filter(test => test.status === selectedStatus.title);
    }, [tests, selectedStatus]);

    return (
        <div className="widget widget-tests">
            <div className="widget__header">
                <span className="widget__title">Тестирование и анкетирование</span>
            </div>
            {tests.length > 0 && (
                <div className="widget__filters">
                    <Dropdown
                        options={testStatuses}
                        label="Статус"
                        value={selectedStatus}
                        onSelect={setSelectedStatus}
                        externalClasses={[]}
                        searchEnabled={false}
                    />
                </div>
            )}
            <div className="widget__body">
                {filteredTests.length === 0 ? (
                    <BannerNoData content={"Тесты или анкеты не найдены"} />
                ) : (
                    <div className={"tests-grid"}>
                        {
                            filteredTests.map((test) => (
                                <TestCard
                                    key={test.quiz_id}
                                    title={test.quiz_name}
                                    status={test.status}
                                    typeTitle={test.quiz_type}
                                    systemTypeTitle={test.quiz_type_system}
                                    id={test.quiz_id}
                                    quizOpenUnix={test.quiz_open_date}
                                    quizFinishUnix={test.quiz_close_date}
                                    userStartUnix={test.quiz_open_date}
                                    userFinishUnix={test.user_start_date}
                                    questionsCount={test.questions_count}
                                />
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
});
