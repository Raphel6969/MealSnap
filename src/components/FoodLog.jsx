export default function FoodLog({ logs }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Today's Meals</h2>
      
      <div className="space-y-3">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 transition">
              <div className="text-sm text-gray-500">
                {formatTime(log.timestamp)}
              </div>
              <div className="font-semibold">
                {log.foods.map(f => f.name).join(', ')}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <span className="text-blue-600">{log.total.protein}P</span>
                {' / '}
                <span className="text-green-600">{log.total.carbs}C</span>
                {' / '}
                <span className="text-yellow-600">{log.total.fats}F</span>
                {' • '}
                <span className="text-gray-500">{log.total.calories} cal</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">No meals logged yet. Start by capturing a photo!</p>
        )}
      </div>
    </div>
  )
}