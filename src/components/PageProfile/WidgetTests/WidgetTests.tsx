import React, { FC, useMemo, useState } from "react";
import {useGetStatusesQuery, useGetUserTestsQuery} from "../../../api/methods/moodle/testMoodleApi";
import { useTypedSelector } from "../../../store/hooks/redux";
import { TestCard } from "./TestCard/TestCard";
import { WidgetTemplate } from "../../Widgets/WidgetTemplate/WidgetTemplate";
import "./WidgetTests.css";

export const WidgetTests: FC = React.memo(() => {
    const { user } = useTypedSelector(state => state.auth);
    const moodleUserId = user?.moodleUser?.id;
    const queryLimit: number = 5;

    const { data: testStatusesRaw } = useGetStatusesQuery();

    const testStatuses = useMemo(() => {
        if (!testStatusesRaw || !testStatusesRaw.statuses) return [{ id: 0, title: "Все" }];
        return [
            { id: 0, title: "Все" },
            ...testStatusesRaw.statuses.map((status, index) => ({
                id: index + 1,
                title: status.title,
            })),
        ];
    }, [testStatusesRaw]);

    const [selectedStatus, setSelectedStatus] = useState<{id: number; title: string}>(testStatuses[0]);

    const { data: coursesData } = useGetUserTestsQuery(
        {
            idUser: moodleUserId,
            limit: queryLimit,
            ...(selectedStatus.title !== "Все" && { status: selectedStatus.title }),
        },
        { skip: !moodleUserId }
    );

    const tests = useMemo(() => coursesData?.tests ?? [], [coursesData]);

    const filteredTests = useMemo(() => {
        return selectedStatus.title === "Все"
            ? tests
            : tests.filter(test => test.status === selectedStatus.title);
    }, [tests, selectedStatus]);

    if (!tests && !testStatuses) return;

    return (
        <WidgetTemplate
            title="Тестирование и анкетирование"
            linkTo="/tests"
            data={tests}
            filteredItems={filteredTests}
            filters={[
                {
                    label: "Статус",
                    options: testStatuses,
                    selected: selectedStatus,
                    onChange: setSelectedStatus,
                },
            ]}
            renderItem={(test) => (
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
            )}
            emptyMessage="Тесты или анкеты не найдены"
            gridClass="tests-grid"
            widgetClass="widget-tests"
            queryLimit={queryLimit}
        />
    );
});
