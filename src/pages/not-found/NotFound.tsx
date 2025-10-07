import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3em", marginBottom: "20px" }}>
        404 - Page Not Found
      </h1>
      <p style={{ fontSize: "1.5em", marginBottom: "30px" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          fontSize: "1em",
          borderRadius: "5px",
          backgroundColor: "#4CAF50",
          color: "white",
          textDecoration: "none",
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;