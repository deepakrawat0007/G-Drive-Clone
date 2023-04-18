import { useNavigate } from "react-router-dom";

const NavBar = () =>{
    const navigate = useNavigate("")
    const handleNavigate= (path)=>{
        navigate(path)
    }
    const handleLogout = ()=>{
        localStorage.clear()
        handleNavigate("/")
    }
    return (
    <><nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <span class="navbar-brand" >G-Drive</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <span class="nav-link active" aria-current="page" onClick={()=>handleNavigate("/list")} style={{cursor:"pointer"}}>Home</span>
          </li>
          <li class="nav-item">
            <span class="nav-link" onClick={()=>handleNavigate("/upload")} style={{cursor:"pointer"}}>Upload Files</span>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
          <button class="btn btn-outline-success" onClick={handleLogout}>Logout</button>
        </form>
      </div>
    </div>
  </nav></>
    )
}

export default NavBar;