import React from "react";

interface ChampTexteProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string; // Message d'erreur transmis par le parent
  placeholder?: string;
  required?: boolean;
}

export const ChampTexte: React.FC<ChampTexteProps> = ({
  id, label, type = "text", value, onChange, error, placeholder, required = true
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-1 font-bold text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 box-border transition-colors ${
        error ? "border-2 border-red-500 bg-red-50" : "border-gray-300"
      }`}
    />
    {/* On affiche le message d'erreur uniquement s'il existe */}
    <span className="text-red-500 text-sm min-h-[1.2em] mt-1 block font-medium">
      {error || ""}
    </span>
  </div>
);

export default ChampTexte;
