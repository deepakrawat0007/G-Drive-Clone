import React, { useEffect, useState ,useContext} from 'react';
import { getStorage, ref, listAll, deleteObject, getDownloadURL } from "firebase/storage";
import { app } from "../Component/firebaseConfig";
import icon from "../assets/icons8-file-512.png";
import "./page.css"
import axios from "axios";
import NavBar from './Navbar';
import ToastContext from "./context/ToastContext"
import { useNavigate } from 'react-router-dom';
const API = "https://g-drive-api.onrender.com"
// Initialize Firebase Storage
const storage = getStorage(app);

const FileList = () => {
    const {toast} = useContext(ToastContext)
    const [files, setFiles] = useState([]);
    const navigate = useNavigate("")

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/")
        }
        const listRef = ref(storage, 'uploads');
        listAll(listRef).then((res) => {
            const filterFiles = res.items.filter((file)=> file.name.split(">")[1] === localStorage.getItem("userId"))
            setFiles(filterFiles);
        });
    }, []);
    

    const DeletePromise = async(file)=>{

       await axios.delete(`${API}/delete/${file.name}`, {
            headers: { "authorization": localStorage.getItem("token") }
        })
            .then((res) => {
                toast.success("File Deleted SuccessFully")
                setFiles(files.filter((f) => f.name !== file.name));
            }).catch((e) => {
                toast.error("Failed to Delete File")
            })
    }
    const handleDownload = async (file) => {
        const fileRef = ref(storage, file.fullPath);
        getDownloadURL(fileRef)
            .then((url) => {
                // Use the URL to download the file
                window.open(url);
            })
            .catch((error) => {
                // Handle any errors
                // console.log(error);
            });
    };

    const handleDelete = async (file) => {
        // const fileRef = ref(storage, file.fullPath);
        // try {
        //   await deleteObject(fileRef);
        //   setFiles(files.filter((f) => f.name !== file.name));
        // } catch (error) {
        //   console.log(error);
        // }
        const promise = DeletePromise(file)
        toast.promise(promise ,{
            loading:"loading...",
            complete:"File Deleted SuccessFully",
            error:"Faild To Delete file"
          })
    };

    return (
    <>
            <NavBar />
            <div className="container">
                {files?.map((file) => (
                    <div className="figure" key={file.name}>
                        <img src={icon} alt="icon" />
                        <div className="data-container">
                            <div className="del">
                            <button onClick={() => { handleDownload(file) }}><i class="fa-solid fa-download"></i></button>
                            <button onClick={() => { handleDelete(file) }}><i class="fa-solid fa-delete-left"></i></button>
                            </div>
                            <div className="name" >{file.name.split(">")[0]}</div>
                        </div>
                    </div>))}
            </div>
</>
);
};


export default FileList;
