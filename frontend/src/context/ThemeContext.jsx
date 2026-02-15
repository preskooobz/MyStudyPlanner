import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Récupérer le thème depuis localStorage ou utiliser le thème système
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Vérifier la préférence système
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Appliquer le thème au document
    const root = document.documentElement;
    const body = document.body;
    
    console.log('🎨 Application du thème:', theme);
    
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      console.log('✅ Mode sombre activé');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      console.log('✅ Mode clair activé');
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('theme', theme);
    
    // Vérifier que la classe a bien été appliquée
    console.log('Classes HTML:', root.classList.toString());
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const setLightTheme = () => {
    setTheme('light');
  };

  const setDarkTheme = () => {
    setTheme('dark');
  };

  const value = {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
