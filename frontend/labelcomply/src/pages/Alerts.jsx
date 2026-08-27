import { useNavigate } from 'react-router-dom'

function Alerts() {

  const navigate = useNavigate()

  const alerts = [
    {
      title: 'Milk Complaint Spike',
      region: 'Mumbai',
      affected: '18 businesses',
      confidence: 'High',
      level: 'Critical'
    },
    {
      title: 'Packaged Food Violations',
      region: 'Thane',
      affected: '9 businesses',
      confidence: 'Medium',
      level: 'High'
    },
    {
      title: 'Sweet Product Complaints',
      region: 'Dadar',
      affected: '6 businesses',
      confidence: 'Medium',
      level: 'Medium'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-6 lg:p-8">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-400 mb-7"
        >
          ← Back to Dashboard
        </button>

        <p className="text-blue-400 text-sm font-semibold">
          EARLY WARNING SYSTEM
        </p>

        <h1 className="text-3xl font-bold mt-2">
          Food Safety Alerts
        </h1>

        <p className="text-gray-400 mt-2">
          Emerging patterns detected from complaints,
          inspections and laboratory results.
        </p>

        <div className="mt-8 space-y-5">

          {alerts.map((alert, index) => (

            <div
              key={index}
              className="rounded-3xl border border-gray-800
                         bg-[#111A2E] p-6"
            >

              <div className="flex flex-col md:flex-row
                              md:items-center md:justify-between gap-5">

                <div>

                  <div className="flex items-center gap-3">

                    <span className="text-2xl">
                      🚨
                    </span>

                    <h2 className="text-xl font-bold">
                      {alert.title}
                    </h2>

                  </div>

                  <p className="text-gray-400 mt-3">
                    Region: {alert.region}
                  </p>

                  <p className="text-gray-400">
                    Potentially affected: {alert.affected}
                  </p>

                </div>

                <div className="text-left md:text-right">

                  <span className="inline-block rounded-full
                                   bg-red-500/10 text-red-400
                                   px-4 py-1 text-sm font-semibold">
                    {alert.level}
                  </span>

                  <p className="text-gray-500 text-sm mt-3">
                    Confidence: {alert.confidence}
                  </p>

                </div>

              </div>

              <div className="mt-6 border-t border-gray-800 pt-5">

                <p className="text-sm text-gray-400">
                  <span className="text-blue-400 font-semibold">
                    Recommended action:
                  </span>{' '}
                  Inspect high-risk locations, collect samples
                  and investigate possible common suppliers.
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Alerts