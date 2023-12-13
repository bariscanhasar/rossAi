import * as React from 'react'
import UserTable from './components/userTable/usertable'
import SideMenu from './components/sidemenu/sidemenu'
import StylesTable from './components/stylesTable/stylesTable'
import PromptTable from './components/promptTable/promptTable'
import CreditsTable from './components/creditstTable/creditsTable'
import ReplicateModelsTable from './components/replicatemodelsTable/replicatemodelsTable'
import SingleUserPage from './pages/singleuserPage'
import SingleStylePage from './pages/singlestylePage'
import SinglePromptPage from './pages/singlepromptPage'
import CreateCredit from "./pages/createPages/createCredit";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import CreateStyle from './pages/createPages/createStyle'
import CreatePrompt from './pages/createPages/createPrompt'
import SetTable from './components/setTable/setTable'
import SinglesetPage from './pages/singlesetPage'
import LoginPage from './pages/loginPage'
import NavBar from './components/navbar/navBar'
import HomePage from "./pages/homePage";

export default function App() {
  const isLoggedIn = window.localStorage.getItem('token')
  const api = process.env.REACT_APP_API
  return (
    <Router>
      {isLoggedIn ? (
        <div>
          <div>
            <NavBar />
          </div>
          <div className="d-flex">
            <div className="col-2">
              <SideMenu />
            </div>
            <div className="col-10">
              <Routes>
                <Route path="/users" element={<UserTable />} />
                <Route path="/users/:id" element={<SingleUserPage />} />
                <Route path="/styles" element={<StylesTable />} />
                <Route path="/styles/create" element={<CreateStyle />} />
                <Route path="/styles/:id" element={<SingleStylePage />} />
                <Route path="/prompts" element={<PromptTable />} />
                <Route path="/prompts/create" element={<CreatePrompt />} />
                <Route path="/prompts/:id" element={<SinglePromptPage />} />
                <Route path="/credits" element={<CreditsTable />} />
                <Route path="/credits/create" element={<CreateCredit />} />
                <Route path="/" element={<HomePage />} />

                <Route
                  path="/replicatemodels"
                  element={<ReplicateModelsTable />}
                />
                <Route path="/sets" element={<SetTable />} />
                <Route path="/sets/:id" element={<SinglesetPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  )
}
