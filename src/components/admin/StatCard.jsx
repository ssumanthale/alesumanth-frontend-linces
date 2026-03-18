const StatCard = ({ icon: Icon, label, value, color = 'blue' }) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl ${colorStyles[color]} flex items-center justify-center mb-4`}>
        <Icon size={24} />
      </div>
      <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;
