// System Health Monitor Component
function SystemHealthMonitor({ systemHealth }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational':
        return 'text-green-400';
      case 'Warning':
        return 'text-yellow-400';
      case 'Error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          System Status
        </h3>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* AI Model Status */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🤖</span>
            <div>
              <p className="text-white font-medium text-sm">AI Model</p>
              <p className={`text-xs ${getStatusColor(systemHealth.aiModel)}`}>
                {systemHealth.aiModel}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Server Status */}
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🖥️</span>
            <div>
              <p className="text-white font-medium text-sm">Server</p>
              <p className={`text-xs ${getStatusColor(systemHealth.server)}`}>
                {systemHealth.server}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
          </div>
        </div>

        {/* Processing Queue */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📊</span>
            <div>
              <p className="text-white font-medium text-sm">Queue</p>
              <p className="text-xs text-green-400">{systemHealth.queue} items</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.max(10, systemHealth.queue * 20)}%` }}></div>
          </div>
        </div>

        {/* Uptime */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 border border-orange-500/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⏱️</span>
            <div>
              <p className="text-white font-medium text-sm">Uptime</p>
              <p className="text-xs text-orange-400">{systemHealth.uptime}</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-2xl">
        <h4 className="text-sm font-semibold text-white/80 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/70">Image processed successfully</span>
            <span className="text-white/50 ml-auto">2s ago</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white/70">New upload detected</span>
            <span className="text-white/50 ml-auto">5s ago</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-white/70">AI model optimizing</span>
            <span className="text-white/50 ml-auto">8s ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemHealthMonitor;
