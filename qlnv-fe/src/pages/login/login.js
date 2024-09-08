/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useEffect, useState } from 'react'
import './login.css'
import accountApi from '../../core/api/login.api'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Reaptcha from 'reaptcha'

const LoginPage = () => {
    const passwordRegex = new RegExp(
        /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,20}/
    )
    const navigate = useNavigate()
    const [isForgetPassword, setIsForgetPassword] = useState(false)
    const [loginValue, setLoginValue] = useState({
        username: '',
        password: '',
    })
    const [passwordChangeValue, setPasswordChangeValue] = useState({
        email: '',
        password: '',
        repassword: '',
    })
    const [isCheckCaptcha, setIsCheckCaptcha] = useState(false)

    const submitForm = async (e) => {
        e.preventDefault()
        const response = await accountApi.login(loginValue)

        if (response.code === 200) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', response.data.role)
            navigate('/main-dashboard/nhan-vien')
        } else {
            swal({
                title: response.message,
                text: '',
                icon: 'error',
                button: 'Xác nhận',
            })
        }
    }

    const submitChangePassword = async (e) => {
        e.preventDefault()
        if (!passwordChangeValue.email || !passwordChangeValue.password || !passwordChangeValue.repassword) {
            swal({
                title: "Vui lòng nhập đủ các trường dữ liệu",
                text: "",
                icon: "error",
                button: "Xác nhận",
            });
        }
        if (!passwordRegex.test(passwordChangeValue.password)) { 
            swal({
                title: "Mật khẩu phải có ít nhất 12 ký tự và tối đa là 20 ký tự, có chữ in hoa, chữ thường, chữ số và ký tự đặc biệt",
                text: "",
                icon: "error",
                button: "Xác nhận",
            }).then(() => ({}));
        }
        else if (passwordChangeValue.password !== passwordChangeValue.repassword) {
            swal({
                title: "Nhập lại mật khẩu không khớp",
                text: "",
                icon: "error",
                button: "Xác nhận",
            });
        } else {
            const response = await accountApi.doiMatKhau(passwordChangeValue);
            if (response.code === 201) {
                swal({
                    title: response.message,
                    text: "",
                    icon: "error",
                    button: "Xác nhận",
                });
            } else if (response.code === 202) {
                swal({
                    title: response.message,
                    text: "Nhập mã xác nhận",
                    icon: "info",
                    content: {
                        element: "input",
                        attributes: {
                            placeholder: "Nhập mã xác nhận của bạn tại đây",
                            type: "text",
                        },
                    },
                    button: "Xác nhận",
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                }).then(async (userInput) => {
                    if (userInput) {
                        var email = document.querySelector(".emailJs input").value;
                        var password = document.querySelector(".passwordJs input").value;
                        console.log(email);
                        console.log(password);

                        const emailCode = {
                            email: email,
                            code: userInput,
                            password: password,
                        }
                        const response = await accountApi.verificationCode(emailCode);
                        if (response.code === 201) {
                            swal({
                                title: response.message,
                                text: "",
                                icon: "error",
                                button: "Xác nhận",
                            });
                        } else {
                            swal({
                                title: response.message,
                                text: "",
                                icon: "success",
                                button: "Xác nhận",
                            }).then(() => setIsForgetPassword(false));
                        }
                    } else {
                        swal("Lỗi", "Bạn cần nhập mã xác nhận!", "error");
                    }
                });
            } else {
                swal({
                    title: response.message,
                    text: "",
                    icon: "success",
                    button: "Xác nhận",
                }).then(() => setIsForgetPassword(false));
            }  
        }
    }

    const handleHadLogin = useCallback(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/main-dashboard/nhan-vien')
        }
    }, [navigate])

    const handleUsernameOnChange = (event) => {
        setLoginValue((prev) => {
            return { ...prev, username: event.target.value }
        })
    }

    const handlePasswordOnChange = (event) => {
        setLoginValue((prev) => {
            return { ...prev, password: event.target.value }
        })
    }

    const handleEmailOnChange = (event) => {
        setPasswordChangeValue((prev) => {
            return { ...prev, email: event.target.value }
        })
    }

    const handlePasswordForChangeOnChange = (event) => {
        setPasswordChangeValue((prev) => {
            return { ...prev, password: event.target.value }
        })
    }

    const handleRePasswordForChangeOnChange = (event) => {
        setPasswordChangeValue((prev) => {
            return { ...prev, repassword: event.target.value }
        })
    }

    const onVerify = async (recaptchaResponse) => {
        if (recaptchaResponse) {
					const response = await accountApi.validateRecaptcha({ token: recaptchaResponse });
					if (response && response.code === 200) {
						setIsCheckCaptcha(true);
					}
        } else {
            setIsCheckCaptcha(false)
        }
    };

    useEffect(() => {
        handleHadLogin()
    }, [handleHadLogin])
    return (
        <section>
            <div className="imgBx">
                <img src="/img/ptit.jpg" alt="" />
                <div className='acc'>
                    <h2 className='acc--title'>Demo account: </h2>
                    <ul className='acc--detail'>
                        <li>Username: vdqhuy</li>
                        <li>Password: Vdqhuy12345@</li>
                    </ul>
                </div>
            </div>
            <div className="contentBx">
                {isForgetPassword ? (
                    <div className="formBx">
                        <h2>Đổi mật khẩu</h2>
                        {/* <form> */}
                        <div className="inputBx emailJs">
                            <span>Email của bạn</span>
                            <input
                                type="text"
                                name=""
                                onChange={handleEmailOnChange}
                            ></input>
                        </div>
                        <div className="inputBx passwordJs">
                            <span>Mật khẩu mới</span>
                            <input
                                type="password"
                                name=""
                                onChange={handlePasswordForChangeOnChange}
                            ></input>
                        </div>
                        <div className="inputBx">
                            <span>Nhập lại mật khẩu</span>
                            <input
                                type="password"
                                name=""
                                onChange={handleRePasswordForChangeOnChange}
                            ></input>
                        </div>
                        <div className="inputBx recaptcha-center">
                            <Reaptcha sitekey="6LcYBDoqAAAAAM7tJpdyO57Getzt7EqiUa7tdxoj" onVerify={onVerify}/> 
                        </div>
                        {isCheckCaptcha ? (
                                <div className="inputBx">
                                    <input
                                        id="btn-cap-nhat"
                                        type="button"
                                        value="Cập nhật"
                                        onClick={submitChangePassword}
                                    ></input>
                                </div>
                            ) : (
                                <div className="inputBx btn-disable">
                                    <input
                                        id="btn-cap-nhat"
                                        type="button"
                                        value="Cập nhật"
                                        name=""
                                        disabled
                                    ></input>
                                </div>
                            )}
                        <div className="inputBx">
                            <a
                                href="#"
                                onClick={() => {
                                    setIsForgetPassword(false);
                                }}
                            >
                                Về trang đăng nhập
                            </a>
                        </div>
                        {/* </form> */}
                    </div>
                ) : (
                    <div className="formBx">
                        <h2>Đăng nhập</h2>
                        <form onSubmit={submitForm}>
                            <div className="inputBx">
                                <span>Tên đăng nhập</span>
                                <input
                                    type="text"
                                    name=""
                                    onChange={handleUsernameOnChange}
                                ></input>
                            </div>
                            <div className="inputBx">
                                <span>Mật khẩu</span>
                                <input
                                    type="password"
                                    name=""
                                    onChange={handlePasswordOnChange}
                                ></input>
                            </div>
                            <div className="inputBx recaptcha-center">
                                <Reaptcha sitekey="6LcYBDoqAAAAAM7tJpdyO57Getzt7EqiUa7tdxoj" onVerify={onVerify}/> 
                            </div>
                            {isCheckCaptcha ? (
                                <div className="inputBx">
                                    <input
                                        type="submit"
                                        value="Đăng nhập"
                                        name=""
                                    ></input>
                                </div>
                            ) : (
                                <div className="inputBx btn-disable">
                                    <input
                                        type="submit"
                                        value="Đăng nhập"
                                        name=""
                                        disabled
                                    ></input>
                                </div>
                            )}
                        </form>
                        <div className="inputBx">
                            <a
                                href="#"
                                onClick={() => {
                                    setIsForgetPassword(true)
                                }}
                            >
                                Quên mật khẩu
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default LoginPage
