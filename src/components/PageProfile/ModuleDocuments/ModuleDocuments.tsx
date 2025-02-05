import {FC} from "react";
import {ButtonDocument} from "./ButtonDocuments/ButtonDocument.tsx";

export const ModuleDocuments: FC = () => {
    const currentDate = new Date();

    return(
        <div className="module-documents">
            <div className="module-body">
                <ButtonDocument
                    title={"Тестовый документ с длинным названием, чтобы проверить обрезание"}
                    deadline={"10.02"}
                    status={"открыто"}
                    currentDate={currentDate}
                />
                <ButtonDocument
                    title={"Тестовый документ с длинным названием, чтобы проверить обрезание"}
                    deadline={"25.02"}
                    status={"открыто"}
                    currentDate={currentDate}
                />
                <ButtonDocument
                    title={"Тестовый документ с длинным g g g g g g g g g назва нffffием, чfff fff fffтобы проверить обрезание"}
                    deadline={"10.02"}
                    status={"просрочено"}
                    currentDate={currentDate}
                />
                <ButtonDocument
                    title={"Тестовый документ с длинным названием, чтобы проверить обрезание"}
                    deadline={"10.02"}
                    status={"просрочено"}
                    currentDate={currentDate}
                />
                <ButtonDocument
                    title={"Тестовый документ с длинным названием, чтобы проверить обрезание"}
                    deadline={"10.02"}
                    status={"просрочено"}
                    currentDate={currentDate}
                />
                <ButtonDocument
                    title={"Тестовый документ с длинным названием, чтобы проверить обрезание"}
                    deadline={"10.02"}
                    status={"просрочено"}
                    currentDate={currentDate}
                />
                <ButtonDocument
                    title={"Тестовый документ с длинным названием, чтобы проверить обрезание"}
                    deadline={"21.02"}
                    status={"открыто"}
                    currentDate={currentDate}
                />
                <ButtonDocument
                    title={"Тестовый документ с длинным названием, чтобы проверить обрезание"}
                    deadline={"10.02"}
                    status={"открыто"}
                    currentDate={currentDate}
                />
            </div>
        </div>
    )
}