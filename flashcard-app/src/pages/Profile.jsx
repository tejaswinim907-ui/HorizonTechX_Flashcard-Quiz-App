import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FlashcardContext } from "../context/FlashcardContext";

function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { flashcards } = useContext(FlashcardContext);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Please login first.</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          margin: "auto",
          background: "#fff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg,#2563eb,#7c3aed)",
            color: "#fff",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#fff",
              color: "#2563eb",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "50px",
              fontWeight: "bold",
            }}
          >
            {user.email.charAt(0).toUpperCase()}
          </div>

          <h1 style={{ marginTop: "20px" }}>
            {user.email.split("@")[0]}
          </h1>

          <p>AI Flashcard Quiz User</p>
        </div>

        <div style={{ padding: "35px" }}>
          {/* Statistics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <Card title="📚 Flashcards" value={flashcards.length} color="#2563eb" />
            <Card title="❤️ Favorites" value="8" color="#ef4444" />
            <Card title="🏆 Quiz Score" value="92%" color="#10b981" />
            <Card title="🟢 Status" value="Active" color="#f59e0b" />
          </div>

          {/* User Details */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "25px",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#2563eb" }}>
              Personal Information
            </h2>

            <InfoRow label="📧 Email" value={user.email} />

            <InfoRow
              label="🆔 User ID"
              value={user.uid.substring(0, 20) + "..."}
            />

            <InfoRow
              label="✅ Email Verified"
              value={user.emailVerified ? "Verified" : "Not Verified"}
            />

            <InfoRow
              label="📅 Account Created"
              value={new Date(
                user.metadata.creationTime
              ).toLocaleDateString()}
            />

            <InfoRow
              label="🔑 Last Login"
              value={new Date(
                user.metadata.lastSignInTime
              ).toLocaleString()}
            />

            <InfoRow label="🎓 Account Type" value="Student" />
          </div>

          {/* About */}
          <div
            style={{
              background: "#eef4ff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "25px",
            }}
          >
            <h2>About Me</h2>

            <p style={{ color: "#555", lineHeight: "1.7" }}>
              Welcome to the AI Flashcard Quiz application.
              Continue creating flashcards, taking quizzes,
              and improving your learning every day.
            </p>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "35px",
            }}
          >
            <button
              style={buttonStyle("#2563eb")}
              onClick={() => navigate("/home")}
            >
              📚 Home
            </button>

            <button
              style={buttonStyle("#10b981")}
              onClick={() => navigate("/quiz")}
            >
              🎯 Start Quiz
            </button>

            <button
              style={buttonStyle("#f59e0b")}
              onClick={() => navigate("/dashboard")}
            >
              📊 Dashboard
            </button>
          </div>

          {/* Logout */}
          <div style={{ textAlign: "center" }}>
            <button
              style={buttonStyle("#dc2626")}
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #ddd",
      }}
    >
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

const buttonStyle = (color) => ({
  background: color,
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
});

export default Profile;