import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Button from './ui/Button';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmer', cancelText = 'Annuler', variant = 'danger' }) => {
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
            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="p-6 pb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                variant === 'danger' ? 'bg-red-100' : 'bg-yellow-100'
              }`}>
                <AlertTriangle className={`w-6 h-6 ${
                  variant === 'danger' ? 'text-red-600' : 'text-yellow-600'
                }`} />
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 text-sm">
                {message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 pt-4 bg-gray-50 rounded-b-xl">
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
