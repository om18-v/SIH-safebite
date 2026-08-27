import { useNavigate } from 'react-router-dom'

function OfficialAlerts() {

  const navigate = useNavigate()

  const alerts = [
    {
      product: 'Milk Products',
      region: 'Mumbai',
      message: 'Increased food-safety monitoring'
    },
    {
      product: 'Packaged Foods',
      region: 'Thane',
      message: 'Enhanced inspection activity'
    }
  ]

  return (
    <div className="min-h-screen bg-white p-6">

      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate('/citizen')}
          className="text-blue-700"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mt-8">
          Official Alerts
        </h1>

        <p className="text-gray-500 mt-2">
          Public safety notifications and official information.
        </p>

        <div className="mt-7 space-y-4">

          {alerts.map((alert, index) => (

            <div
              key={index}
              className="border border-orange-200
                         bg-orange-50 rounded-2xl p-5"
            >

              <p className="text-orange-700 font-bold">
                ⚠ {alert.product}
              </p>

              <p className="font-semibold mt-2">
                {alert.region}
              </p>

              <p className="text-gray-600 text-sm mt-2">
                {alert.message}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default OfficialAlerts