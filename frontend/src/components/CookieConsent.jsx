import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';
import Button from './ui/Button';
import { getCookie, setCookie } from '../utils/cookies';
import { useTheme } from '../context/ThemeContext';

const CookieConsent = () => {
  const { theme } = useTheme();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = getCookie('cookie-consent');
    if (!consent) {
      // Afficher le banner après 1 seconde
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookie-consent', 'accepted', 365); // 1 an
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie('cookie-consent', 'declined', 365);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
               style={{
                 backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                 borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
               }}>
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center"
                     style={{
                       backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7'
                     }}>
                  <Cookie className="w-6 h-6 text-primary-600 dark:text-primary-400"
                          style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                      style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                    🍪 Nous utilisons des cookies
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                     style={{ color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
                    Nous utilisons des cookies pour améliorer votre expérience, mémoriser vos préférences de connexion 
                    et analyser le trafic. En continuant à utiliser notre site, vous acceptez notre utilisation des cookies.
                    {' '}
                    <a 
                      href="/privacy" 
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
                      style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      En savoir plus
                    </a>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button
                    variant="secondary"
                    onClick={handleDecline}
                    className="flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <X className="w-4 h-4" />
                    Refuser
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleAccept}
                    className="flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Check className="w-4 h-4" />
                    Accepter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
