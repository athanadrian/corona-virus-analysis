import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
        flexDirection: "column",
      }}
    >
      <small>
        Δημιουργία με{" "}
        <i
          style={{ marginLeft: 2, color: "#009688" }}
          className="ui heart icon"
        ></i>{" "}
        <a href="https://atana.site" target="_blank" rel="noopener noreferrer">
          <span style={{ color: "#009688" }}>@AtanaDev</span>
        </a>
      </small>
    </footer>
  );
};

export default Footer;
