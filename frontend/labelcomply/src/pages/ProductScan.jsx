import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ProductScan() {
  const navigate = useNavigate()
  const [analyzing, setAnalyzing] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setErrorMsg('')
    }
  }

  const analyze = async () => {
    if (!selectedFile) {
      setErrorMsg('Please select an image file before analyzing.')
      return
    }

    setAnalyzing(true)
    setErrorMsg('')

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await fetch('http://127.0.0.1:8000/products/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`)
      }

      const data = await response.json()

      // Navigate to results page with real OCR data
      navigate('/citizen/result', { state: { resultData: data } })
    } catch (err) {
      console.error('Upload Error:', err)
      setErrorMsg('Failed to process image. Make sure FastAPI backend is running on port 8000.')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/citizen')}
          className="text-blue-700 font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mt-8">
          Scan Product
        </h1>

        <p className="text-gray-500 mt-2">
          Take a clear photo of the product label.
        </p>

        <div className="mt-8 border-2 border-dashed border-blue-200 rounded-3xl p-12 text-center bg-blue-50">
          <div className="text-5xl">📷</div>

          <h2 className="font-bold text-xl mt-5">
            Upload Product Label
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            OCR will extract product and label information.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-7 w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />

          {selectedFile && (
            <p className="mt-3 text-sm font-semibold text-green-600">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {errorMsg && (
          <p className="mt-4 text-center text-red-600 text-sm font-semibold">
            {errorMsg}
          </p>
        )}

        <button
          onClick={analyze}
          disabled={analyzing || !selectedFile}
          className="mt-6 w-full rounded-xl bg-blue-700 text-white py-4 font-bold disabled:opacity-50"
        >
          {analyzing ? 'Analyzing Label via OCR...' : 'Verify Compliance Now'}
        </button>
      </div>
    </div>
  )
}

export default ProductScan