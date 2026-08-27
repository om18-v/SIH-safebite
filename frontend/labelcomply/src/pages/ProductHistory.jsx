import { useNavigate } from 'react-router-dom'

function ProductHistory() {

  const navigate = useNavigate()

  const history = [
    {
      id: 1,
      product: 'XYZ Turmeric Powder',
      date: '27 Aug 2026',
      status: 'Review Required',
      type: 'Warning'
    },
    {
      id: 2,
      product: 'ABC Milk',
      date: '25 Aug 2026',
      status: 'Compliant',
      type: 'Passed'
    },
    {
      id: 3,
      product: 'Fresh Biscuits',
      date: '21 Aug 2026',
      status: 'Review Required',
      type: 'Warning'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">

      <div className="max-w-5xl mx-auto">

        {/* BACK */}

        <button
          onClick={() => navigate('/citizen')}
          className="text-blue-700 font-medium mb-7"
        >
          ← Back to Citizen Portal
        </button>


        {/* HEADER */}

        <div>

          <p className="text-blue-700 text-sm font-bold">
            CITIZEN RECORDS
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Product History
          </h1>

          <p className="text-gray-500 mt-2">
            Review products you have previously scanned.
          </p>

        </div>


        {/* HISTORY */}

        <div className="mt-8 space-y-4">

          {history.map((item) => (

            <div
              key={item.id}
              className="rounded-2xl border border-gray-200
                         p-5 flex flex-col md:flex-row
                         md:items-center md:justify-between gap-4
                         hover:border-blue-300 transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-50
                                flex items-center justify-center text-2xl">
                  📦
                </div>

                <div>

                  <h3 className="font-bold">
                    {item.product}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Scanned on {item.date}
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.type === 'Passed'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}
                >
                  {item.status}
                </span>

                <button
                  onClick={() => navigate('/citizen/result')}
                  className="text-blue-700 text-sm font-semibold"
                >
                  View Result →
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* INFO */}

        <div className="mt-7 rounded-2xl bg-blue-50
                        border border-blue-100 p-5">

          <p className="text-sm text-blue-800">

            Your scan history helps you quickly revisit
            previous product compliance results.

          </p>

        </div>

      </div>

    </div>
  )
}

export default ProductHistory