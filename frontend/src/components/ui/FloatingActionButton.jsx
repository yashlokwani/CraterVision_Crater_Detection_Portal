// Enhanced Floating Action Button with integrated actions
function FloatingActionButton({ isOpen, onToggle, actions = [] }) {
  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Main FAB Button */}
      <button
        onClick={onToggle}
        className="group w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-glow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
      >
        <div className="flex items-center justify-center w-full h-full">
          <svg className={`w-8 h-8 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 space-y-3 animate-fade-in">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`group w-14 h-14 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-xl">{action.icon}</span>
              </div>
              <div className="absolute right-full mr-3 px-3 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {action.label}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FloatingActionButton;
