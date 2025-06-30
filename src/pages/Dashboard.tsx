import { useState } from "react";
import { useProjects } from "../hooks/useProjects";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const { projects, loading, totalPages } = useProjects(page);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {projects.map((project) => (
            <div key={project.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p className="text-gray-600">{project.pantone_value}</p>
              <div className="mt-2 w-full h-4 rounded" style={{ backgroundColor: project.color }} />
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 justify-center">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <button
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
