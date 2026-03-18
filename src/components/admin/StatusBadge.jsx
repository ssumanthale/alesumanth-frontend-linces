const StatusBadge = ({ status, onStatusChange, editable = false }) => {
  const statusStyles = {
    pending: 'bg-gray-100 text-gray-700 border-gray-200',
    'in review': 'bg-blue-100 text-blue-700 border-blue-200',
    'in-review': 'bg-blue-100 text-blue-700 border-blue-200',
    approved: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
  };

  const normalizedStatus = status?.toLowerCase() || 'pending';
  const style = statusStyles[normalizedStatus] || statusStyles.pending;

  if (editable) {
    return (
      <select
        value={normalizedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg border cursor-pointer transition-colors ${style}`}
      >
        <option value="pending">Pending</option>
        <option value="in-review">In Review</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    );
  }

  return (
    <span className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-lg border ${style}`}>
      {status || 'Pending'}
    </span>
  );
};

export default StatusBadge;
