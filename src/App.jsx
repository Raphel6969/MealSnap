import { useState, useEffect } from 'react'
import Header from './components/Header'
import DailyProgress from './components/DailyProgress'
import AISuggestion from './components/AISuggestion'
import CameraInput from './components/CameraInput'
import Results from './components/Results'
import Loading from './components/Loading'
import FoodLog from './components/FoodLog'

function App() {
  const [stats, setStats] = useState({
    totals: { protein: 74, carbs: 78, fats: 23, calories: 830 },
    targets: { protein: 180, carbs: 200, fats: 60 },
    logs: [
      {
        timestamp: new Date().setHours(8, 30, 0, 0),
        foods: [
          { name: 'Scrambled eggs', grams: 150, protein: 18, carbs: 2, fats: 15, calories: 215 },
          { name: 'Whole wheat toast', grams: 60, protein: 6, carbs: 30, fats: 2, calories: 160 }
        ],
        total: { protein: 24, carbs: 32, fats: 17, calories: 375 }
      },
      {
        timestamp: new Date().setHours(13, 0, 0, 0),
        foods: [
          { name: 'Grilled chicken breast', grams: 200, protein: 46, carbs: 0, fats: 5, calories: 245 },
          { name: 'Brown rice', grams: 100, protein: 4, carbs: 46, fats: 1, calories: 210 }
        ],
        total: { protein: 50, carbs: 46, fats: 6, calories: 455 }
      }
    ]
  })
  
  const [suggestion, setSuggestion] = useState({
    suggestion: '200g Greek yogurt + 1 banana',
    reason: 'This will give you 40g protein and help you hit your remaining macro targets'
  })
  
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeImage = async (imageData) => {
    setLoading(true)
    setAnalysisResult(null)

    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockResult = {
      foods: [
        {
          name: 'Grilled chicken breast',
          grams: 200,
          protein: 46,
          carbs: 0,
          fats: 5,
          calories: 245
        },
        {
          name: 'Steamed broccoli',
          grams: 100,
          protein: 3,
          carbs: 7,
          fats: 0,
          calories: 34
        },
        {
          name: 'Sweet potato',
          grams: 150,
          protein: 2,
          carbs: 30,
          fats: 0,
          calories: 130
        }
      ],
      total: { protein: 51, carbs: 37, fats: 5, calories: 409 }
    }

    setAnalysisResult(mockResult)
    
    setStats(prev => ({
      ...prev,
      totals: {
        protein: prev.totals.protein + mockResult.total.protein,
        carbs: prev.totals.carbs + mockResult.total.carbs,
        fats: prev.totals.fats + mockResult.total.fats,
        calories: prev.totals.calories + mockResult.total.calories
      },
      logs: [
        ...prev.logs,
        {
          timestamp: new Date().getTime(),
          foods: mockResult.foods,
          total: mockResult.total
        }
      ]
    }))

    const newProtein = stats.totals.protein + mockResult.total.protein
    const proteinLeft = stats.targets.protein - newProtein
    
    if (proteinLeft > 30) {
      setSuggestion({
        suggestion: '200g grilled chicken + 150g rice',
        reason: `You still need ${Math.round(proteinLeft)}g protein today`
      })
    } else if (proteinLeft > 0) {
      setSuggestion({
        suggestion: '150g Greek yogurt',
        reason: `Almost there! Just ${Math.round(proteinLeft)}g protein remaining`
      })
    } else {
      setSuggestion({
        suggestion: 'Great job! You hit your protein target 🎉',
        reason: 'Focus on recovery and hydration now'
      })
    }

    setLoading(false)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-2xl mx-auto p-6">
        <Header />
        
        <DailyProgress 
          totals={stats.totals}
          targets={stats.targets}
        />
        
        <AISuggestion 
          suggestion={suggestion.suggestion}
          reason={suggestion.reason}
        />
        
        <CameraInput onAnalyze={analyzeImage} />
        
        {loading && <Loading />}
        
        {analysisResult && !loading && (
          <Results 
            data={analysisResult}
            onClose={() => setAnalysisResult(null)}
          />
        )}
        
        <FoodLog logs={stats.logs} />
      </div>
    </div>
  )
}

export default App