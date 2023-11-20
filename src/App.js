import LoginForm from "./components/LoginForm/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { bg, logout } from "./assets/img";
import { useState } from "react";

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [usersData, setUsersData] = useState(null);
    return (
        <div className="App">
            <img className="app_bg-figure" src={bg} alt="" />
            <div className="login_label">
                <span>
                    {isLogin ? "Logged" : "Login"}
                    {isLogin && (
                        <img
                            onClick={() => setIsLogin(false)}
                            className="logout_logo"
                            src={logout}
                            alt=""
                        />
                    )}
                </span>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LoginForm
                                usersData={usersData}
                                setUsersData={setUsersData}
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                            />
                        }
                    />
                    {/* <Route
                        path="/registration"
                        element={<RegisterForm usersData={usersData} />}
                    /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
