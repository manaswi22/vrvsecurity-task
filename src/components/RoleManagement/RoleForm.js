import React, { useState } from "react";

function RoleForm({ onClose, onSave, role, error }) {
  const predefinedPermissions = ["Read", "Write", "Delete"];
  const [name, setName] = useState(role?.name || "");
  const [permissions, setPermissions] = useState(role?.permissions || []);
  const [formError, setFormError] = useState("");

  const handleTogglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    if (!name || permissions.length === 0) {
      setFormError("Role name and at least one permission are required.");
      return;
    }

    onSave({ name, permissions });
    setFormError(""); // Clear form-specific error on successful submit
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
        {/* Title and Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-700">{role ? "Edit Role" : "Add Role"}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Error Display */}
        {formError && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded">
            <strong>Error:</strong> {formError}
          </div>
        )}

        {/* Role Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter role name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Permissions */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Permissions</label>
          <div className="space-y-2">
            {predefinedPermissions.map((permission) => (
              <label key={permission} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => handleTogglePermission(permission)}
                  className="cursor-pointer"
                />
                <span className="text-gray-600">{permission}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={handleSubmit}
          >
            Save Role
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleForm;
