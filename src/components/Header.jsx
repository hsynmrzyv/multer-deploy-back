import { RxAvatar } from "react-icons/rx";

// Hooks
import { useSelector } from "react-redux";

// Routing
import { useNavigate } from "react-router-dom";

const Header = ({ openModal }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await fetch("https://pf201.onrender.com/api/auth/log-out", {
      method: "POST",
      credentials: "include",
    });

    navigate("/sign-in");
  };

  return (
    <header>
      <nav className="bg-gray-800 flex justify-between h-16 px-2 rounded-lg">
        {/* Left Side */}
        <div className="flex gap-3">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="logo"
              className="h-8 w-auto"
            />
          </div>
          <h1 className="text-white self-center">
            Hi, {user.firstName} {user.lastName}
          </h1>
        </div>
        {/* Right Side */}
        <div className="flex items-center">
          {/* New Todo Button */}
          <div className="shrink-0 flex gap-2">
            <button className="shadow-sm text-white font-medium text-sm py-2 px-3  rounded-md inline-flex items-center relative gap-x-1.5 border-2 border-white">
              Log out
            </button>
            <button
              onClick={openModal}
              className="shadow-sm text-white font-medium text-sm py-2 px-3 bg-indigo-500 rounded-md inline-flex items-center relative gap-x-1.5"
            >
              Edit Profile
            </button>
          </div>
          {/* Profile */}

          <div className="ml-4 shrink-0">
            {user.profilePic ? (
              <img
                src={`https://pf201.onrender.com/${user.profilePic}`}
                alt=""
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <RxAvatar className="w-8 h-8 rounded-full text-white" />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
