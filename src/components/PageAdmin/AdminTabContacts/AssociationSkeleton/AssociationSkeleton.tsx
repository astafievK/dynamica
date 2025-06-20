import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FC } from "react";

export const AssociationSkeleton: FC = () => {
    return (
        <div className="association association-skeleton">
            <div className="variants">
                <Skeleton containerClassName="skeleton-variant"/>
                <Skeleton containerClassName="skeleton-variant"/>
                <Skeleton containerClassName="skeleton-variant"/>
            </div>
            <div className="arrow-container">
                <img className="arrow" src="/arrow.svg" alt=""/>
            </div>
            <Skeleton containerClassName="skeleton-result"/>
            <Skeleton containerClassName="skeleton-action"/>
        </div>
    );
};