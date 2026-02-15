import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

const ThemeDebug = () => {
  const { theme } = useTheme();
  
  // Log pour forcer le re-render
  console.log('🎨 ThemeDebug render avec theme:', theme);
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
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 border-2 border-primary-500 rounded-lg shadow-lg text-sm z-50"
         style={{
           backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
           color: theme === 'dark' ? '#ffffff' : '#000000',
           borderColor: theme === 'dark' ? '#10b981' : '#3b82f6'
         }}>
      <div className="font-bold mb-2 text-gray-900 dark:text-white">
        {theme === 'dark' ? '🌙 MODE SOMBRE ACTIF' : '☀️ MODE CLAIR ACTIF'}
      </div>
      <div className="space-y-1 text-gray-700 dark:text-gray-300">
        <div>Theme Context: <strong className="text-primary-600 dark:text-primary-400">{theme}</strong></div>
        <div>HTML Classes: <strong className="text-primary-600 dark:text-primary-400">{htmlClasses || 'aucune'}</strong></div>
        <div>Test couleur: 
          <span className="ml-2 px-2 py-1 rounded" 
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                  color: theme === 'dark' ? '#fbbf24' : '#1f2937'
                }}>
            {theme === 'dark' ? 'Fond gris foncé' : 'Fond gris clair'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThemeDebug;
