import { motion } from "framer-motion";
import { useGetUsersFilteredQuery } from "../../api/methods/userApi.ts";
import { FC, useEffect, useMemo, useState } from "react";
import { pageAnimation } from "../../constants/motionSettins.ts";
import { EmployeeCard } from "./EmployeeCard/EmployeeCard.tsx";
import { FilterDepartments } from "./FilterDepartments/FilterDepartments.tsx";
import { formatDate } from "../../constants/functions.ts";
import { EmployeeCardSkeleton } from "../Skeletons/EmployeeCardSkeleton.tsx";
import { useDebounce } from "../../store/hooks/useDebounce.ts";

const ITEMS_PER_PAGE = 100;

export const PageContacts: FC = () => {
    const [departmentTitle, setDepartmentTitle] = useState<string>("");
    const [temporarySearchValue, setTemporarySearchValue] = useState<string>("");
    const debouncedSearchValue = useDebounce(temporarySearchValue, 150);
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const [isFilterChanging, setIsFilterChanging] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data, isLoading } = useGetUsersFilteredQuery({
        department: departmentTitle,
        search: searchValue,
    });

    useEffect(() => {
        setSearchValue(debouncedSearchValue);
    }, [debouncedSearchValue]);

    useEffect(() => {
        document.title = "Адресная книга";
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [departmentTitle, searchValue]);

    useEffect(() => {
        setIsFilterChanging(true);
    }, [departmentTitle, searchValue]);

    useEffect(() => {
        if (!isLoading && data) {
            setIsFilterChanging(false);
        }
    }, [isLoading, data]);

    const paginatedUsers = useMemo(() => {
        if (!data?.users) return [];
        return data.users.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    }, [data?.users, currentPage]);

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
            <motion.div
                initial={pageAnimation.initial}
                animate={pageAnimation.animate}
                exit={pageAnimation.exit}
                transition={pageAnimation.transition}
                className="pagination-container">
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
            return [...Array(3)].map((_, i) => <EmployeeCardSkeleton key={i} />);
        }

        if (!paginatedUsers.length) {
            return null;
        }

        return paginatedUsers.map((employee) => (
            <EmployeeCard
                key={employee.id}
                name={`${employee.surname} ${employee.name} ${employee.patronymic}`}
                position={employee.position.title}
                division={employee.department.division.title}
                city={employee.department.city.title}
                email={employee.email}
                phone={employee.phone}
                birthday={formatDate(employee.birthday.date)}
                image={employee.image.path}
            />
        ));
    };

    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className="page page-contacts"
        >
            <div className="page-header">
                <span className="page-title page-title__name">Адресная книга</span>
            </div>
            <div className="filters-container">
                <FilterDepartments filter={departmentTitle} setFilter={setDepartmentTitle} />
                <div className="filters-search">
                    <input
                        type="text"
                        className="filters-search__text styled"
                        placeholder="ФИО"
                        value={temporarySearchValue}
                        onChange={(e) => setTemporarySearchValue(e.target.value)}
                    />
                </div>
                {totalPages > 1 && renderPagination()}
            </div>
            {paginatedUsers.length === 0 && !isLoading && !isFilterChanging && (
                <div className="no-data">
                    <p>Данные отсутствуют</p>
                </div>
            )}
            <motion.div
                initial={pageAnimation.initial}
                animate={pageAnimation.animate}
                exit={pageAnimation.exit}
                transition={pageAnimation.transition}
                className="employees-container"
            >
                <motion.div
                    initial={pageAnimation.initial}
                    animate={pageAnimation.animate}
                    exit={pageAnimation.exit}
                    transition={pageAnimation.transition}
                    className="employee-card"
                >
                    <div className="employee-card__preview">
                        <div
                            className="employee-card__photo"
                            style={{ backgroundImage: `url(/default.webp)` }}
                        ></div>
                        <div className="employee-card__general">
                            <div className="employee-card__name">
                                <span className="employee-card__lastname">Астафьев</span>
                                <span className="employee-card__firstname">Кирилл</span>
                                <span className="employee-card__middlename">Александрович</span>
                            </div>
                            <span className="employee-card__position">Должность</span>
                        </div>
                    </div>
                    <div className="employee-card__details">
                        <span className="employee-card__position">Должность</span>
                        <span className="employee-card__division">Подразделение</span>
                        <span className="employee-card__phone">Телефон</span>
                        <span className="employee-card__email">Почта</span>
                    </div>
                </motion.div>
                <motion.div
                    initial={pageAnimation.initial}
                    animate={pageAnimation.animate}
                    exit={pageAnimation.exit}
                    transition={pageAnimation.transition}
                    className="employee-card"
                >
                    <div className="employee-card__preview">
                        <div
                            className="employee-card__photo"
                            style={{ backgroundImage: `url(/default.webp)` }}
                        ></div>
                        <div className="employee-card__general">
                            <div className="employee-card__name">
                                <span className="employee-card__lastname">Астафьев</span>
                                <span className="employee-card__firstname">Кирилл</span>
                                <span className="employee-card__middlename">Александрович</span>
                            </div>
                            <span className="employee-card__position">Должность</span>
                        </div>
                    </div>
                    <div className="employee-card__details">
                        <span className="employee-card__position">Должность</span>
                        <span className="employee-card__division">Подразделение</span>
                        <span className="employee-card__phone">Телефон</span>
                        <span className="employee-card__email">Почта</span>
                    </div>
                </motion.div>
                <motion.div
                    initial={pageAnimation.initial}
                    animate={pageAnimation.animate}
                    exit={pageAnimation.exit}
                    transition={pageAnimation.transition}
                    className="employee-card"
                >
                    <div className="employee-card__preview">
                        <div
                            className="employee-card__photo"
                            style={{ backgroundImage: `url(/default.webp)` }}
                        ></div>
                        <div className="employee-card__general">
                            <div className="employee-card__name">
                                <span className="employee-card__lastname">Астафьев</span>
                                <span className="employee-card__firstname">Кирилл</span>
                                <span className="employee-card__middlename">Александрович</span>
                            </div>
                            <span className="employee-card__position">Должность</span>
                        </div>
                    </div>
                    <div className="employee-card__details">
                        <span className="employee-card__position">Должность</span>
                        <span className="employee-card__division">Подразделение</span>
                        <span className="employee-card__phone">Телефон</span>
                        <span className="employee-card__email">Почта</span>
                    </div>
                </motion.div>
                <motion.div
                    initial={pageAnimation.initial}
                    animate={pageAnimation.animate}
                    exit={pageAnimation.exit}
                    transition={pageAnimation.transition}
                    className="employee-card"
                >
                    <div className="employee-card__preview">
                        <div
                            className="employee-card__photo"
                            style={{ backgroundImage: `url(/default.webp)` }}
                        ></div>
                        <div className="employee-card__general">
                            <div className="employee-card__name">
                                <span className="employee-card__lastname">Астафьев</span>
                                <span className="employee-card__firstname">Кирилл</span>
                                <span className="employee-card__middlename">Александрович</span>
                            </div>
                            <span className="employee-card__position">Должность</span>
                        </div>
                    </div>
                    <div className="employee-card__details">
                        <span className="employee-card__position">Должность</span>
                        <span className="employee-card__division">Подразделение</span>
                        <span className="employee-card__phone">Телефон</span>
                        <span className="employee-card__email">Почта</span>
                    </div>
                </motion.div>

                {renderUsers()}
            </motion.div>
            {totalPages > 1 && renderPagination()}
        </motion.div>
    );
};