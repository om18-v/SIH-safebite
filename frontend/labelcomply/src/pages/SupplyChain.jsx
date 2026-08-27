import { useNavigate } from 'react-router-dom'

function SupplyChain() {

  const navigate = useNavigate()

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
          SUPPLY CHAIN INTELLIGENCE
        </p>

        <h1 className="text-3xl font-bold mt-2">
          Common-Source Investigation
        </h1>

        <p className="text-gray-400 mt-2">
          Identify connections between manufacturers,
          distributors and businesses with similar risk signals.
        </p>

        <div className="mt-10 rounded-3xl border border-gray-800
                        bg-[#111A2E] p-8">

          <div className="flex flex-col items-center">

            <Node
              title="ABC Foods"
              subtitle="Manufacturer"
              risk="Source under investigation"
              type="manufacturer"
            />

            <div className="h-12 w-px bg-gray-700" />

            <Node
              title="Distributor X"
              subtitle="Common Distributor"
              risk="3 connected businesses"
              type="distributor"
            />

            <div className="h-12 w-px bg-gray-700" />

            <div className="grid md:grid-cols-3 gap-6 w-full">

              <Shop
                name="ABC Dairy"
                location="Andheri"
                risk="94"
              />

              <Shop
                name="Fresh Milk Store"
                location="Bandra"
                risk="89"
              />

              <Shop
                name="City Dairy"
                location="Dadar"
                risk="86"
              />

            </div>

          </div>

        </div>

        <div className="mt-6 rounded-2xl border border-orange-500/20
                        bg-orange-500/5 p-5">

          <p className="font-semibold text-orange-400">
            ⚠ Potential Common-Source Cluster
          </p>

          <p className="text-gray-400 text-sm mt-2">
            Multiple businesses connected to the same distributor
            show elevated risk indicators. This is an investigation
            signal, not proof of a violation.
          </p>

        </div>

      </div>

    </div>
  )
}

function Node({ title, subtitle, risk }) {

  return (
    <div className="w-full max-w-sm rounded-2xl border
                    border-blue-500/30 bg-blue-500/5 p-5 text-center">

      <p className="text-xl font-bold">
        {title}
      </p>

      <p className="text-blue-400 text-sm mt-1">
        {subtitle}
      </p>

      <p className="text-gray-500 text-sm mt-3">
        {risk}
      </p>

    </div>
  )
}

function Shop({ name, location, risk }) {

  return (
    <div className="rounded-2xl border border-gray-800
                    bg-[#0B1220] p-5 text-center">

      <div className="text-2xl">
        🏪
      </div>

      <p className="font-bold mt-3">
        {name}
      </p>

      <p className="text-gray-500 text-sm">
        {location}
      </p>

      <p className="text-red-400 font-bold text-xl mt-3">
        {risk}/100
      </p>

      <p className="text-xs text-gray-500">
        Risk score
      </p>

    </div>
  )
}

export default SupplyChain