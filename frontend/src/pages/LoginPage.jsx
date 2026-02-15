import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { BookOpen, LogIn, UserPlus } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login({
          username: formData.username,
          password: formData.password
        });
      } else {
        result = await register(formData);
      }

      if (result.success) {
        toast.success(
          isLogin ? 'Connexion réussie !' : 'Compte créé avec succès !',
          'Bienvenue'
        );
        navigate('/dashboard');
      } else {
        toast.error(result.message || 'Une erreur est survenue', 'Erreur');
      }
    } catch (err) {
      toast.error('Une erreur est survenue. Veuillez réessayer.', 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4"
         style={{
           background: theme === 'dark' 
             ? 'linear-gradient(to bottom right, #111827, #1f2937, #111827)'
             : 'linear-gradient(to bottom right, #dcfce7, #ffffff, #dcfce7)'
         }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card"
             style={{
               backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
               borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
             }}>
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-100 rounded-full"
                   style={{
                     backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7'
                   }}>
                <BookOpen className="w-10 h-10 text-primary-600"
                          style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2"
                style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
              MyStudyPlanner
            </h1>
            <p className="text-gray-600"
               style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
              {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte étudiant'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nom d'utilisateur"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Entrez votre nom d'utilisateur"
            />

            {!isLogin && (
              <>
                <Input
                  label="Nom complet"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Entrez votre nom complet"
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                />
              </>
            )}

            <Input
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Entrez votre mot de passe"
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Chargement...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {isLogin ? 'Se connecter' : 'S\'inscrire'}
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ username: '', email: '', password: '', fullName: '' });
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }}
            >
              {isLogin ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Comptes de test :</p>
              <p className="text-xs text-gray-600">👤 admin / admin123</p>
              <p className="text-xs text-gray-600">👤 etudiant / etudiant123</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
