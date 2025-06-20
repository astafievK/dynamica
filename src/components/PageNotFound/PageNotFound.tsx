import {FC} from "react";
import {motion} from "framer-motion";
import {pageAnimation} from "../../constants/motionSettings.ts";
import {BannerNoData} from "../BannerNoData/BannerNoData.tsx";

export const PageNotFound: FC = () => {
    return (
        <>
            <motion.div
                {...pageAnimation}
                className="page page-not-found">
                <BannerNoData content={"Страница не найдена :("}/>
            </motion.div>
        </>
    );
}
