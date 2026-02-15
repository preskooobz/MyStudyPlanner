import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Button from './ui/Button';
import { useTheme } from '../context/ThemeContext';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmer', cancelText = 'Annuler', variant = 'danger' }) => {
  const { theme } = useTheme();
  
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              color: theme === 'dark' ? '#ffffff' : '#111827'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="p-6 pb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                variant === 'danger' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'
              }`}
                   style={{
                     backgroundColor: variant === 'danger'
                       ? (theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2')
                       : (theme === 'dark' ? 'rgba(234, 179, 8, 0.2)' : '#fef9c3')
                   }}>
                <AlertTriangle className={`w-6 h-6 ${
                  variant === 'danger' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
                }`}
                               style={{
                                 color: variant === 'danger'
                                   ? (theme === 'dark' ? '#f87171' : '#dc2626')
                                   : (theme === 'dark' ? '#facc15' : '#ca8a04')
                               }} />
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm"
                 style={{ color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
                {message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 pt-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl"
                 style={{ backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb' }}>
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                {cancelText}
              </Button>
              <Button
                variant={variant === 'danger' ? 'danger' : 'primary'}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1"
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
