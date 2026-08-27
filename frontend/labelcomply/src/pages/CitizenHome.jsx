import { useNavigate } from 'react-router-dom'

function CitizenHome() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#050B18] text-white overflow-hidden relative">

      {/* BACKGROUND GLOW */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute w-[500px] h-[500px] bg-blue-600/20
                        rounded-full blur-[140px] -top-40 -left-40" />

        <div className="absolute w-[500px] h-[500px] bg-purple-600/20
                        rounded-full blur-[140px] top-40 right-[-180px]" />

        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10
                        rounded-full blur-[120px] bottom-[-150px] left-1/3" />

      </div>


      {/* CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-6 lg:px-10">

        {/* HEADER */}

        <header className="flex items-center justify-between mb-8">

          <div>

            <p className="text-sm tracking-[0.25em] text-cyan-400 font-semibold">
              SAFEBITE
            </p>

            <h1 className="text-2xl lg:text-3xl font-bold mt-1">
              Citizen Portal
            </h1>

          </div>


          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition"
          >
            Exit ×
          </button>

        </header>


        {/* HERO */}

        <section
          className="relative overflow-hidden rounded-[32px]
                     border border-blue-400/30
                     bg-gradient-to-br from-blue-600/40
                     via-[#18285B]/80 to-purple-700/30
                     backdrop-blur-xl
                     shadow-[0_0_60px_rgba(37,99,235,0.15)]
                     p-7 md:p-10 lg:p-14"
        >

          {/* Decorative glow */}

          <div className="absolute w-72 h-72 bg-purple-500/20
                          rounded-full blur-3xl -top-32 right-10" />

          <div className="absolute w-64 h-64 bg-cyan-400/10
                          rounded-full blur-3xl bottom-[-120px] left-20" />


          <div className="relative max-w-3xl mx-auto text-center">

            <p className="text-cyan-300 text-sm font-semibold tracking-[0.25em]">
              VERIFY BEFORE YOU BUY
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl
                           font-bold leading-tight mt-4">
              Check a product
              <br />
              before purchasing
            </h2>

            <p className="text-gray-300 mt-5 text-base md:text-lg">
              Scan the product label to check declarations,
              warnings and compliance information.
            </p>


            {/* SCAN BUTTON */}

            <button
              onClick={() => navigate('/citizen/scan')}
              className="mt-8 group relative
                         rounded-2xl border border-cyan-300/70
                         bg-white/10 backdrop-blur-md
                         px-8 py-4
                         font-bold text-lg
                         shadow-[0_0_25px_rgba(34,211,238,0.25)]
                         hover:bg-white/20
                         hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]
                         transition"
            >

              <span className="flex items-center gap-3">
                📷
                Scan Product
                <span className="group-hover:translate-x-1 transition">
                  →
                </span>
              </span>

            </button>

          </div>

        </section>


        {/* FEATURE CARDS */}

        <section className="grid grid-cols-1 sm:grid-cols-2
                            lg:grid-cols-4 gap-5 mt-7">

          <CitizenCard
            icon="🔎"
            title="Product History"
            text="View your previously scanned products and results."
            onClick={() => navigate('/citizen/history')}
          />

          <CitizenCard
            icon="🚨"
            title="Official Alerts"
            text="Stay updated with important food safety alerts."
            onClick={() => navigate('/citizen/alerts')}
          />

          <CitizenCard
            icon="📋"
            title="Track Complaint"
            text="Check the status of complaints you have submitted."
            onClick={() => navigate('/citizen/track')}
          />

          <CitizenCard
            icon="🌐"
            title="Language & Voice"
            text="Choose Hindi, Marathi or English and listen to your AI result."
            onClick={() => navigate('/citizen/language')}
          />

        </section>


        {/* QUICK SCAN */}

        <div className="mt-7 grid lg:grid-cols-3 gap-5">

          <div className="lg:col-span-2 rounded-3xl
                          border border-white/10
                          bg-white/[0.04]
                          backdrop-blur-xl
                          p-6">

            <p className="text-xs tracking-widest text-cyan-400 font-semibold">
              SMART VERIFICATION
            </p>

            <h3 className="text-xl font-bold mt-2">
              One scan. Multiple safety checks.
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">

              <MiniCheck icon="✓" text="Label" />
              <MiniCheck icon="₹" text="MRP" />
              <MiniCheck icon="🧪" text="Ingredients" />
              <MiniCheck icon="⚖" text="Quantity" />

            </div>

          </div>


          <div className="rounded-3xl
                          border border-cyan-400/10
                          bg-cyan-400/[0.04]
                          backdrop-blur-xl
                          p-6">

            <p className="text-xs text-cyan-400 font-semibold">
              AI ASSISTED
            </p>

            <h3 className="text-xl font-bold mt-2">
              Understand your result
            </h3>

            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Get a simple explanation of product compliance
              instead of reading complicated regulations.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}


/* CITIZEN CARD */

function CitizenCard({ icon, title, text, onClick }) {

  return (

    <button
      onClick={onClick}
      className="group text-left rounded-[28px]
                 border border-white/10
                 bg-white/[0.055]
                 backdrop-blur-xl
                 p-6
                 min-h-[210px]
                 hover:border-cyan-400/40
                 hover:bg-white/[0.09]
                 hover:-translate-y-1
                 hover:shadow-[0_15px_50px_rgba(0,0,0,0.3)]
                 transition-all duration-300"
    >

      <div className="w-14 h-14 rounded-2xl
                      bg-gradient-to-br from-blue-400/20 to-purple-500/20
                      border border-white/10
                      flex items-center justify-center
                      text-3xl
                      group-hover:scale-110 transition">

        {icon}

      </div>

      <h3 className="font-bold text-lg mt-5">
        {title}
      </h3>

      <p className="text-sm text-gray-400 mt-2 leading-relaxed">
        {text}
      </p>

      <p className="text-xs text-cyan-400 mt-4">
        Open →
      </p>

    </button>
  )
}


/* MINI CHECK */

function MiniCheck({ icon, text }) {

  return (

    <div className="rounded-xl border border-white/10
                    bg-black/20 p-3 text-center">

      <div className="text-lg">
        {icon}
      </div>

      <p className="text-xs text-gray-400 mt-1">
        {text}
      </p>

    </div>

  )
}


export default CitizenHome