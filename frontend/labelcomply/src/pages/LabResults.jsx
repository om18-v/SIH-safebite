import { useNavigate } from 'react-router-dom'

function LabResults() {

  const navigate = useNavigate()

  const tests = [
    {
      name: 'Fat Content',
      result: 'PASS'
    },
    {
      name: 'Protein Content',
      result: 'PASS'
    },
    {
      name: 'Adulterant Screening',
      result: 'FAIL'
    },
    {
      name: 'Microbiological Test',
      result: 'PASS'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-6 lg:p-8">

      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-400 mb-7"
        >
          ← Back to Dashboard
        </button>

        <p className="text-blue-400 text-sm font-semibold">
          LABORATORY INTELLIGENCE
        </p>

        <h1 className="text-3xl font-bold mt-2">
          Laboratory Results
        </h1>

        <div className="mt-8 rounded-3xl border border-gray-800
                        bg-[#111A2E] p-7">

          <div className="grid md:grid-cols-3 gap-5">

            <Info label="Sample ID" value="FS-MUM-2026-00125" />

            <Info label="Business" value="ABC Dairy" />

            <Info label="Product" value="Milk" />

          </div>

          <div className="mt-8">

            <h2 className="text-xl font-bold mb-5">
              Test Results
            </h2>

            <div className="space-y-3">

              {tests.map((test) => (

                <div
                  key={test.name}
                  className="flex items-center justify-between
                             rounded-2xl border border-gray-800
                             p-5"
                >

                  <span>
                    {test.name}
                  </span>

                  <span
                    className={
                      test.result === 'PASS'
                        ? 'text-green-400 font-bold'
                        : 'text-red-400 font-bold'
                    }
                  >
                    {test.result === 'PASS' ? '✓ PASS' : '✕ FAIL'}
                  </span>

                </div>

              ))}

            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-red-500/10
                          border border-red-500/20 p-6">

            <p className="text-sm text-red-300">
              OVERALL RESULT
            </p>

            <h2 className="text-3xl font-bold text-red-400 mt-2">
              FAILED
            </h2>

            <p className="text-gray-400 mt-2">
              One or more laboratory tests require further investigation.
            </p>

          </div>

          <button
            onClick={() => navigate('/alerts')}
            className="mt-6 w-full rounded-xl bg-blue-600
                       hover:bg-blue-700 py-4 font-semibold"
          >
            Review Safety Alerts →

          </button>

        </div>

      </div>

    </div>
  )
}

function Info({ label, value }) {

  return (
    <div className="rounded-2xl border border-gray-800 p-5">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold mt-1">
        {value}
      </p>

    </div>
  )
}

export default LabResults