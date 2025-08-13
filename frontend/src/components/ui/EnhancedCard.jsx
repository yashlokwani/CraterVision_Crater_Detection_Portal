// Enhanced Card Component with hover effects
function EnhancedCard({ children, className = "", hoverEffect = true }) {
  return (
    <div className={`bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 ${hoverEffect ? 'hover:shadow-glow hover:scale-105 hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>
  );
}

export default EnhancedCard;
