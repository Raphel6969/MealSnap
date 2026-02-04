import { useEffect, useRef } from 'react'

export default function Results({ data, onClose }) {
  const resultsRef = useRef(null)

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  if (!data) return null

  return (
    <div ref={resultsRef} className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">🔍 AI Analysis</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-3">
        {data.foods.map((food, index) => (
          <div key={index} className="border-b pb-3 last:border-b-0">
            <div className="font-semibold text-lg">{food.name}</div>
            <div className="text-sm text-gray-600">{food.grams}g</div>
            <div className="flex gap-4 mt-2 text-sm flex-wrap">
              <span className="text-blue-600">🥩 {food.protein}P</span>
              <span className="text-green-600">🌾 {food.carbs}C</span>
              <span className="text-yellow-600">🧈 {food.fats}F</span>
              <span className="text-gray-600">🔥 {food.calories} cal</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mt-4">
        <div className="font-bold text-lg mb-2">Total Macros</div>
        <div className="flex gap-4 flex-wrap">
          <span className="text-blue-600 font-semibold">{data.total.protein}P</span>
          <span className="text-green-600 font-semibold">{data.total.carbs}C</span>
          <span className="text-yellow-600 font-semibold">{data.total.fats}F</span>
          <span className="text-gray-800 font-semibold">{data.total.calories} cal</span>
        </div>
      </div>
    </div>
  )
}