function LoadingLinearProgress({ height = 'h-1', className = '' }) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-blue-100 ${height} ${className}`}
    >
      <div
        className="absolute top-0 left-0 h-full bg-blue-500"
        style={{
          width: '100%',
          transform: 'translateX(-100%)',
          animation: 'slide 2.5s infinite linear',
        }}
      />
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
export default LoadingLinearProgress;
