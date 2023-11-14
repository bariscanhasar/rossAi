import * as React from 'react';
import UserTable from "./components/userTable/usertable";
import SideMenu from "./components/sidemenu/sidemenu";
import StylesTable from "./components/stylesTable/stylesTable";
import PromptTable from "./components/promptTable/promptTable";
import CreditsTable from "./components/creditstTable/creditsTable";
import ReplicateModelsTable from "./components/replicatemodelsTable/replicatemodelsTable";
import SingleUserPage from "./pages/singleuserPage";
import SingleStylePage from "./pages/singlestylePage";
import SinglePromptPage from './pages/singlepromptPage'
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import CreateStyle from "./pages/createPages/createStyle";
import CreatePrompt from "./pages/createPages/createPrompt";
export default function App() {
    return (


        <Router>

            <div>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <a className="navbar-brand" href="#">RossAi</a>
                </nav>
                <div className='d-flex mt-0'>

                    <div className="col-2">

                        <SideMenu/>
                    </div>
                    <div className="col-10">
                        <Routes>
                            <Route path="/users" element={<UserTable/>}/>
                            <Route path="/users/:id" element={<SingleUserPage/>}/>
                            <Route path="/styles" element={<StylesTable/>}/>
                            <Route path="/styles/create" element={<CreateStyle/>}/>
                            <Route path="/styles/:id" element={<SingleStylePage/>}/>
                            <Route path="/prompts" element={<PromptTable/>}/>
                            <Route path="/prompts/create" element={<CreatePrompt/>}/>
                            <Route path="/prompts/:id" element={<SinglePromptPage/>}/>
                            <Route path="/credits" element={<CreditsTable/>}/>
                            <Route path="/replicatemodels" element={<ReplicateModelsTable/>}/>
                        </Routes>
                    </div>
                </div>
            </div>



        </Router>


    );
}
