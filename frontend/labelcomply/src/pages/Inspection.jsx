import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

function Inspection() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [batch, setBatch] = useState('')
  const [product, setProduct] = useState('Milk')
  const [sampleId] = useState(
    `FS-MUM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`
  )

  const [submitted, setSubmitted] = useState(false)

  const businessNames = {
    1: 'ABC Dairy',
    2: 'XYZ Foods',
    3: 'PQR Sweets'
  }

  const business = businessNames[id] || 'ABC Dairy'

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!batch) return

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-6 lg:p-8">

      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate(`/business/${id}`)}
          className="text-blue-400 mb-7"
        >
          ← Back to Business
        </button>

        <div className="mb-8">

          <p className="text-blue-400 text-sm font-semibold">
            FIELD INSPECTION
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Sample Collection
          </h1>

          <p className="text-gray-400 mt-2">
            Record inspection and sample information digitally.
          </p>

        </div>

        {!submitted ? (

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-800
                       bg-[#111A2E] p-7 space-y-7"
          >

            <div className="grid md:grid-cols-2 gap-5">

              <Info label="Business" value={business} />

              <Info label="Inspection Location" value="Mumbai" />

              <Info
                label="Date"
                value={new Date().toLocaleDateString('en-IN')}
              />

              <Info
                label="Time"
                value={new Date().toLocaleTimeString('en-IN')}
              />

            </div>

            <div className="border-t border-gray-800 pt-6">

              <h2 className="text-lg font-bold mb-5">
                Sample Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Product
                  </label>

                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full rounded-xl bg-[#0B1220]
                               border border-gray-700 px-4 py-3
                               outline-none"
                  >
                    <option>Milk</option>
                    <option>Turmeric Powder</option>
                    <option>Gulab Jamun</option>
                    <option>Packaged Food</option>
                  </select>

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Batch Number
                  </label>

                  <input
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="Enter batch number"
                    className="w-full rounded-xl bg-[#0B1220]
                               border border-gray-700 px-4 py-3
                               outline-none focus:border-blue-500"
                  />

                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-blue-500/5
                            border border-blue-500/20 p-5">

              <p className="text-sm text-gray-400">
                Generated Sample ID
              </p>

              <p className="text-xl font-bold text-blue-400 mt-1">
                {sampleId}
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="rounded-2xl border border-gray-800 p-5">
                📍
                <p className="font-semibold mt-2">
                  GPS Location
                </p>
                <p className="text-sm text-gray-500">
                  Location captured for inspection
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 p-5">
                📷
                <p className="font-semibold mt-2">
                  Sample Photo
                </p>
                <p className="text-sm text-gray-500">
                  Attach product/sample evidence
                </p>
              </div>

            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600
                         hover:bg-blue-700 py-4
                         font-semibold transition"
            >
              Record Sample Collection
            </button>

          </form>

        ) : (

          <div className="rounded-3xl border border-green-500/20
                          bg-[#111A2E] p-8 text-center">

            <div className="text-5xl">
              ✓
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Sample Successfully Recorded
            </h2>

            <p className="text-gray-400 mt-3">
              The sample has been assigned to the inspection record.
            </p>

            <div className="mt-6 rounded-2xl bg-[#0B1220] p-5">

              <p className="text-gray-500 text-sm">
                Sample ID
              </p>

              <p className="text-blue-400 font-bold text-xl mt-1">
                {sampleId}
              </p>

            </div>

            <button
              onClick={() => navigate('/lab-results')}
              className="mt-6 rounded-xl bg-blue-600
                         px-6 py-3 font-semibold"
            >
              View Laboratory Results →

            </button>

          </div>

        )}

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

export default Inspection