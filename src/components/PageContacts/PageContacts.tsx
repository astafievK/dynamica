import {AnimatePresence, motion} from "framer-motion";
import { useGetUsersFilteredQuery } from "../../api/methods/userApi.ts";
import { FC, useEffect, useMemo, useState } from "react";
import { pageAnimation } from "../../constants/pageAnimation.ts";
import { useDebounce } from "../../store/hooks/useDebounce.ts";
import { useSearchParams } from "react-router-dom";
import {useTypedSelector} from "../../store/hooks/redux.ts";
import { Pagination } from "../Pagination/Pagination.tsx";
import { Dropdown } from "../CustomComponents/Dropdown/Dropdown.tsx";
import {EmployeesList} from "./EmployeesList/EmployeesList.tsx";
import {useGetDepartmentsTitlesNotNullQuery} from "../../api/methods/departmentApi.ts";
import {Permissions} from "../../constants/permissions.ts";
import {useHasPermission} from "../../store/hooks/useHasPermission.ts";
import "./PageContacts.css"
import {SearchInput} from "../SearchInput/SearchInput.tsx";

const ITEMS_PER_PAGE = 150;

/*
const contactsStyles = [
    { id: 0, title: "Новый вид" },
    { id: 1, title: "Старый вид" },
];

const idToStyleMap: Record<number, "new" | "old"> = {
    0: "new",
    1: "old",
};

const styleToIdMap: Record<"new" | "old", number> = {
    new: 0,
    old: 1,
};
*/

const normalizeSearch = (value: string) => value.trim().replace(/\s+/g, " ");

export const PageContacts: FC = () => {
    const [isInitializedFromUrl, setIsInitializedFromUrl] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<{id: number, title: string}>({ id: 0, title: "Все" });
    const [temporarySearchValue, setTemporarySearchValue] = useState<string>("");
    const debouncedSearchValue = useDebounce(temporarySearchValue, 80);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { user } = useTypedSelector(state => state.auth)
    const { data: departmentsTitles, isLoading: departmentsLoading } = useGetDepartmentsTitlesNotNullQuery();

    const { data, isLoading } = useGetUsersFilteredQuery(
        {
            department: selectedDepartment?.title === "Все" ? "" : selectedDepartment?.title,
            search: normalizeSearch(debouncedSearchValue)
        },
        {
            pollingInterval: 90000
        }
    );

    const canViewHiddenUsers = useHasPermission(Permissions.Superuser);

    const style = useTypedSelector(state => state.employeesContainerReducer.style);
    //const dispatch = useAppDispatch();
    //const selectedStyle = contactsStyles.find(c => styleToIdMap[style] === c.id) || null;

    const [searchParams, setSearchParams] = useSearchParams();
    const urlDepartment = searchParams.get("department");
    const urlSearch = searchParams.get("search");

    useEffect(() => {
        if (departmentsTitles && !isInitializedFromUrl) {
            if (urlDepartment && departmentsTitles.departments.includes(urlDepartment)) {
                setSelectedDepartment({ id: 0, title: urlDepartment });
            }

            if (urlSearch) {
                setTemporarySearchValue(urlSearch);
            }

            setIsInitializedFromUrl(true);
        }
    }, [departmentsTitles, urlDepartment, urlSearch, isInitializedFromUrl]);

    useEffect(() => {
        if (!isInitializedFromUrl) return;

        setCurrentPage(1);

        const normalizedSearch = normalizeSearch(temporarySearchValue);
        const newParams = new URLSearchParams(searchParams.toString());

        if (selectedDepartment.title === "Все") {
            newParams.delete("department");
        } else {
            newParams.set("department", selectedDepartment.title);
        }

        if (!normalizedSearch) {
            newParams.delete("search");
        } else {
            newParams.set("search", normalizedSearch);
        }

        if (newParams.toString() !== searchParams.toString()) {
            setSearchParams(newParams);
        }
    }, [selectedDepartment, temporarySearchValue, isInitializedFromUrl]);

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

    /*
    const onSelectStyle = (option: { id: number; title: string }) => {
        const styleValue = idToStyleMap[option.id];
        dispatch(setEmployeesContainerStyle(styleValue));
        scrollTo(0,0)
    };
    */


    const onSelectDepartment = (option: { id: number; title: string }) => {
        setSelectedDepartment(option);
        scrollTo(0, 0);
    };

    return (
        <AnimatePresence>
            <motion.div
                {...pageAnimation}
                className="page page-contacts"
            >
                <div className="page-filters page-item">
                    {
                        /*
                        <Dropdown
                        options={contactsStyles}
                        label="Стиль"
                        searchPlaceholder={"Поиск по стилю"}
                        value={selectedStyle}
                        onSelect={onSelectStyle}
                        externalClasses={['page-filters-item']}
                        searchEnabled={false}
                    />
                         */
                    }
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
                                searchPlaceholder={"Поиск по отделу"}
                                value={selectedDepartment}
                                onSelect={onSelectDepartment}
                                externalClasses={['page-filters-item']}
                            />
                        )
                    }
                    <SearchInput
                        value={temporarySearchValue}
                        onChange={setTemporarySearchValue}
                        placeholder={"Поиск сотрудников"}
                        className={"page-filters-item"}
                        id={"page-contacts-filter-search"}
                    />
                </div>
                <div className="page-content">
                    <EmployeesList
                        isLoading={isLoading}
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