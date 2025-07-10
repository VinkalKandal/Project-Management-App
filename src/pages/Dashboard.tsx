import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { createProject } from "../api/projects";
import CreateProjectModal from "../components/CreateProjectModal";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const { projects, loading, totalPages } = useProjects(page);
  const [showModal, setShowModal] = useState(false);

  const handleCreate = async (project: { name: string; description: string }) => {
    try {
      await createProject(project);
      window.location.reload(); // 🔁 Or trigger hook re-fetch if using react-query
    } catch (err) {
      console.error("Failed to create project", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-green-600 text-white rounded">
          + New Project
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
            <div  className="border p-4 rounded shadow-sm">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p className="text-gray-600">{project.pantone_value}</p>
              <div className="mt-2 w-full h-4 rounded" style={{ backgroundColor: project.color }} />
            </div>
            </Link>
          ))}
        </div>
      )}

      <div className="flex gap-2 justify-center">
        <button disabled={page === 1} className="px-4 py-2 bg-gray-300 rounded" onClick={() => setPage((p) => p - 1)}>Prev</button>
        <button disabled={page === totalPages} className="px-4 py-2 bg-gray-300 rounded" onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      {showModal && <CreateProjectModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
    </div>
  );
};

export default Dashboard;
