import ThemeToggle from './ThemeToggle';
import NotificationCenter from './NotificationCenter';

const PageHeader = ({ title, subtitle, rightContent, className = '' }) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        {title && (
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {rightContent}
        <NotificationCenter />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default PageHeader;
