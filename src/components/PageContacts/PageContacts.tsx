import {AnimatePresence, motion} from "framer-motion";
import { useGetUsersFilteredQuery } from "../../api/methods/userApi.ts";
import { FC, useEffect, useMemo, useState } from "react";
import { pageAnimation } from "../../constants/motionSettings.ts";
import { useDebounce } from "../../store/hooks/useDebounce.ts";
import {FilterButtons} from "../FilterButtons/FilterButtons.tsx";
import { useSearchParams } from "react-router-dom";
import {useGetDepartmentsTitlesNotNullQuery} from "../../api/methods/departmentApi.ts";
import {useTypedSelector} from "../../store/hooks/redux.ts";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Pagination } from "../Pagination/Pagination.tsx";
import { Dropdown } from "../Dropdown/Dropdown.tsx";
import {EmployeesList} from "./EmployeesList.tsx";

const ITEMS_PER_PAGE = 100;

const contactsStyles = [
    { id: 0, title: 'Новый' },  // => false
    { id: 1, title: 'Старый' }, // => true
];

const normalizeSearch = (value: string) =>
    value.trim().replace(/\s+/g, " ");

export const PageContacts: FC = () => {
    const [departmentTitle, setDepartmentTitle] = useState<string>("");
    const [temporarySearchValue, setTemporarySearchValue] = useState<string>("");
    const debouncedSearchValue = useDebounce(temporarySearchValue, 150);
    const [isFilterChanging, setIsFilterChanging] = useState<boolean>(false);
    const [isOldStyleEnabled, setIsOldStyleEnabled] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { user } = useTypedSelector(state => state.auth)
    const { data: departmentsData, isLoading: departmentsLoading } = useGetDepartmentsTitlesNotNullQuery();
    const { data, isLoading } = useGetUsersFilteredQuery({
        department: departmentTitle,
        search: normalizeSearch(debouncedSearchValue),
    });

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const department = searchParams.get("department") || "";
        const search = searchParams.get("search") || "";

        setDepartmentTitle(department);
        setTemporarySearchValue(search);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        setIsFilterChanging(true);
        const params: Record<string, string> = {};
        if (departmentTitle) params.department = departmentTitle;

        const normalizedSearch = normalizeSearch(temporarySearchValue);
        if (normalizedSearch) params.search = normalizedSearch;

        setSearchParams(params);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departmentTitle, temporarySearchValue]);

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

    const goToPage = (page: number) => setCurrentPage(page);

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
                    <FilterButtons
                        filter={departmentTitle}
                        setFilter={setDepartmentTitle}
                        data={departmentsData?.titles}
                        isLoading={departmentsLoading}
                        renderLabel={(item) => item}
                    />
                    <div className="filters-search">
                        <input
                            type="text"
                            className="filters-search__text styled"
                            placeholder="ФИО / Должность"
                            value={temporarySearchValue}
                            onChange={(e) => setTemporarySearchValue(e.target.value)}
                        />
                        {
                            temporarySearchValue.length > 0 && <ClearRoundedIcon onClick={() => setTemporarySearchValue('')}/>

                        }
                    </div>
                    <Dropdown
                        options={contactsStyles}
                        label="Стиль адресной книги"
                        value={contactsStyles[isOldStyleEnabled ? 1 : 0]}
                        onSelect={(option) => setIsOldStyleEnabled(option.id === 1)}
                    />
                </div>
                <div className="page-content">
                    <EmployeesList
                        isLoading={isLoading}
                        isFilterChanging={isFilterChanging}
                        users={paginatedUsers}
                        showHidden={!!user}
                        isOldStyleEnabled={isOldStyleEnabled}
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