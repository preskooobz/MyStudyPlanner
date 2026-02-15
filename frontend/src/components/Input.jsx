import { useTheme } from '../context/ThemeContext';

const Input = ({ label, error, ...props }) => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2"
               style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
          {label}
        </label>
      )}
      <input
        className={`input-field ${error ? 'border-red-500' : ''}`}
        style={{
          backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
          borderColor: error ? (theme === 'dark' ? '#f87171' : '#dc2626') : (theme === 'dark' ? '#374151' : '#d1d5db'),
          color: theme === 'dark' ? '#ffffff' : '#111827'
        }}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600"
           style={{ color: theme === 'dark' ? '#f87171' : '#dc2626' }}>{error}</p>
      )}
    </div>
  );
};

export default Input;
