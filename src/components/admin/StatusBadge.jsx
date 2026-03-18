const StatusBadge = ({ status, onStatusChange, editable = false }) => {
  const statusStyles = {
    PENDING: 'bg-gray-100 text-gray-700 border-gray-200',
    IN_REVIEW: 'bg-blue-100 text-blue-700 border-blue-200',
    APPROVED: 'bg-green-100 text-green-700 border-green-200',
    REJECTED: 'bg-red-100 text-red-700 border-red-200',
  };

  const normalizedStatus = status?.toUpperCase() || 'PENDING';
  const style = statusStyles[normalizedStatus] || statusStyles.PENDING;

  if (editable) {
    return (
      <select
        value={normalizedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg border cursor-pointer transition-colors ${style}`}
      >
        <option value="PENDING">Pending</option>
        <option value="IN_REVIEW">In Review</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
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
