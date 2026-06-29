import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">

        <Link to="/" className="font-bold text-2xl">
          📚 AI Flashcard Quiz
        </Link>

        <div className="flex gap-5">

          <Link to="/">Home</Link>

          <Link to="/dashboard">Dashboard</Link>

          <Link to="/quiz">Quiz</Link>

          {currentUser ? (
            <>
              <Link to="/profile">Profile</Link>

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/signup">
                Sign Up
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;