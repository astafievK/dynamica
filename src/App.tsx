import './index.css';
import {
    Outlet,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements, Navigate,
} from 'react-router-dom';
import {persistor, RootState, store} from "./store/store.ts";
import {Provider, useDispatch, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {PageFeed} from "./components/PageFeed/PageFeed.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {PageLanding} from "./components/PageLanding/PageLanding.tsx";
import {PageProfile} from "./components/PageProfile/PageProfile.tsx";
import {TextEditor} from "./components/TextEditor/TextEditor.tsx";
import {PageAdmin} from "./components/PageAdmin/PageAdmin.tsx";
import {PageContacts} from "./components/PageContacts/PageContacts.tsx";
import {PageNotFound} from "./components/PageNotFound/PageNotFound.tsx";
import {Header} from "./components/Header/Header.tsx";
import {PageDocument} from "./components/PageDocument/PageDocument.tsx";
import {PageDocumentParallel} from "./components/PageDocumentParallel.tsx";
import {AnimatePresence} from "framer-motion";
import {ModalLoading} from "./components/Modals/ModalLoading/ModalLoading.tsx";
import {Modals} from "./components/Modals/Modals.tsx";
import {AdminTabFeed} from "./components/PageAdmin/AdminTabFeed/AdminTabFeed.tsx";
import {AdminTabContacts} from "./components/PageAdmin/AdminTabContacts/AdminTabContacts.tsx";
import {AdminTabDocuments} from "./components/PageAdmin/AdminTabDocuments/AdminTabDocuments.tsx";
import {AdminTabAdaptation} from "./components/PageAdmin/AdminTabAdaptation/AdminTabAdaptation.tsx";
import {useEffect} from "react";
import {updateScrollLock} from "./api/slices/scrollLockSlice.ts";
import {PagePost} from "./components/PagePost/PagePost.tsx";
import { LeftMenu } from './components/LeftMenu/LeftMenu.tsx';

const Root = () => {
    return (
        <>
            <div className="layout">
                <Header />
                <LeftMenu />
                <div className="main-container">
                    <main>
                        <AnimatePresence>
                            <Outlet/>
                        </AnimatePresence>
                    </main>
                    <Footer/>
                </div>
            </div>
            <Modals/>
            {
                // <AnimatePresence>
                //     <ModalLoading />
                // </AnimatePresence>
            }
        </>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<PageLanding key={"landing"} />} />
            <Route path="feed" element={<PageFeed key={"feed"} />} />
            <Route path="feed/:idPost" element={<PagePost key={"feed-post"} />} />
            <Route path="editor" element={<TextEditor key={"editor"} />} />
            <Route path="document" element={<PageDocument key={"document"} />} />
            <Route path="document_par" element={<PageDocumentParallel key={"document-par"} />} />
            <Route path="profile" element={<PageProfile key={"profile"} />} />
            <Route path="contacts" element={<PageContacts key={"contacts"} />} />
            <Route path="admin" element={<PageAdmin key={"admin"} />}>
                <Route path="feed" element={<AdminTabFeed/>}/>
                <Route path="contacts" element={<AdminTabContacts/>}/>
                <Route path="documents" element={<AdminTabDocuments/>}/>
                <Route path="adaptation" element={<AdminTabAdaptation/>}/>
            </Route>
            <Route path="not_found" element={<PageNotFound key={"not-found"} />} />
            <Route path="*" element={<Navigate to="/not_found" replace />} />
        </Route>
    ),
);

function App() {
    const dispatch = useDispatch();
    const mobileMenuIsOpen = useSelector((state: RootState) => state.mobileMenuReducer.mobileMenuIsOpen);
    const modalNotificationsIsOpen = useSelector((state: RootState) => state.modalNotificationsReducer.modalNotificationsIsOpen);

    useEffect(() => {
        dispatch(updateScrollLock(mobileMenuIsOpen || modalNotificationsIsOpen));
    }, [mobileMenuIsOpen, modalNotificationsIsOpen, dispatch]);

    return (
        <Provider store={store}>
            <PersistGate loading={<ModalLoading />} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    );
}
export default App
