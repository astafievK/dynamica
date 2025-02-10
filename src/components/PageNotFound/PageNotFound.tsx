import {FC, useEffect} from "react";

export const PageNotFound: FC = () => {
    useEffect(() => {
        document.title = "Страница не найдена";
    })

    return (
        <>
            <div className="page page-not-found">
                <div className="content">
                    <span>Страница не найдена :(</span>
                </div>
            </div>
        </>
    );
};
