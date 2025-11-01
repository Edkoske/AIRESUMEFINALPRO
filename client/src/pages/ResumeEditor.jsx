import React, { useState, useEffect } from "react";
import { api } from "../services/api";

function ResumeEditor() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get("/resumes"); // GET /api/resumes
        setResumes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResumes();
  }, []);

  return (
    <div>
      <h1>Resume Editor</h1>
      {resumes.map((r) => (
        <div key={r._id}>
          <h3>{r.name}</h3>
          <p>{r.email}</p>
        </div>
      ))}
    </div>
  );
}

export default ResumeEditor;
