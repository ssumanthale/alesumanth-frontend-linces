import { ArrowRight } from 'lucide-react';

const CTAButton = ({
  children,
  onClick,
  href,
  variant = 'primary',
  icon = true,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white',
    ghost: 'bg-transparent text-gray-900 hover:bg-stone-100',
  };

  const baseClasses = `
    group inline-flex items-center justify-center gap-2
    px-8 py-4 rounded-xl font-semibold text-lg
    transition-all duration-300
    ${variants[variant]} ${className}
  `;

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight
          size={20}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses} {...props}>
      {content}
    </button>
  );
};

export default CTAButton;
