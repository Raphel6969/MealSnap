export default function AISuggestion({ suggestion, reason }) {
  if (!suggestion) return null
  
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white mb-6 animate-fade-in">
      <h3 className="font-semibold mb-2 flex items-center">
        🤖 <span className="ml-2">AI Suggests:</span>
      </h3>
      <p className="text-lg mb-2">{suggestion}</p>
      <p className="text-sm opacity-90">{reason}</p>
    </div>
  )
}