import { useEffect, useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import Dropzone from "react-dropzone";
import dropIcon from "../assets/icons8-dropbox-256.png"
import {app } from "../Component/firebaseConfig";
import "./page.css"
import ToastContext from "./context/ToastContext"
import NavBar from "./Navbar";

// Initialize Firebase Storage
const storage = getStorage(app);
const HomeUploadPage = () => {
  const navigate = useNavigate("");
  const {toast} = useContext(ToastContext)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const handleUpload = async () => {

    const promises = files.map((file) => {
      let fileName = `${file.name}>${localStorage.getItem("userId")}`
      const storageRef = ref(storage, `uploads/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      return uploadTask;
    })
    await Promise.all(promises);
    setFiles([]);
    toast.success("File Uploaded SuccessFully")
  };

  return (
    <>
    <NavBar/>
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="dropZone">
          <input {...getInputProps()} />
          <img src={dropIcon} alt="icon"/>
          <p>Drag and drop files here, or click to select files</p>
          <ul>
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
          
        </div>
      )}
    </Dropzone>
    <div className="center">
    <button onClick={handleUpload}>Upload</button>
    </div>
    
    </>
  );
};

export default HomeUploadPage;
