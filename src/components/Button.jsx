function Button({ children, onClick, type = "button", variant = "primary", icon }) {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-lg",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;

