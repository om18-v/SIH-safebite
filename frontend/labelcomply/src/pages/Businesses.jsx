import { useNavigate } from 'react-router-dom'

function Businesses() {

  const navigate = useNavigate()

  const businesses = [
    {
      id: 1,
      name: 'ABC Dairy',
      location: 'Andheri, Mumbai',
      category: 'Dairy Products',
      risk: 94,
      level: 'Critical',
      complaints: 11,
      violations: 2
    },
    {
      id: 2,
      name: 'XYZ Foods',
      location: 'Bandra, Mumbai',
      category: 'Packaged Foods',
      risk: 87,
      level: 'High',
      complaints: 8,
      violations: 3
    },
    {
      id: 3,
      name: 'PQR Sweets',
      location: 'Dadar, Mumbai',
      category: 'Sweets',
      risk: 78,
      level: 'High',
      complaints: 5,
      violations: 1
    }
  ]

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">

        {/* BACK */}

        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-400 hover:text-blue-300 mb-6"
        >
          ← Back to Dashboard
        </button>


        {/* HEADER */}

        <div className="mb-8">

          <p className="text-blue-400 text-sm font-semibold">
            BUSINESS INTELLIGENCE
          </p>

          <h1 className="text-3xl lg:text-4xl font-bold mt-2">
            Businesses
          </h1>

          <p className="text-gray-400 mt-2">
            View businesses and their current food safety risk indicators.
          </p>

        </div>


        {/* BUSINESS CARDS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {businesses.map((business) => (

            <div
              key={business.id}
              className="rounded-3xl border border-gray-800
                         bg-[#111A2E] p-6
                         hover:border-blue-500/40
                         transition"
            >

              {/* TOP */}

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    {business.name}
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    📍 {business.location}
                  </p>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    business.level === 'Critical'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-orange-500/10 text-orange-400'
                  }`}
                >
                  {business.level}
                </span>

              </div>


              {/* CATEGORY */}

              <p className="text-sm text-gray-500 mt-5">
                {business.category}
              </p>


              {/* RISK */}

              <div className="mt-5 rounded-2xl bg-[#0B1220] p-4">

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-xs text-gray-500">
                      CURRENT RISK
                    </p>

                    <p className="text-3xl font-bold mt-1">
                      {business.risk}
                      <span className="text-sm text-gray-500">
                        /100
                      </span>
                    </p>

                  </div>

                  <div
                    className={`w-3 h-3 rounded-full ${
                      business.risk >= 90
                        ? 'bg-red-500'
                        : 'bg-orange-500'
                    }`}
                  />

                </div>

              </div>


              {/* STATS */}

              <div className="grid grid-cols-2 gap-3 mt-4">

                <div className="rounded-xl bg-[#0B1220] p-3">

                  <p className="text-xl font-bold">
                    {business.complaints}
                  </p>

                  <p className="text-xs text-gray-500">
                    Complaints
                  </p>

                </div>

                <div className="rounded-xl bg-[#0B1220] p-3">

                  <p className="text-xl font-bold">
                    {business.violations}
                  </p>

                  <p className="text-xs text-gray-500">
                    Violations
                  </p>

                </div>

              </div>


              {/* VIEW */}

              <button
                onClick={() =>
                  navigate(`/business/${business.id}`)
                }
                className="mt-5 w-full rounded-xl
                           bg-blue-600 hover:bg-blue-700
                           py-3 font-semibold transition"
              >
                View Business Details →
              </button>

            </div>

          ))}

        </div>


        {/* NOTE */}

        <div className="mt-6 rounded-2xl border border-blue-500/10
                        bg-blue-500/5 p-4 text-sm text-gray-400">

          <span className="text-blue-400 font-semibold">
            Risk interpretation:
          </span>{' '}

          Risk scores represent inspection priority based on
          available risk indicators. They do not confirm
          adulteration or a legal violation.

        </div>

      </div>

    </div>
  )
}

export default Businesses