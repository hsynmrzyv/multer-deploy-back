// Components
import Header from "../components/Header";
import Modal from "../components/Modal";

// React Hooks
import { useState, useEffect } from "react";

// Redux Hooks
import { useDispatch } from "react-redux";

// Actions
import { setUser } from "../slices/user.slice";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Header openModal={openModalHandler} />
      {isModalOpen && <Modal closeModal={closeModalHandler} />}
    </div>
  );
};

export default Home;
