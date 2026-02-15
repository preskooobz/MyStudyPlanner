import { cn } from '../utils/helpers';

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  disabled,
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };

  return (
    <button
      className={cn(variants[variant], className, disabled && 'opacity-50 cursor-not-allowed')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
