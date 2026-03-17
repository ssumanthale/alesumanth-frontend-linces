const ProcessStep = ({ number, title, description, isLast = false }) => {
  return (
    <div className="relative">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-gray-900">{number}</span>
          </div>

          {!isLast && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-stone-300 to-transparent"></div>
          )}
        </div>

        <div className="flex-1 pb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessStep;
