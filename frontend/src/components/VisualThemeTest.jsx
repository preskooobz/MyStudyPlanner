import { useTheme } from '../context/ThemeContext';

const VisualThemeTest = () => {
  const { theme } = useTheme();
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '40px',
        borderRadius: '20px',
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 9999,
        border: '5px solid',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
        color: theme === 'dark' ? '#00ff00' : '#ff0000',
        borderColor: theme === 'dark' ? '#00ff00' : '#ff0000',
      }}
    >
      <div style={{ marginBottom: '20px', fontSize: '64px' }}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
      <div>
        {theme === 'dark' ? 'MODE SOMBRE' : 'MODE CLAIR'}
      </div>
      <div style={{ fontSize: '18px', marginTop: '20px', opacity: 0.8 }}>
        Theme: {theme}
      </div>
      <div style={{ fontSize: '16px', marginTop: '10px', opacity: 0.6 }}>
        Si vous voyez ce message changer<br/>
        de couleur, le système fonctionne !
      </div>
    </div>
  );
};

export default VisualThemeTest;
