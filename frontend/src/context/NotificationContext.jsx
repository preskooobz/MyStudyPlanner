import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { tasksAPI } from '../api/tasksAPI';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      checkOverdueTasks();
      // Vérifier toutes les 5 minutes
      const interval = setInterval(checkOverdueTasks, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const checkOverdueTasks = async () => {
    if (!user) return;
    
    // Vérifier si on a un token valide
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.log('Pas de token, skip notification check');
      return;
    }

    try {
      const params = user.role === 'admin' ? {} : { userId: user.id };
      const response = await tasksAPI.getAllTasks(params);

      if (response.success) {
        const now = new Date();
        const overdueTasks = response.tasks.filter(task => {
          if (task.status === 'completed') return false;
          const dueDate = new Date(task.dueDate);
          return dueDate < now;
        });

        const upcomingTasks = response.tasks.filter(task => {
          if (task.status === 'completed') return false;
          const dueDate = new Date(task.dueDate);
          const diffTime = dueDate - now;
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          return diffDays > 0 && diffDays <= 1; // Tâches dans les prochaines 24h
        });

        const newNotifications = [];

        // Notifications pour tâches en retard
        overdueTasks.forEach(task => {
          newNotifications.push({
            id: `overdue-${task.id}`,
            taskId: task.id,
            type: 'overdue',
            title: 'Tâche en retard',
            message: `"${task.title}" devait être terminée avant le ${new Date(task.dueDate).toLocaleDateString('fr-FR')}`,
            priority: 'high',
            read: false,
            createdAt: new Date().toISOString()
          });
        });

        // Notifications pour tâches à venir
        upcomingTasks.forEach(task => {
          newNotifications.push({
            id: `upcoming-${task.id}`,
            taskId: task.id,
            type: 'upcoming',
            title: 'Tâche à venir',
            message: `"${task.title}" doit être terminée dans moins de 24h`,
            priority: 'medium',
            read: false,
            createdAt: new Date().toISOString()
          });
        });

        // Fusionner avec les notifications existantes (éviter les doublons)
        setNotifications(prevNotifications => {
          const existingIds = prevNotifications.map(n => n.id);
          const uniqueNewNotifications = newNotifications.filter(
            n => !existingIds.includes(n.id)
          );
          const merged = [...uniqueNewNotifications, ...prevNotifications];
          
          // Limiter à 50 notifications
          return merged.slice(0, 50);
        });

        // Compter les non lues
        const unread = newNotifications.filter(n => !n.read).length;
        if (unread > 0) {
          setUnreadCount(prev => prev + unread);
        }
      }
    } catch (error) {
      // Ne pas logger si c'est une erreur 401 (non authentifié)
      if (error.response?.status !== 401) {
        console.error('Erreur lors de la vérification des tâches:', error);
      }
      // En cas d'erreur 401, l'intercepteur axios va gérer la redirection
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    );
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    checkOverdueTasks
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
