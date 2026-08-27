import { useNavigate } from 'react-router-dom'

function ComplianceResult() {

  const navigate = useNavigate()

  const declarations = [
    ['MRP', '₹120', true],
    ['Net Quantity', '500 g', true],
    ['Manufacturing Date', '20 Aug 2026', true],
    ['Expiry Date', '20 Aug 2027', true],
    ['FSSAI License', '12345678901234', true],
    ['Batch Number', 'T2408', true]
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate('/citizen')}
          className="text-blue-700"
        >
          ← Citizen Home
        </button>

        <div className="mt-7">

          <p className="text-blue-700 font-semibold text-sm">
            POINT-OF-PURCHASE VERIFICATION
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Compliance Result
          </h1>

        </div>

        <div className="mt-7 rounded-3xl bg-white
                        border border-gray-200 p-6">

          <div className="flex justify-between items-start">

            <div>
              <p className="text-gray-500 text-sm">
                Product
              </p>

              <h2 className="text-2xl font-bold">
                XYZ Turmeric Powder
              </h2>

              <p className="text-gray-500 mt-1">
                Manufacturer: ABC Foods
              </p>
            </div>

            <div className="rounded-full bg-green-100
                            text-green-700 px-4 py-2
                            font-bold">
              COMPLIANT
            </div>

          </div>

          <div className="mt-7">

            <h3 className="font-bold text-lg mb-4">
              Mandatory Declarations
            </h3>

            <div className="space-y-3">

              {declarations.map(([name, value, valid]) => (

                <div
                  key={name}
                  className="flex justify-between
                             border-b border-gray-100 pb-3"
                >

                  <span className="text-gray-600">
                    {name}
                  </span>

                  <span className="font-semibold">
                    {valid ? '✓ ' : '✕ '}
                    {value}
                  </span>

                </div>

              ))}

            </div>

          </div>

          <div className="mt-7 rounded-2xl bg-blue-50 p-5">

            <h3 className="font-bold text-blue-800">
              What does this mean?
            </h3>

            <p className="text-blue-700 text-sm mt-2">
              The visible label information appears to satisfy
              the checks performed by this demo system.
            </p>

          </div>

          <button
            onClick={() => navigate('/citizen/complaint')}
            className="mt-6 w-full rounded-xl
                       border border-red-200
                       text-red-600 py-3 font-semibold"
          >
            Report a Problem

          </button>

        </div>

      </div>

    </div>
  )
}

export default ComplianceResult