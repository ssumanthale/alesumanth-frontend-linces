const Card = ({ icon: Icon, title, description, accent = false }) => {
  return (
    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
      accent
        ? 'bg-gradient-to-br from-stone-50 to-white border-2 border-stone-200 hover:border-stone-300'
        : 'bg-white border border-stone-200 hover:border-stone-300'
    } hover:shadow-xl hover:-translate-y-1`}>
      <div className="p-8">
        <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-stone-100 text-gray-900 transition-all duration-300 group-hover:scale-110 group-hover:bg-stone-200">
          <Icon size={28} strokeWidth={1.5} />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-300 to-stone-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

export default Card;
