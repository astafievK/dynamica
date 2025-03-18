import { motion } from "framer-motion";
import { useGetUsersFilteredQuery } from "../../api/methods/userApi.ts";
import { FC, useEffect, useState } from "react";
import { pageAnimation } from "../../motionSettins.ts";
import { EmployeeCard } from "./EmployeeCard/EmployeeCard.tsx";
import { FilterDepartments } from "./FilterDepartments/FilterDepartments.tsx";
import { formatDate } from "../../functions.ts";
import { EmployeeCardSkeleton } from "../Skeletons/EmployeeCardSkeleton.tsx";

const ITEMS_PER_PAGE = 100;

export const PageContacts: FC = () => {
    const [departmentTitle, setDepartmentTitle] = useState<string>("");
    const [temporarySearchValue, setTemporarySearchValue] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const [isFilterChanging, setIsFilterChanging] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data, isLoading } = useGetUsersFilteredQuery({ department: departmentTitle, search: searchValue });

    useEffect(() => {
        document.title = "Адресная книга";
    }, []);

    useEffect(() => {
        setIsFilterChanging(true);
        const timer = setTimeout(() => {
            setIsFilterChanging(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [departmentTitle, searchValue]);

    const paginatedUsers = data?.users?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) || [];
    const totalPages = Math.ceil((data?.users?.length || 0) / ITEMS_PER_PAGE);

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
            <div className="pagination-container">
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        &lt;
                    </button>
                    {pages.map((page, index) => (
                        <button
                            key={index}
                            className={currentPage === page ? "active" : ""}
                            onClick={() => typeof page === "number" && setCurrentPage(page)}
                            disabled={typeof page !== "number"}
                        >
                            {page}
                        </button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                        &gt;
                    </button>
                </div>
            </div>
        );
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
                    <button
                        type="button"
                        className="filters-search__submit"
                        onClick={() => setSearchValue(temporarySearchValue)}
                    >
                        Применить
                    </button>
                </div>
                {totalPages > 1 && renderPagination()}
            </div>

            <motion.div
                initial={pageAnimation.initial}
                animate={pageAnimation.animate}
                exit={pageAnimation.exit}
                transition={pageAnimation.transition}
                className="employees-container"
            >
                {isFilterChanging || isLoading
                    ? [...Array(9)].map((_, index) => <EmployeeCardSkeleton key={index} />)
                    : paginatedUsers.length === 0
                        ? null
                        : paginatedUsers.map((employee, index) => (
                            <EmployeeCard
                                key={index}
                                name={`${employee.surname} ${employee.name} ${employee.patronymic}`}
                                position={employee.position.title}
                                division={employee.department.division.title}
                                city={employee.department.city.title}
                                email={employee.email}
                                phone={employee.phone}
                                birthday={formatDate(employee.birthday.date)}
                                image={employee.image.path}
                            />
                        ))
                }
            </motion.div>
            {data?.users && data.users.length === 0 && (
                <div className="no-data">
                    <p>Данные отсутствуют</p>
                </div>
            )}
        </motion.div>
    );
};
