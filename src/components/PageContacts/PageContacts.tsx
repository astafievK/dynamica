import {AnimatePresence, motion} from "framer-motion";
import { useGetUsersFilteredQuery } from "../../api/methods/userApi.ts";
import { FC, useEffect, useMemo, useState } from "react";
import { pageAnimation } from "../../constants/motionSettings.ts";
import { EmployeeCard } from "./EmployeeCard/EmployeeCard.tsx";
import { EmployeeCardSkeleton } from "../Skeletons/EmployeeCardSkeleton.tsx";
import { useDebounce } from "../../store/hooks/useDebounce.ts";
import {BannerNoData} from "../BannerNoData/BannerNoData.tsx";
import {FilterButtons} from "../FilterButtons/FilterButtons.tsx";
import { useSearchParams } from "react-router-dom";
import {useGetDepartmentsTitlesNotNullQuery} from "../../api/methods/departmentApi.ts";
import {useTypedSelector} from "../../store/hooks/redux.ts";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const ITEMS_PER_PAGE = 100;

export const PageContacts: FC = () => {
    const [departmentTitle, setDepartmentTitle] = useState<string>("");
    const [temporarySearchValue, setTemporarySearchValue] = useState<string>("");
    const debouncedSearchValue = useDebounce(temporarySearchValue, 150);
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const [isFilterChanging, setIsFilterChanging] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { user } = useTypedSelector(state => state.auth)
    const { data: departmentsData, isLoading: departmentsLoading } = useGetDepartmentsTitlesNotNullQuery();
    const { data, isLoading } = useGetUsersFilteredQuery({
        department: departmentTitle,
        search: searchValue,
    });

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const department = searchParams.get("department") || "";
        const search = searchParams.get("search") || "";

        setDepartmentTitle(department);
        setTemporarySearchValue(search);
        setSearchValue(search);
    }, []);

    useEffect(() => {
        setSearchValue(debouncedSearchValue);
    }, [debouncedSearchValue]);

    useEffect(() => {
        setCurrentPage(1);
        setIsFilterChanging(true);

        const params: Record<string, string> = {};
        if (departmentTitle) params.department = departmentTitle;
        if (searchValue) params.search = searchValue;

        setSearchParams(params);
    }, [departmentTitle, searchValue]);

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
    const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
    const nextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

    const renderPagination = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }

        return (
            <motion.div {...pageAnimation} className="pagination-container">
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={prevPage}>&lt;</button>
                    {pages.map((page) => (
                        <button
                            key={typeof page === "number" ? page : `ellipsis-${page}`}
                            className={currentPage === page ? "active" : ""}
                            onClick={() => typeof page === "number" && goToPage(page)}
                            disabled={typeof page !== "number"}
                        >
                            {page}
                        </button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={nextPage}>&gt;</button>
                </div>
            </motion.div>
        );
    };

    const renderUsers = () => {
        if (isLoading || isFilterChanging) {
            return (
                <motion.div
                    initial={pageAnimation.initial}
                    animate={pageAnimation.animate}
                    exit={pageAnimation.exit}
                    transition={pageAnimation.transition}
                    className="employees-container page-content-item"
                >
                    {[...Array(4)].map((_, i) => (
                        <EmployeeCardSkeleton key={i}/>
                    ))}
                </motion.div>
            );
        }

        if (!paginatedUsers.length) {
            return (
                <BannerNoData content={"Сотрудники не найдены"}/>
            );
        }

        return (
            <motion.div
                initial={pageAnimation.initial}
                animate={pageAnimation.animate}
                exit={pageAnimation.exit}
                transition={pageAnimation.transition}
                className="employees-container page-content-item"
            >
                {
                    paginatedUsers.map((employee) => (
                        <EmployeeCard key={employee.id_user} employee={employee}/>
                    ))
                }
            </motion.div>
        );
    }

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
                </div>
                <div className="page-content">
                    {renderUsers()}
                    {totalPages > 1 && renderPagination()}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};