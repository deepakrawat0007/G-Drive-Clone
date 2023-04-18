import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios"
import ToastContext from "./context/ToastContext"
const API = "https://g-drive-api.onrender.com"
const RegistrationPage = () => {
  const { toast } = useContext(ToastContext)
  const navigate = useNavigate("")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  })

  const APICALL = async () => {
    await axios.post(API + "/register", {
      name: data.name,
      email: data.email,
      password: data.password
    })
      .then((res) => {
        toast.success("Registered SuccessFully")
        navigate("/")
      }).catch((e) => {
        toast.error(e.response.data.message)
      })
  }
  const handleChange = (e) => {
    const newdata = { ...data }
    newdata[e.target.name] = e.target.value
    setData(newdata)
  }
  const handleNavigate = () => {
    navigate("/")
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (data.password !== data.password2) {
      return toast.error("Password Not Match")
    }
    const call = APICALL()
    toast.promise(call, {
      loading: "...loading",
    })
  }

  return (

    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="form3Example1c" className="form-control" name="name" value={data.name} onChange={(e) => handleChange(e)} />
                          <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" name="email" value={data.email} onChange={(e) => handleChange(e)} />
                          <label className="form-label" htmlFor="form3Example3c" >Your Email</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4c" className="form-control" name="password" value={data.password} onChange={(e) => handleChange(e)} />
                          <label className="form-label" htmlFor="form3Example4c" >Password</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4cd" className="form-control" name="password2" value={data.password2} onChange={(e) => handleChange(e)} />
                          <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" className="btn btn-primary btn-lg" onClick={(e) => handleSubmit(e)}>Register</button>
                      </div>
                      <p className="small fw-bold mt-2 pt-1 mb-0">Already Registered? <span style={{ cursor: "pointer", textDecoration: "underline" }}
                        className="link-danger" onClick={handleNavigate} > Login</span></p>

                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegistrationPage;