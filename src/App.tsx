import './index.css';
import {
    Outlet,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import {persistor, store} from "./store/store.ts";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {PageFeed} from "./components/PageFeed/PageFeed.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {PageLanding} from "./components/PageLanding/PageLanding.tsx";
import {ModalLoading} from "./components/Modals/ModalLoading/ModalLoading.tsx";
import {PageProfile} from "./components/PageProfile/PageProfile.tsx";
import {TextEditor} from "./components/TextEdit/TextEditor.tsx";
import {PageAdmin} from "./components/PageAdmin/PageAdmin.tsx";
import {PageContacts} from "./components/PageContacts/PageContacts.tsx";
import {PageNotFound} from "./components/PageNotFound/PageNotFound.tsx";
import {Header} from "./components/Header/Header.tsx";
import {PageDocument} from "./components/PageDocument/PageDocument.tsx";
import {PageDocumentParallel} from "./components/PageDocumentParallel.tsx";
import {Modals} from "./components/Modals/Modals.tsx";

const Root = () => {
    return (
        <>
            {
                // <LeftMenu />
            }
            <div className="layout">
                <Header/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
            <Modals/>
        </>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route path="" element={<PageLanding />} />
            <Route path="feed" element={<PageFeed />} />
            <Route path="editor" element={<TextEditor />} />
            <Route path="document" element={<PageDocument />} />
            <Route path="document_par" element={<PageDocumentParallel />} />
            <Route path="profile" element={<PageProfile />} />
            <Route path="contacts" element={<PageContacts />} />
            <Route path="admin" element={<PageAdmin />}>
                <Route path="feed" />
                <Route path="contacts"/>
                <Route path="docs"/>
                <Route path="tests"/>
            </Route>
            <Route path="*" element={<PageNotFound/>} />
        </Route>
    ),
);

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<ModalLoading/>} persistor={persistor}>
                <RouterProvider router={router}/>
            </PersistGate>
        </Provider>
    );
}

export default App
