import "./page.css";
import { useNavigate } from "react-router-dom";
import { useState , useContext } from "react";
import axios from "axios"
import ToastContext from "./context/ToastContext";
const API = "https://g-drive-api.onrender.com"

const LoginPage = () => {
  const {toast} = useContext(ToastContext)    
  const navigate = useNavigate("")
  const APICALL = async () => {
    await axios.post(API + "/login", {
      email: data.email,
      password: data.password
    })
      .then((res) => {
        toast.success("Login Success")
        console.log(res.data)
        localStorage.setItem('token', res.data.Token)
        localStorage.setItem('name', res.data.Name)
        localStorage.setItem('userId', res.data.userId)
        navigate("/list")
      }).catch((e) => {
        toast.error(e.response.data.message)
      })
  }
  const [data, setData] = useState({
    email: "",
    password: ""
  })


  const handleNavigate = () => {
    navigate("/register")
  }
  const handleChange = (e) => {
    const newdata = { ...data }
    newdata[e.target.name] = e.target.value
    setData(newdata)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const call = APICALL()
    toast.promise(call ,{
      loading:"...loading"
    })
  }

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                  placeholder="Enter a valid email address" name="email" value={data.email} onChange={(e) => handleChange(e)} />
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Enter password" name="password" value={data.password} onChange={(e) => handleChange(e)} />
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                {/* <!-- Checkbox --> */}
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <span className="text-body">Forgot password?</span>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-lg" onClick={(e) => handleSubmit(e)}
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <span style={{ cursor: "pointer", textDecoration: "underline" }}
                  className="link-danger" onClick={handleNavigate}>Register</span></p>
              </div>

            </form>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        {/* <!-- Copyright --> */}
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2023. All rights reserved. <a style={{color:"white"}} href="https://github.com/deepakrawat0007/G-Drive-Clone">DEEPAK RAWAT</a>
        </div>
        {/* <!-- Copyright --> */}

        {/* <!-- Right --> */}
        <div>
          <span className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </span>
          <span className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </span>
          <span className="text-white me-4">
            <i className="fab fa-google"></i>
          </span>
          <a href="https://www.linkedin.com/in/deepak-rawat-98a533243" className="text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        {/* <!-- Right --> */}
      </div>
    </section>
  )
}
export default LoginPage