import { useNavigate, useParams } from 'react-router-dom'

function BusinessDetails() {

  const navigate = useNavigate()
  const { id } = useParams()

  const businesses = {
    1: {
      name: 'ABC Dairy',
      location: 'Andheri, Mumbai',
      risk: 94,
      category: 'Dairy Products',
      inspections: 8,
      failedSamples: 3,
      complaints: 11,
      violations: 2
    },

    2: {
      name: 'XYZ Foods',
      location: 'Bandra, Mumbai',
      risk: 87,
      category: 'Packaged Foods',
      inspections: 6,
      failedSamples: 2,
      complaints: 8,
      violations: 3
    },

    3: {
      name: 'PQR Sweets',
      location: 'Dadar, Mumbai',
      risk: 78,
      category: 'Sweets',
      inspections: 5,
      failedSamples: 1,
      complaints: 5,
      violations: 1
    }
  }

  const business = businesses[id] || businesses[1]

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-6 lg:p-8">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate('/risk-map')}
          className="text-blue-400 mb-7"
        >
          ← Back to Risk Map
        </button>


        <div className="flex flex-col lg:flex-row
                        lg:items-center lg:justify-between gap-5">

          <div>

            <p className="text-blue-400 text-sm font-semibold">
              BUSINESS INTELLIGENCE
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {business.name}
            </h1>

            <p className="text-gray-400 mt-2">
              📍 {business.location}
            </p>

          </div>


          <div className="rounded-2xl border border-red-500/20
                          bg-red-500/10 px-6 py-4">

            <p className="text-xs text-red-300">
              CURRENT RISK
            </p>

            <p className="text-4xl font-bold text-red-400">
              {business.risk}
              <span className="text-lg text-gray-500">
                /100
              </span>
            </p>

          </div>

        </div>


        {/* Stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

          <Stat
            label="Previous Inspections"
            value={business.inspections}
          />

          <Stat
            label="Failed Samples"
            value={business.failedSamples}
          />

          <Stat
            label="Complaints"
            value={business.complaints}
          />

          <Stat
            label="Violations"
            value={business.violations}
          />

        </div>


        {/* Reason */}

        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          <div className="rounded-3xl border border-gray-800
                          bg-[#111A2E] p-6">

            <h2 className="text-xl font-bold">
              Why is this business high risk?
            </h2>

            <div className="mt-6 space-y-4">

              <Reason
                title="Previous failed samples"
                value={`${business.failedSamples} failed samples`}
              />

              <Reason
                title="Recent complaints"
                value={`${business.complaints} complaints`}
              />

              <Reason
                title="Previous violations"
                value={`${business.violations} recorded violations`}
              />

            </div>

          </div>


          <div className="rounded-3xl border border-gray-800
                          bg-[#111A2E] p-6">

            <h2 className="text-xl font-bold">
              Recommended Action
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              This business has multiple risk indicators.
              The system recommends prioritizing it for
              inspection and sample collection.
            </p>

            <button
              onClick={() => navigate('/inspection-queue')}
              className="mt-7 w-full rounded-xl bg-blue-600
                         hover:bg-blue-700 py-3.5
                         font-semibold transition"
            >
              Start Inspection →
            </button>

          </div>

        </div>


        <div className="mt-6 rounded-2xl border border-blue-500/10
                        bg-blue-500/5 p-4 text-sm text-gray-400">

          <span className="text-blue-400 font-semibold">
            Risk interpretation:
          </span>{' '}
          This score represents inspection priority based on
          available risk signals. It is not proof of adulteration.

        </div>

      </div>

    </div>
  )
}


function Stat({ label, value }) {

  return (

    <div className="rounded-2xl border border-gray-800
                    bg-[#111A2E] p-5">

      <p className="text-3xl font-bold">
        {value}
      </p>

      <p className="text-sm text-gray-400 mt-2">
        {label}
      </p>

    </div>

  )
}


function Reason({ title, value }) {

  return (

    <div className="flex items-center justify-between
                    border-b border-gray-800 pb-4">

      <div>
        <p className="font-medium">
          {title}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Risk signal
        </p>
      </div>

      <span className="text-red-400 font-semibold">
        {value}
      </span>

    </div>

  )
}


export default BusinessDetails