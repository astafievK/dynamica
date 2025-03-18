import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const FilterDepartmentSkeleton = () => {
    return (
        <button className="department-skeleton">
            <Skeleton containerClassName="department-title-skeleton" width="80%"/>
        </button>
    );
};
