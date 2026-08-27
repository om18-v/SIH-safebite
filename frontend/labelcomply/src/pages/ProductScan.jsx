import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ProductScan() {

  const navigate = useNavigate()

  const [analyzing, setAnalyzing] = useState(false)

  const analyze = () => {

    setAnalyzing(true)

    setTimeout(() => {
      navigate('/citizen/result')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white p-6">

      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate('/citizen')}
          className="text-blue-700"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mt-8">
          Scan Product
        </h1>

        <p className="text-gray-500 mt-2">
          Take a clear photo of the product label.
        </p>

        <div className="mt-8 border-2 border-dashed
                        border-blue-200 rounded-3xl
                        p-12 text-center bg-blue-50">

          <div className="text-5xl">
            📷
          </div>

          <h2 className="font-bold text-xl mt-5">
            Upload Product Label
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            OCR will extract product and label information.
          </p>

          <input
            type="file"
            accept="image/*"
            className="mt-7 w-full"
          />

        </div>

        <button
          onClick={analyze}
          disabled={analyzing}
          className="mt-6 w-full rounded-xl
                     bg-blue-700 text-white py-4
                     font-bold disabled:opacity-50"
        >
          {analyzing
            ? 'Analyzing Label...'
            : 'Verify Compliance Now'
          }
        </button>

      </div>

    </div>
  )
}

export default ProductScan