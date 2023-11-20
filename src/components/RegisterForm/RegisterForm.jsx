import { Link } from "react-router-dom";
import { ellipse, lampOut, manOut } from "../../assets/img";
import "./registerForm.css";
import { useEffect, useState } from "react";
import { addData } from "../../api/api";

const RegisterForm = ({ usersData }) => {
    const [user, setUser] = useState({});
    const [isSending, setSending] = useState(false);

    useEffect(() => {
        setSending(false);
    }, []);

    console.log(isSending, "isSending");

    const addUser = () => {
        // if (usersData) return;
        setSending(true);
        if (!usersData.find((item) => item.name === user.name)) {
            addData(user);
        } else if (usersData.find((item) => item.name === user.name)) {
            // setEror()
        }
    };

    const loginFormHandle = (e) => {
        const value = e.target.value;

        console.log(user, "target");

        if (e.target.name === "password") {
            setUser((prev) => {
                const result = {
                    ...prev,
                    password: value,
                };
                return result;
            });
        } else if (e.target.name === "name") {
            setUser((prev) => {
                const result = {
                    ...prev,
                    name: value,
                };
                return result;
            });
        }
    };

    const registrationFormView = (
        <>
            <img className="app_bg-ellipse-signUp" src={ellipse} alt="" />
            <img className="app_bg-lamp-in" src={lampOut} alt="" />
            <div className="app_block-login">
                <div className="login_block sign_up-block">
                    <h3>Sign-Up</h3>
                    <form className="login_form">
                        <label className="login_form-input">
                            Username
                            <input
                                onChange={(e) => loginFormHandle(e)}
                                type="text"
                                name="name"
                                value={user.name}
                            />
                        </label>
                        <label className="login_form-input">
                            Password
                            <input
                                onChange={(e) => loginFormHandle(e)}
                                type="text"
                                name="password"
                                value={user.password}
                            />
                        </label>
                        <button
                            className="login_btn"
                            disabled={
                                !usersData.find(
                                    (item) => item.name === user.name
                                )
                            }
                            onClick={addUser}
                        >
                            Register
                        </button>
                        <span className="login_form-hint">
                            Already have an Account? <Link to="/">Login</Link>
                        </span>
                    </form>
                </div>
            </div>
            <div className="app_block-img man-out_style">
                <img src={manOut} alt="" />
            </div>
        </>
    );

    return (
        <>
            {isSending ? (
                <div className="back_to_login">
                    <span>
                        Congratulation!
                        <br />
                        Your new account was created Succelfull!
                    </span>
                    <Link to="/">Go to Login</Link>
                </div>
            ) : (
                registrationFormView
            )}
        </>
    );
};

export default RegisterForm;
