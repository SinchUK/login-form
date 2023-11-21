import LoginForm from "./components/LoginForm/LoginForm";
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
            <LoginForm
                usersData={usersData}
                setUsersData={setUsersData}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
            />
        </div>
    );
}

export default App;
