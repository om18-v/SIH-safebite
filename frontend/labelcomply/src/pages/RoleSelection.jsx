import { useNavigate } from 'react-router-dom'

function RoleSelection() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-4xl">

        <div className="text-center mb-12">

          <p className="text-blue-400 font-semibold tracking-widest text-sm">
            SAFEBITE
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold">
            Choose Your Portal
          </h1>

          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Access food safety intelligence based on your role.
          </p>

        </div>


        <div className="grid md:grid-cols-2 gap-6">

          {/* OFFICER */}

          <button
            onClick={() => navigate('/officer')}
            className="group text-left rounded-3xl border border-gray-700
                       bg-[#111A2E] p-8
                       hover:border-blue-500 hover:bg-[#14203A]
                       transition-all duration-300"
          >

            <div className="w-16 h-16 rounded-2xl bg-blue-500/10
                            flex items-center justify-center text-3xl mb-6">
              👮
            </div>

            <h2 className="text-2xl font-bold">
              Officer Portal
            </h2>

            <p className="mt-3 text-gray-400 leading-relaxed">
              Access risk intelligence, inspection priorities,
              complaints, laboratory results and enforcement insights.
            </p>

            <div className="mt-6 text-blue-400 font-semibold">
              Authorized access →
            </div>

          </button>


          {/* CITIZEN */}

          <button
            onClick={() => navigate('/citizen')}
            className="group text-left rounded-3xl border border-gray-700
                       bg-[#111A2E] p-8
                       hover:border-blue-500 hover:bg-[#14203A]
                       transition-all duration-300"
          >

            <div className="w-16 h-16 rounded-2xl bg-blue-500/10
                            flex items-center justify-center text-3xl mb-6">
              👤
            </div>

            <h2 className="text-2xl font-bold">
              Citizen Portal
            </h2>

            <p className="mt-3 text-gray-400 leading-relaxed">
              Scan product labels, report suspicious products,
              view official alerts and track complaints.
            </p>

            <div className="mt-6 text-blue-400 font-semibold">
              Continue as citizen →
            </div>

          </button>

        </div>


        <div className="mt-8 text-center text-sm text-gray-500">
          🔒 Officer access is restricted to authorized personnel.
        </div>

      </div>

    </div>
  )
}

export default RoleSelection