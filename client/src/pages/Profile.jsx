import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
export default function Profile() {
  const fileRef = useRef(null); //set initlal value to null
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData)
  console.log(filePerc)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app); //knows which storage we want to get the file from
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },

    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, avatar: downloadURL })
      );
    }
    )
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* same as we did for the navbar */}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        ></input>
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="border-4 rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        ></img>
        <p className="text-sm self-center">
          {fileUploadError?
          (<span className="text-red-700">Image must be less than 2mb!</span>):
          filePerc > 0 && filePerc < 100? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}
            </span>
          ):
          filePerc===100? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ):("")
        }
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        ></input>
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        ></input>
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        ></input>
        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase
          hover:opacity-95 disabled:opacity-80
        "
        >
          UPDATE
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700">Delete account</span>
        <span className="text-red-700">Sign out</span>
      </div>
    </div>
  );
}
