const SectionContainer = ({ children, className = '', background = 'white' }) => {
  const bgColors = {
    white: 'bg-white',
    cream: 'bg-stone-50',
    dark: 'bg-gray-900',
  };

  return (
    <section className={`${bgColors[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
