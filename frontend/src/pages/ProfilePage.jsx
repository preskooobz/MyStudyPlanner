import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, Shield, GraduationCap, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/ui/Button';

const ProfilePage = () => {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    fullName: user?.fullName || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mise à jour locale (sans API)
      const updatedUser = { 
        ...user, 
        name: profileData.fullName || profileData.username,
        email: profileData.email 
      };
      
      // Mettre à jour le localStorage
      localStorage.setItem('mystudyplanner_current_user', JSON.stringify(updatedUser));
      
      // Mettre à jour aussi dans la liste des utilisateurs
      const users = JSON.parse(localStorage.getItem('mystudyplanner_users') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], name: updatedUser.name, email: updatedUser.email };
        localStorage.setItem('mystudyplanner_users', JSON.stringify(users));
      }
      
      toast.success('Profil mis à jour avec succès !', 'Succès');
      setIsEditing(false);
      
      // Recharger la page pour mettre à jour le contexte
      window.location.reload();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil', 'Erreur');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas', 'Erreur');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères', 'Erreur');
      return;
    }

    setLoading(true);

    try {
      // Vérifier le mot de passe actuel
      const users = JSON.parse(localStorage.getItem('mystudyplanner_users') || '[]');
      const currentUser = users.find(u => u.id === user.id);
      
      if (!currentUser || currentUser.password !== passwordData.currentPassword) {
        toast.error('Mot de passe actuel incorrect', 'Erreur');
        setLoading(false);
        return;
      }
      
      // Mettre à jour le mot de passe
      currentUser.password = passwordData.newPassword;
      const userIndex = users.findIndex(u => u.id === user.id);
      users[userIndex] = currentUser;
      localStorage.setItem('mystudyplanner_users', JSON.stringify(users));
      
      toast.success('Mot de passe modifié avec succès !', 'Succès');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Erreur lors du changement de mot de passe', 'Erreur');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = () => {
    if (user?.role === 'admin') {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full"
             style={{
               backgroundColor: theme === 'dark' ? 'rgba(147, 51, 234, 0.2)' : '#f3e8ff',
               color: theme === 'dark' ? '#c084fc' : '#7c3aed'
             }}>
          <Shield className="w-4 h-4" />
          <span className="font-medium">Administrateur</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full"
           style={{
             backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7',
             color: theme === 'dark' ? '#4ade80' : '#16a34a'
           }}>
        <GraduationCap className="w-4 h-4" />
        <span className="font-medium">Étudiant</span>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900"
              style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>Mon Profil</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1"
             style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
            Gérez vos informations personnelles et votre sécurité
          </p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0"
                     style={{
                       backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7'
                     }}>
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600"
                        style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900"
                      style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                    {user?.fullName || user?.username}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-1"
                     style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>{user?.email}</p>
                  <div className="mt-2 sm:mt-3">{getRoleBadge()}</div>
                </div>
              </div>
              {!isEditing && (
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="sm:inline">Modifier</span>
                </Button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileSubmit} className="space-y-4 border-t pt-6"
                    style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"
                           style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                      Nom d'utilisateur
                    </label>
                    <Input
                      name="username"
                      value={profileData.username}
                      onChange={handleProfileChange}
                      placeholder="Nom d'utilisateur"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"
                           style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                      Nom complet
                    </label>
                    <Input
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                      placeholder="Nom complet"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"
                         style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setProfileData({
                        username: user?.username || '',
                        email: user?.email || '',
                        fullName: user?.fullName || '',
                      });
                    }}
                    className="w-full sm:w-auto"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            ) : (
              <div className="border-t pt-6 space-y-4"
                   style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"
                         style={{
                           backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6'
                         }}>
                      <User className="w-5 h-5 text-gray-600"
                            style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500"
                         style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>Nom d'utilisateur</p>
                      <p className="font-medium text-gray-900"
                         style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>{user?.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"
                         style={{
                           backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6'
                         }}>
                      <Mail className="w-5 h-5 text-gray-600"
                            style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500"
                         style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>Email</p>
                      <p className="font-medium text-gray-900"
                         style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Security Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0"
                     style={{
                       backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2'
                     }}>
                  <Lock className="w-5 h-5 text-red-600"
                        style={{ color: theme === 'dark' ? '#f87171' : '#dc2626' }} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900"
                      style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                    Sécurité
                  </h3>
                  <p className="text-sm text-gray-600"
                     style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
                    Modifiez votre mot de passe
                  </p>
                </div>
              </div>
              {!isChangingPassword && (
                <Button
                  variant="secondary"
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full sm:w-auto text-sm"
                >
                  Changer le mot de passe
                </Button>
              )}
            </div>

            {isChangingPassword && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4 border-t pt-6"
                    style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"
                         style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                    Mot de passe actuel
                  </label>
                  <Input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Mot de passe actuel"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"
                         style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                    Nouveau mot de passe
                  </label>
                  <Input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nouveau mot de passe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"
                         style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                    Confirmer le mot de passe
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirmer le mot de passe"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Modification...' : 'Modifier le mot de passe'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      });
                    }}
                    className="w-full sm:w-auto"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4"
                style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
              Informations du compte
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg"
                   style={{
                     backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb'
                   }}>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600"
                   style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }}>
                  {user?.id}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1"
                   style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>ID Utilisateur</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg"
                   style={{
                     backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb'
                   }}>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600"
                   style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }}>
                  {new Date(user?.createdAt).toLocaleDateString('fr-FR')}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1"
                   style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>Membre depuis</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg"
                   style={{
                     backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb'
                   }}>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600"
                   style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }}>
                  {user?.role === 'admin' ? 'Admin' : 'Étudiant'}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1"
                   style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>Rôle</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
