import { useState } from "react";
import "../css/SignUp.css";
import betahouse from "../assets/images/betahouse.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useAuth } from "../components/contexts/Auth";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [firstname, setName] = useState("");
  const [lastname, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!firstname) newErrors.firstname = "First Name is required";
    if (!lastname) newErrors.lastname = "Last Name is required";
    if (!email) newErrors.email = "Email is required";
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    const pwdTrim = password.trim();
    if (password && pwdTrim.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("password", password);
      if (image) {
        formData.append("image", image);
      }

      const data = await signup(formData);

      if (!data?.error) {
        setLoading(false);
        navigate("/");
      } else {
        setErrors({ form: "Registration failed" });
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
                <div className="flex justify-between">
                  <div className="form-action w-[45%]">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your Name"
                      value={firstname}
                      onChange={handleNameChange}
                    />
                    {errors.firstname && <p className="text-red-500 error">{errors.firstname}</p>}
                  </div>
                  <div className="form-action w-[45%]">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your Username"
                      value={lastname}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    {errors.lastname && <p className="text-red-500 error">{errors.lastname}</p>}
                  </div>
                </div>
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
                <div className="form-action">
                  <label>Confirm Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (
                        <IoEyeOutline className="icon-m" />
                      ) : (
                        <IoEyeOffOutline className="icon-m" />
                      )}
                    </span>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 error">{errors.confirmPassword}</p>}
                </div>
                <div className="form-action">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="hhh-milly my-2">
                  <input type="checkbox" />
                  <p>
                    I agree to <span className="span-milly">Terms of service</span> and{" "}
                    <span className="span-milly">Privacy policies</span>
                  </p>
                </div>
                <div className="">
                  <button
                    className={
                      loading
                        ? "btn btn-success w-100 p-3 my-1"
                        : "btn btn-outline-success w-100 p-3 my-1"
                    }
                    onClick={handleSubmit}
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
                      "Sign Up"
                    )}
                  </button>
                  {errors.form && <p className="error">{errors.form}</p>}
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
                  Already have an account? <Link to="/login">Login</Link>
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

export default SignUp;
