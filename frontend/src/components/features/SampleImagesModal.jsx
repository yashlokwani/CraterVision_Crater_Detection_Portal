// Sample Images Modal Component
function SampleImagesModal({ isOpen, onClose, onSelectImage }) {
  const sampleImages = [
    {
      id: 1,
      name: "Sample Crater Image 1",
      filename: "yo",
      url: "/yo.jpg",
      description: "High-resolution lunar crater image for testing detection algorithms"
    },
    {
      id: 2,
      name: "Sample Crater Image 2", 
      filename: "yo2",
      url: "/yo2.jpg",
      description: "Complex crater formation with multiple impact sites"
    }
  ];

  const downloadImage = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const useImageForDetection = (image) => {
    if (onSelectImage) {
      onSelectImage(image);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sample Images for Testing
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-white/70 mt-2">
            Download these sample crater images to test the detection model
          </p>
        </div>

        {/* Sample Images Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleImages.map((image) => (
              <div key={image.id} className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/10">
                <div className="relative group">
                  {/* Image Preview */}
                  <div className="w-full h-64 bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-600">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onLoad={() => console.log(`Image loaded successfully: ${image.url}`)}
                      onError={(e) => {
                        console.error(`Failed to load image: ${image.url}`);
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGI1NTYzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>
                  
                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => useImageForDetection(image)}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Use for Detection
                      </button>
                      <button
                        onClick={() => downloadImage(image.url, `${image.filename}.jpg`)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download {image.filename}.jpg
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Image Info */}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{image.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{image.description}</p>
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    Filename: {image.filename}.jpg
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <h4 className="text-white font-semibold mb-2">How to use:</h4>
            <ol className="text-white/80 text-sm space-y-1">
              <li>1. Download one or both sample images</li>
              <li>2. Go to the main dashboard</li>
              <li>3. Upload the downloaded image using the "Upload Image" button</li>
              <li>4. Click "Detect Craters" to test the model</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SampleImagesModal;
