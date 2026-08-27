import { useNavigate } from 'react-router-dom'

function ComplaintTracker() {

  const navigate = useNavigate()

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
          Track Complaint
        </h1>

        <div className="mt-7 bg-white rounded-3xl
                        border border-gray-200 p-6">

          <p className="text-gray-500 text-sm">
            Complaint ID
          </p>

          <p className="text-xl font-bold">
            LC-2026-10482
          </p>

          <div className="mt-8 space-y-6">

            <Status
              title="Complaint Received"
              description="Your report has been submitted."
              active
            />

            <Status
              title="Verification"
              description="Authority verification is pending."
              active
            />

            <Status
              title="Inspection"
              description="Will be initiated if required."
            />

            <Status
              title="Resolved"
              description="Final action will be recorded here."
            />

          </div>

        </div>

      </div>

    </div>
  )
}

function Status({ title, description, active }) {

  return (
    <div className="flex gap-4">

      <div className={`w-4 h-4 rounded-full mt-1 ${
        active ? 'bg-blue-700' : 'bg-gray-300'
      }`} />

      <div>

        <p className="font-bold">
          {title}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>

      </div>

    </div>
  )
}

export default ComplaintTracker