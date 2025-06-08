import {AnimatePresence, motion} from "framer-motion";
import { useGetUsersFilteredQuery } from "../../api/methods/userApi.ts";
import { FC, useEffect, useMemo, useState } from "react";
import { pageAnimation } from "../../constants/motionSettings.ts";
import { useDebounce } from "../../store/hooks/useDebounce.ts";
import { useSearchParams } from "react-router-dom";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux.ts";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Pagination } from "../Pagination/Pagination.tsx";
import { Dropdown } from "../Dropdown/Dropdown.tsx";
import {EmployeesList} from "./EmployeesList.tsx";
import {setEmployeesContainerStyle} from "../../api/slices/employeesContainerSlice.ts";
import {useGetDepartmentsTitlesNotNullQuery} from "../../api/methods/departmentApi.ts";
import {Permissions} from "../../constants/permissions.ts";
import {useHasPermission} from "../../store/hooks/useHasPermission.ts";

const ITEMS_PER_PAGE = 100;

const contactsStyles = [
    { id: 0, title: "Новый вид" },  // id=0 => "new"
    { id: 1, title: "Старый вид" }, // id=1 => "old"
];

const idToStyleMap: Record<number, "new" | "old"> = {
    0: "new",
    1: "old",
};

const styleToIdMap: Record<"new" | "old", number> = {
    new: 0,
    old: 1,
};

const normalizeSearch = (value: string) => value.trim().replace(/\s+/g, " ");

export const PageContacts: FC = () => {
    const [selectedDepartment, setSelectedDepartment] = useState<{id: number, title: string}>({ id: 0, title: "Все" });
    const [temporarySearchValue, setTemporarySearchValue] = useState<string>("");
    const debouncedSearchValue = useDebounce(temporarySearchValue, 150);
    const [isFilterChanging, setIsFilterChanging] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { user } = useTypedSelector(state => state.auth)
    const { data: departmentsTitles, isLoading: departmentsLoading } = useGetDepartmentsTitlesNotNullQuery();
    const { data, isLoading } = useGetUsersFilteredQuery({
        department: selectedDepartment?.title,
        search: normalizeSearch(debouncedSearchValue)
    });

    const canViewHiddenUsers = useHasPermission(Permissions.Superuser);

    const style = useTypedSelector(state => state.employeesContainerReducer.style);
    const dispatch = useAppDispatch();
    const selectedStyle = contactsStyles.find(c => styleToIdMap[style] === c.id) || null;

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!departmentsTitles) return;

        const departmentTitle = searchParams.get("department") || "";
        const search = searchParams.get("search") || "";

        const matchedDepartment =
            departmentTitle === "" || departmentTitle === "Все"
                ? { id: 0, title: "Все" }
                : departmentsTitles.departments
                .map((title, index) => ({ id: index + 1, title }))
                .find((d) => d.title === departmentTitle) || { id: 0, title: "Все" };

        if (matchedDepartment.title !== selectedDepartment.title) {
            setSelectedDepartment(matchedDepartment);
        }

        if (search !== temporarySearchValue) {
            setTemporarySearchValue(search);
        }
    }, [
        departmentsTitles,
        searchParams,
        selectedDepartment.title,
        temporarySearchValue,
    ]);

    useEffect(() => {
        setCurrentPage(1);
        setIsFilterChanging(true);
        const params: Record<string, string> = {};

        if (selectedDepartment.title && selectedDepartment.title !== "Все") {
            params.department = selectedDepartment.title;
        }

        const normalizedSearch = normalizeSearch(temporarySearchValue);
        if (normalizedSearch) {
            params.search = normalizedSearch;
        }

        setSearchParams(params);
    }, [selectedDepartment, temporarySearchValue, setSearchParams]);

    useEffect(() => {
        if (!isLoading && data) {
            setIsFilterChanging(false);
        }
    }, [isLoading, data]);

    const paginatedUsers = useMemo(() => {
        if (!data?.users) return [];

        const visibleUsers = user
            ? data.users
            : data.users.filter((u) => !u.is_hidden);

        return visibleUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    }, [data?.users, currentPage, user]);

    const totalPages = Math.ceil((data?.users?.length || 0) / ITEMS_PER_PAGE);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        scrollTo(0,0)
    }

    const onSelectStyle = (option: { id: number; title: string }) => {
        const styleValue = idToStyleMap[option.id];
        dispatch(setEmployeesContainerStyle(styleValue));
        scrollTo(0,0)
    };

    const onSelectDepartment = (option: { id: number; title: string }) => {
        setSelectedDepartment(option);
        scrollTo(0, 0);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={pageAnimation.initial}
                animate={pageAnimation.animate}
                exit={pageAnimation.exit}
                transition={pageAnimation.transition}
                className="page page-contacts"
            >
                <div className="page-filters">
                    <Dropdown
                        options={contactsStyles}
                        label="Стиль"
                        value={selectedStyle}
                        onSelect={onSelectStyle}
                        externalClasses={['page-filters-item']}
                    />
                    {
                        departmentsTitles && !departmentsLoading && (
                            <Dropdown
                                options={[
                                    { id: 0, title: "Все" },
                                    ...departmentsTitles.departments.map((departmentTitle: string, index: number) => ({
                                        id: index + 1,
                                        title: departmentTitle,
                                    }))
                                ]}
                                label="Отдел"
                                value={selectedDepartment}
                                onSelect={onSelectDepartment}
                                externalClasses={['page-filters-item']}
                            />
                        )
                    }
                    <div className="filters-search">
                        <input
                            type="text"
                            className="filters-search__text styled"
                            placeholder="Поиск по ФИО / Должности"
                            value={temporarySearchValue}
                            onChange={(e) => setTemporarySearchValue(e.target.value)}
                        />
                        {
                            temporarySearchValue.length > 0 && <ClearRoundedIcon onClick={() => setTemporarySearchValue('')}/>
                        }
                    </div>
                </div>
                <div className="page-content">
                    <EmployeesList
                        isLoading={isLoading}
                        isFilterChanging={isFilterChanging}
                        users={paginatedUsers}
                        showHidden={canViewHiddenUsers}
                        isOldStyleEnabled={style === "old"}
                    />
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={goToPage}
                        />
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};