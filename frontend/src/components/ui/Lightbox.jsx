// Enhanced Lightbox Component with better animations
function Lightbox({ open, onClose, src, alt }) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative group animate-scale-in" onClick={e => e.stopPropagation()}>
        <img src={src} alt={alt} className="max-w-[95vw] max-h-[95vh] object-contain rounded-3xl shadow-2xl transform transition-all duration-300 group-hover:scale-105" />
        <button onClick={onClose} className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 hover:rotate-90">
          ×
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}

export default Lightbox;
