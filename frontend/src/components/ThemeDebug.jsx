import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

const ThemeDebug = () => {
  const { theme } = useTheme();
  const [htmlClasses, setHtmlClasses] = useState('');

  useEffect(() => {
    const updateClasses = () => {
      setHtmlClasses(document.documentElement.classList.toString());
    };
    updateClasses();
    
    // Observer les changements de classe
    const observer = new MutationObserver(updateClasses);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 border-2 border-primary-500 rounded-lg shadow-lg text-sm z-50">
      <div className="font-bold mb-2 text-gray-900 dark:text-white">🎨 Debug Thème</div>
      <div className="space-y-1 text-gray-700 dark:text-gray-300">
        <div>Theme Context: <strong className="text-primary-600 dark:text-primary-400">{theme}</strong></div>
        <div>HTML Classes: <strong className="text-primary-600 dark:text-primary-400">{htmlClasses || 'aucune'}</strong></div>
        <div>Background: <span className="px-2 py-1 bg-gray-50 dark:bg-gray-900 border rounded">Test</span></div>
      </div>
    </div>
  );
};

export default ThemeDebug;
