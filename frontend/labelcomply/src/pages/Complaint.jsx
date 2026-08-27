import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Complaint() {

  const navigate = useNavigate()

  const [submitted, setSubmitted] = useState(false)

  const submit = (e) => {

    e.preventDefault()

    setSubmitted(true)
  }

  if (submitted) {

    return (
      <div className="min-h-screen bg-white
                      flex items-center justify-center p-6">

        <div className="max-w-md text-center">

          <div className="text-6xl">
            ✓
          </div>

          <h1 className="text-3xl font-bold mt-5">
            Complaint Submitted
          </h1>

          <p className="text-gray-500 mt-3">
            Your complaint has been received and is awaiting
            verification by the appropriate authority.
          </p>

          <p className="font-bold text-blue-700 mt-5">
            Complaint ID: LC-2026-10482
          </p>

          <button
            onClick={() => navigate('/citizen/track')}
            className="mt-7 bg-blue-700 text-white
                       rounded-xl px-6 py-3 font-semibold"
          >
            Track Complaint
          </button>

        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate('/citizen')}
          className="text-blue-700"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mt-8">
          Report Suspicious Product
        </h1>

        <p className="text-gray-500 mt-2">
          Provide information to help authorities investigate.
        </p>

        <form
          onSubmit={submit}
          className="mt-7 bg-white border
                     border-gray-200 rounded-3xl p-6 space-y-5"
        >

          <div>

            <label className="font-semibold text-sm">
              Product / Brand
            </label>

            <input
              required
              placeholder="e.g. ABC Milk"
              className="mt-2 w-full border border-gray-200
                         rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="font-semibold text-sm">
              Location
            </label>

            <input
              required
              placeholder="Shop / area / pincode"
              className="mt-2 w-full border border-gray-200
                         rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="font-semibold text-sm">
              What happened?
            </label>

            <textarea
              required
              rows="4"
              placeholder="Describe the issue..."
              className="mt-2 w-full border border-gray-200
                         rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="font-semibold text-sm">
              Product / Bill Photo
            </label>

            <input
              type="file"
              accept="image/*"
              className="mt-2 w-full"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white
                       rounded-xl py-4 font-bold"
          >
            Submit Complaint

          </button>

        </form>

        <p className="text-xs text-gray-400 mt-4 text-center">
          A complaint is a report requiring verification.
          It does not itself establish that a product is adulterated.
        </p>

      </div>

    </div>
  )
}

export default Complaint