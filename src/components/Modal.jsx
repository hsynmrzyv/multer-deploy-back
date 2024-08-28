import { AiOutlineLink } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { CiMail, CiHashtag } from "react-icons/ci";

// Hooks
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setUser } from "../slices/user.slice";

const Modal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(null);
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    id: user.id,
  });

  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const formDataWithFile = new FormData();

    formDataWithFile.append("firstName", formData.firstName);
    formDataWithFile.append("lastName", formData.lastName);
    formDataWithFile.append("email", formData.email);
    formDataWithFile.append("userName", formData.userName);

    if (imageUrl) {
      formDataWithFile.append("uploadedPicture", fileInputRef.current.files[0]);
    }

    try {
      const response = await fetch(
        "https://pf201.onrender.com/api/auth/update",
        {
          method: "POST",
          body: formDataWithFile,
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Update the user state in Redux store
        dispatch(setUser(data.user));

        // Close the modal
        closeModal();
      } else {
        // Handle error
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  console.log(user);

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed h-full w-full top-0 left-0 bg-black opacity-50 z-10 cursor-pointer"
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 rounded-xl bg-gray-50 z-20 border-4 border-white shadow-inner">
        <div className="bg-indigo-200 h-16 rounded-tr-lg rounded-tl-lg"></div>
        <div className="mx-4 flex justify-between items-start">
          <div className="-mt-8">
            <div className="h-16 w-16 rounded-full bg-white border-2 border-white mb-3 shadow-lg">
              {user.profilePic ? (
                <img
                  src={`https://pf201.onrender.com/${user.profilePic}`}
                  alt=""
                  className="rounded-full"
                />
              ) : (
                <RxAvatar className="h-full w-full" />
              )}
            </div>
            <h2 className="text-slate-900 font-semibold mb-1">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <div className="mt-2 flex gap-2">
            <button className="border border-gray-200 flex items-center justify-center gap-1 rounded-md py-1 px-2">
              <AiOutlineLink className="h-5 text-gray-500" />
              <span className="text-slate-900 text-xs font-medium">
                Copy link
              </span>
            </button>
            <button className="text-slate-900 text-xs font-medium border border-gray-200 rounded-md py-1 px-2">
              View profile
            </button>
          </div>
        </div>
        <form onSubmit={formSubmitHandler} className="mx-3 mt-3">
          <div className="py-3 border-t border-gray-200 grid grid-cols-4">
            <label className="text-xs font-medium col-span-1">Name</label>
            <div className="flex gap-2 col-span-3">
              <input
                type="text"
                onChange={handleChange}
                name="firstName"
                defaultValue={user.firstName}
                placeholder="First name"
                className="w-1/2 outline-none rounded-md border border-gray-200 text-xs p-2 font-medium"
              />
              <input
                type="text"
                onChange={handleChange}
                name="lastName"
                defaultValue={user.lastName}
                placeholder="Last name"
                className="w-1/2 outline-none rounded-md border border-gray-200 text-xs p-2 font-medium"
              />
            </div>
          </div>
          <div className="py-3 border-t border-gray-200 grid grid-cols-4">
            <label className="text-xs font-medium col-span-1">Email</label>
            <div className="col-span-3 flex items-center gap-2">
              <CiMail className="h-5" />
              <input
                onChange={handleChange}
                type="email"
                defaultValue={user.email}
                name="email"
                placeholder="Email"
                className="w-full outline-none rounded-md border border-gray-200 text-xs p-2 font-medium"
              />
            </div>
          </div>
          <div className="py-3 border-t border-gray-200 grid grid-cols-4">
            <label className="text-xs font-medium col-span-1">Username</label>
            <div className="col-span-3 flex items-center gap-2">
              <CiHashtag className="h-5" />
              <input
                type="text"
                onChange={handleChange}
                defaultValue={user.userName}
                name="userName"
                placeholder="Username"
                className="w-full outline-none rounded-md border border-gray-200 text-xs p-2 font-medium"
              />
            </div>
          </div>
          <div className="py-3 border-t border-gray-200 grid grid-cols-4">
            <label className="text-xs font-medium col-span-1">
              Profile photo
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <div>
                {imageUrl ? (
                  <img src={imageUrl} alt="" className="w-8 h-8 rounded-full" />
                ) : user.profilePic ? (
                  <img
                    src={`https://pf201.onrender.com/${user.profilePic}`}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <RxAvatar className="w-8 h-8 rounded-full text-black" />
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="text-slate-900 text-xs font-medium border border-gray-200 rounded-md p-2"
                >
                  Click to replace
                </button>
                <input
                  onChange={handleFileChange}
                  type="file"
                  ref={fileInputRef}
                  className="hidden inset-0 cursor-pointer"
                  title="Click to edit profile photo"
                />
              </div>
            </div>
          </div>
          <div className="m-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="text-slate-900 text-xs font-medium border border-gray-200 rounded-md p-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-slate-900 text-xs font-medium border border-gray-200 rounded-md p-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
