import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginWithGoogle } from "../../redux/actions/authActions";
import { FaGoogle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginWithGoogle());
  };

  if (user) {
    return <Navigate to="/boards" />;
  }

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Trello</h1>
      <p className="text-gray-600 text-center mb-8">
        A simple task management application to organize your projects into
        boards, lists, and cards.
      </p>

      <div className="space-y-4">
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
        >
          {loading ? (
            <span className="flex items-center">
              <ClipLoader size={20} color="#4A5568" className="mr-3" />
              Loading...
            </span>
          ) : (
            <span className="flex items-center">
              <FaGoogle className="w-5 h-5 mr-2" />
              Sign in with Google
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
