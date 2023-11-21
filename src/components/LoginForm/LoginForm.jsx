import { ellipse, lampIn, manIn, manOut } from "../../assets/img";

import "./loginForm.css";
import { useEffect, useState } from "react";
import { addData, getData } from "../../api/api";

const LoginForm = ({ setIsLogin, isLogin, usersData, setUsersData }) => {
    const [formData, setFormData] = useState([]);
    const [isRegistration, setIsRegistration] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSending, setSending] = useState(false);
    const [isUserExist, setIsUserExist] = useState(false);

    const errorMsg = {
        nameError: "User name is not correct",
        passwordError: "Password is wrong",
        newUserNameError: "Login name already exist",
        newPasswordError: "Password must be more then 5 characters",
    };
    const { nameError, passwordError, newPasswordError, newUserNameError } =
        errorMsg;

    console.log(usersData, "Usaers Data from server");
    console.log(formData, "Usaer Data");

    const clearInputs = () => {
        setFormData({
            name: "",
            password: "",
        });
    };

    const addUser = () => {
        setSending(true);
        if (!usersData.find((item) => item.name === formData.name)) {
            if (formData.password.length < 6) {
                setIsUserExist(true);
                setErrorMessage(newPasswordError);
            } else {
                setIsUserExist(false);
                addData(formData);
            }
            clearInputs();
        } else if (usersData.find((item) => item.name === formData.name)) {
            setErrorMessage(newUserNameError);
            setIsUserExist(true);
            clearInputs();
        }
    };

    const checkUser = (e) => {
        e.preventDefault();

        if (isRegistration) {
            addUser();
            return;
        }

        const isUser = usersData.find((user) => user.name === formData.name);

        if (!isUser) {
            setErrorMessage(nameError);
            clearInputs();
        } else if (isUser.password !== formData.password) {
            clearInputs();
            setErrorMessage(passwordError);
        } else if (isUser && isUser.password === formData.password) {
            setIsLogin(true);
            setErrorMessage("");
            clearInputs();
        }
    };

    const getUsers = async () => {
        const users = await getData();
        setUsersData(users);
    };

    useEffect(() => {
        getUsers();
    }, [isSending]);

    const loginFormHandle = (e) => {
        const value = e.target.value;
        if (e.target.name === "password") {
            setFormData((prev) => {
                const result = {
                    ...prev,
                    password: value,
                };
                return result;
            });
        } else if (e.target.name === "name") {
            setFormData((prev) => {
                const result = {
                    ...prev,
                    name: value,
                };
                return result;
            });
        }
    };

    const getBackToMain = () => {
        setIsRegistration(false);
        setSending(false);
    };

    const setRegister = () => {
        setErrorMessage("");
        clearInputs();
        setIsRegistration((prev) => {
            return !prev;
        });
    };

    const formView = (
        <>
            <img className="app_bg-ellipse" src={ellipse} alt="" />
            <img className="app_bg-lamp-in" src={lampIn} alt="" />
            <div className="app_block-login">
                <div className="login_block">
                    <h3>{isRegistration ? "Sign-Up" : "Welcome"}</h3>
                    <form className="login_form">
                        <label className="login_form-input">
                            Username
                            <input
                                onChange={(e) => loginFormHandle(e)}
                                type="text"
                                name="name"
                                value={formData.name}
                            />
                        </label>
                        <label className="login_form-input">
                            Password
                            <input
                                onChange={(e) => loginFormHandle(e)}
                                type="text"
                                name="password"
                                value={formData.password}
                            />
                            <span className="error">{errorMessage}</span>
                        </label>
                        <button
                            className="login_btn"
                            disabled={isLogin}
                            onClick={(e) => checkUser(e)}
                        >
                            {isRegistration ? "Register" : "Login"}
                        </button>
                        <span className="login_form-hint">
                            {isRegistration ? (
                                <b>
                                    Already have an Account?
                                    <span onClick={setRegister}>Login</span>
                                </b>
                            ) : (
                                <>
                                    {isLogin ? (
                                        ""
                                    ) : (
                                        <b>
                                            Don't have an Account?
                                            <span
                                                className="register_btn"
                                                onClick={setRegister}
                                            >
                                                Register
                                            </span>
                                        </b>
                                    )}
                                </>
                            )}
                        </span>
                    </form>
                </div>
            </div>
            <div className="app_block-img">
                <img src={isLogin ? `${manOut}` : `${manIn}`} alt="" />
            </div>
        </>
    );

    return (
        <>
            {isSending && !isUserExist ? (
                <div className="back_to_login">
                    <span>
                        Congratulation!
                        <br />
                        Your new account was created Succelfull!
                    </span>
                    <span
                        onClick={() => getBackToMain()}
                        className="back_to_login-btn"
                    >
                        Go to Login
                    </span>
                </div>
            ) : (
                formView
            )}
        </>
    );
};

export default LoginForm;
