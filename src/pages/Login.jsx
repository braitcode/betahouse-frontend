import { useState } from "react";
import "../css/SignUp.css";
import betahouse from "../assets/images/betahouse.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useAuth } from "../components/contexts/Auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email address";
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const pwdTrim = password.trim();
      if (pwdTrim.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const data = await login(email, password);

      if (!data?.error) {
        setLoading(false);
        navigate("/");
      } else {
        setErrors({ form: "Login failed" });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setErrors({ form: err.message });
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-red-600">
      <div className="bg-white container-fluid pt-4 w-[60%] flex gap-6">
        <div className="w-[50%] flex justify-center">
          <div className="w-[90%]">
            <div className="w-[500px] ">
              <p className="text-[28px] font-outfit font-semibold">
                Join our community of home seekers and explore the possibilities that await.
              </p>
              <p className="font-outfit text-[16px]">
                Let's get started by filling out the information below
              </p>
            </div>
            <div className="">
              <form className="form-milly" onSubmit={handleSubmit}>
                <div className="form-action">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errors.email && <p className="text-red-500 error">{errors.email}</p>}
                </div>
                <div className="form-action">
                  <label>Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <span onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <IoEyeOutline className="icon-m" />
                      ) : (
                        <IoEyeOffOutline className="icon-m" />
                      )}
                    </span>
                  </div>
                  {errors.password && <p className="text-red-500 error">{errors.password}</p>}
                </div>
                <div className="hhh-milly my-2 justify-between">
                  <div className="flex">
                    <input type="checkbox" />
                    <p>Remember Me</p>
                  </div>
                  <div className="">
                    <p className="text-red-500">Forgot Password</p>
                  </div>
                </div>
                <div className="">
                  <button
                    className={
                      loading
                        ? "btn btn-success w-100 p-3 my-1"
                        : "btn btn-outline-success w-100 p-3 my-1"
                    }
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          aria-hidden="true"
                        ></span>
                        <span role="status">Loading...</span>
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                  {errors.form && <p className="text-red-500 error">{errors.form}</p>}
                </div>
              </form>
              <div className="dis my-2">
                <div className="line"></div>
                <span>&nbsp;&nbsp; or &nbsp;&nbsp;</span>
                <div className="line"></div>
              </div>
              <div className="">
                <button
                  className={
                    !loading
                      ? "btn btn-success w-100 p-3 my-1"
                      : "btn btn-outline-success w-100 p-3 my-1"
                  }
                >
                  <a
                    className="text-light text-decoration-none"
                    href="https://www.google.com/"
                  >
                    Continue with Google
                  </a>
                </button>
              </div>
              <div className="bb flex justify-center">
                <p className="text-dark">
                  New User? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <img src={betahouse} alt="" className="h-[90vh] w-[779px]" />
        </div>
      </div>
    </div>
  );
};

export default Login;
