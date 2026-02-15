import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, Shield, GraduationCap, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { usersAPI } from '../api/usersAPI';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/ui/Button';

const ProfilePage = () => {
  const { user, login } = useAuth();
  const { toast } = useToast();
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
      const response = await usersAPI.updateUser(user.id, profileData);
      
      if (response.success) {
        toast.success('Profil mis à jour avec succès !', 'Succès');
        setIsEditing(false);
        
        // Mettre à jour le localStorage avec les nouvelles données
        const updatedUser = { ...user, ...response.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Recharger la page pour mettre à jour le contexte
        window.location.reload();
      } else {
        toast.error(response.message || 'Erreur lors de la mise à jour du profil', 'Erreur');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Erreur lors de la mise à jour du profil',
        'Erreur'
      );
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
      const response = await usersAPI.updatePassword(user.id, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      if (response.success) {
        toast.success('Mot de passe modifié avec succès !', 'Succès');
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        toast.error(response.message || 'Erreur lors du changement de mot de passe', 'Erreur');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Erreur lors du changement de mot de passe',
        'Erreur'
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = () => {
    if (user?.role === 'admin') {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
          <Shield className="w-4 h-4" />
          <span className="font-medium">Administrateur</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
        <GraduationCap className="w-4 h-4" />
        <span className="font-medium">Étudiant</span>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos informations personnelles et votre sécurité
          </p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.fullName || user?.username}
                  </h2>
                  <p className="text-gray-600 mt-1">{user?.email}</p>
                  <div className="mt-3">{getRoleBadge()}</div>
                </div>
              </div>
              {!isEditing && (
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Modifier
                </Button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileSubmit} className="space-y-4 border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="flex items-center gap-2"
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
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            ) : (
              <div className="border-t pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nom d'utilisateur</p>
                      <p className="font-medium text-gray-900">{user?.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{user?.email}</p>
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sécurité
                  </h3>
                  <p className="text-sm text-gray-600">
                    Modifiez votre mot de passe
                  </p>
                </div>
              </div>
              {!isChangingPassword && (
                <Button
                  variant="secondary"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Changer le mot de passe
                </Button>
              )}
            </div>

            {isChangingPassword && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4 border-t pt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="flex items-center gap-2"
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informations du compte
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-primary-600">
                  {user?.id}
                </p>
                <p className="text-sm text-gray-600 mt-1">ID Utilisateur</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-primary-600">
                  {new Date(user?.createdAt).toLocaleDateString('fr-FR')}
                </p>
                <p className="text-sm text-gray-600 mt-1">Membre depuis</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-primary-600">
                  {user?.role === 'admin' ? 'Admin' : 'Étudiant'}
                </p>
                <p className="text-sm text-gray-600 mt-1">Rôle</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
