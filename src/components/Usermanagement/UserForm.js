import React, { useState, useEffect } from "react";

function UserForm({ onClose, onSave, roles, user }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  const [active, setActive] = useState(user?.active || false);

  const handleSubmit = () => {
    if (!name || !email || !role) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    onSave({ name, email, role, active });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-6">{user ? "Edit User" : "Add User"}</h3>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>Select Role</option>
          {roles.map((r) => (
            <option key={r.name} value={r.name}>{r.name}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="form-checkbox"
          />
          Active
        </label>

        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 px-6 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
