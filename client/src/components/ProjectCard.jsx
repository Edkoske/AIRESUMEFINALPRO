import React from "react";

function ProjectCard({ title, description }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ProjectCard;
