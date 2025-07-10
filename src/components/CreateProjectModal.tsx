import { useState } from "react";

interface Props {
  onClose: () => void;
  onCreate: (project: { name: string; description: string }) => void;
}

const CreateProjectModal = ({ onClose, onCreate }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    onCreate({ name, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <input
          className="border w-full mb-2 p-2"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border w-full mb-4 p-2"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
