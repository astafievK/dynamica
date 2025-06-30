import React, { FC } from "react";
import "./LinkShowMore.css";
import { Link } from "react-router-dom";

interface ILinkShowMore {
    linkTo: string;
}

export const LinkShowMore: FC<ILinkShowMore> = React.memo(({ linkTo }) => {
    return (
        <Link to={linkTo} className={"see-all-link"}>
         Показать еще
        </Link>
    );
});
