function RadioGroup({ label, name, options, value, onChange, required = false, error }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
              value === option.value
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="mt-1 mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">{option.title}</div>
              <div className="text-sm text-gray-600">
                {option.year} - Director: {option.director}
              </div>
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default RadioGroup;

