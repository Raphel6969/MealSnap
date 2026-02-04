export default function Loading() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">AI is analyzing your meal...</p>
      <p className="text-sm text-gray-400 mt-2">This usually takes 2-3 seconds</p>
    </div>
  )
}