// Skeleton Loading Component
function SkeletonLoader({ className = "", lines = 1, height = "h-4" }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div key={i} className={`${height} bg-white/10 rounded mb-2 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}></div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
