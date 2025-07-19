import './index.css';
import {
    Outlet,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements, Navigate, useLocation,
} from 'react-router-dom';
import {persistor, RootState, store} from "./store/store.ts";
import {Provider, useDispatch, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {PageFeed} from "./components/PageFeed/PageFeed.tsx";
import {PageProfile} from "./components/PageProfile/PageProfile.tsx";
import {TextEditor} from "./components/TextEditor/TextEditor.tsx";
import {PageAdmin} from "./components/PageAdmin/PageAdmin.tsx";
import {PageContacts} from "./components/PageContacts/PageContacts.tsx";
import {PageNotFound} from "./components/PageNotFound/PageNotFound.tsx";
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
import {PageDocuments} from "./components/PageDocuments/PageDocuments.tsx";
import {ScrollToTop} from "./components/ScrollToTop/ScrollToTop.tsx";
import {HistoryTracker} from "./components/HistoryTracker/HistoryTracker.tsx";
import {ROUTES} from "./constants/routes.ts";
import {usePageTitle} from "./store/hooks/usePageTitle.ts";
import {PageDraftDocuments} from "./components/PageCreateDocument/PageDraftDocuments.tsx";

const Root = () => {
    usePageTitle();

    const location = useLocation();

    return (
        <>
            <HistoryTracker/>
            <ScrollToTop />
            <div className="layout-content">
                <LeftMenu/>
                <div className="main-container">
                    <main>
                        <AnimatePresence mode={"wait"}>
                            <Outlet key={location.pathname} />
                        </AnimatePresence>
                    </main>
                </div>
            </div>
            <Modals/>
        </>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={ROUTES.HOME} element={<Root />}>
            <Route index element={<PageFeed />} />
            <Route path={ROUTES.FEED} element={<PageFeed />} />
            <Route path={`${ROUTES.FEED}/:idPost`} element={<PagePost />} />
            <Route path={ROUTES.EDITOR} element={<TextEditor />} />
            <Route path={ROUTES.DOCUMENT} element={<PageDocument />} />
            <Route path={ROUTES.DOCUMENTS_DRAFTS} element={<PageDraftDocuments/>} />
            <Route path={ROUTES.DOCUMENT_PARALLEL} element={<PageDocumentParallel />} />
            <Route path={ROUTES.PROFILE} element={<PageProfile />} />
            <Route path={ROUTES.DOCUMENTS} element={<PageDocuments />} />
            <Route path={ROUTES.CONTACTS} element={<PageContacts />} />
            <Route path={ROUTES.ADMIN} element={<PageAdmin />}>
                <Route path={ROUTES.ADMIN_FEED} element={<AdminTabFeed />} />
                <Route path={ROUTES.ADMIN_CONTACTS} element={<AdminTabContacts />} />
                <Route path={ROUTES.ADMIN_DOCUMENTS} element={<AdminTabDocuments />} />
                <Route path={ROUTES.ADMIN_ADAPTATION} element={<AdminTabAdaptation />} />
            </Route>
            <Route path={ROUTES.NOT_FOUND} element={<PageNotFound />} />
            <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
        </Route>
    )
);

function App() {
    const dispatch = useDispatch();
    const mobileMenuIsOpen = useSelector((state: RootState) => state.mobileMenuReducer.mobileMenuIsOpen);
    const modalNotificationsIsOpen = useSelector((state: RootState) => state.modalNotificationsReducer.modalNotificationsIsOpen);
    const modalLoginIsOpen = useSelector((state: RootState) => state.modalLoginReducer.modalLoginIsOpen);

    useEffect(() => {
        dispatch(updateScrollLock(mobileMenuIsOpen || modalNotificationsIsOpen || modalLoginIsOpen));
    }, [mobileMenuIsOpen, modalNotificationsIsOpen, modalLoginIsOpen, dispatch]);

    return (
        <Provider store={store}>
            <PersistGate loading={<ModalLoading />} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    );
}
export default App
