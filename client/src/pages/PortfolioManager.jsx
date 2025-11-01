import React, { useState, useEffect } from "react";
import { api } from "../services/api";

function PortfolioManager() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/portfolio"); // GET /api/portfolio
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Portfolio Manager</h1>
      {projects.map((p) => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default PortfolioManager;
