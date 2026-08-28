import { useNavigate } from 'react-router-dom'

function OfficerDashboard({ officer, onLogout }) {

  const navigate = useNavigate()

  const inspections = [
    {
      business: 'ABC Dairy',
      location: 'Andheri, Mumbai',
      risk: 94,
      level: 'Critical',
      reason: '3 failed samples • 11 recent complaints'
    },
    {
      business: 'XYZ Foods',
      location: 'Bandra, Mumbai',
      risk: 87,
      level: 'High',
      reason: 'Repeated violations • complaint spike'
    },
    {
      business: 'PQR Sweets',
      location: 'Dadar, Mumbai',
      risk: 78,
      level: 'High',
      reason: 'Previous failed sample'
    }
  ]

  const riskCards = [
    {
      title: 'Critical',
      value: '17',
      icon: '🔴'
    },
    {
      title: 'High',
      value: '43',
      icon: '🟠'
    },
    {
      title: 'Medium',
      value: '126',
      icon: '🟡'
    },
    {
      title: 'Low',
      value: '982',
      icon: '🟢'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex">

      {/* SIDEBAR */}

      <aside className="hidden lg:flex w-64 border-r border-gray-800 bg-[#0D1628] flex-col">

        <div className="p-6 border-b border-gray-800">

          <div className="text-xl font-bold">
            SAFE<span className="text-blue-500">BITE</span>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Food Safety Intelligence
          </p>

        </div>

        <nav className="flex-1 p-4">

          <SidebarButton
            icon="▦"
            label="Overview"
            active={true}
            onClick={() => navigate('/dashboard')}
          />

          <SidebarButton
            icon="◉"
            label="Risk Map"
            onClick={() => navigate('/risk-map')}
          />

          <SidebarButton
            icon="✓"
            label="Inspection Queue"
            onClick={() => navigate('/inspection-queue')}
          />

          <SidebarButton
            icon="⚠"
            label="Alerts"
            onClick={() => navigate('/alerts')}
          />

          <SidebarButton
            icon="▤"
            label="Businesses"
            onClick={() => navigate('/businesses')}
          />

          <SidebarButton
            icon="⌁"
            label="Supply Chain"
            onClick={() => navigate('/supply-chain')}
          />

          <SidebarButton
            icon="🧪"
            label="Lab Results"
            onClick={() => navigate('/lab-results')}
          />

        </nav>

        {/* OFFICER */}

        <div className="p-4 border-t border-gray-800">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              👮
            </div>

            <div className="min-w-0">

              <p className="text-sm font-semibold truncate">
                {officer?.name || 'Officer'}
              </p>

              <p className="text-xs text-gray-500">
                {officer?.designation || 'Food Safety Officer'}
              </p>

            </div>

          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-4 w-full text-left text-sm text-gray-400 hover:text-red-400 transition"
          >
            ← Logout
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <main className="flex-1 overflow-auto">

        {/* TOP BAR */}

        <header className="h-20 border-b border-gray-800 flex items-center justify-between px-6 lg:px-8">

          <div>

            <p className="text-xs text-blue-400 font-semibold">
              MAHARASHTRA FOOD SAFETY COMMAND CENTER
            </p>

            <h1 className="text-xl font-bold mt-1">
              Good evening, Officer
            </h1>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden md:block text-right">

              <p className="text-sm font-medium">
                {officer?.region || 'Mumbai'}
              </p>

              <p className="text-xs text-gray-500">
                Officer ID: {officer?.id || 'FSO-001'}
              </p>

            </div>

            <button
              onClick={() => navigate('/alerts')}
              className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center hover:bg-blue-500/20 transition"
            >
              🔔
            </button>

          </div>

        </header>


        {/* CONTENT */}

        <div className="p-6 lg:p-8 max-w-7xl mx-auto">

          {/* TITLE */}

          <div className="mb-7">

            <p className="text-blue-400 text-sm font-semibold">
              OFFICER COMMAND CENTER
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Food Safety Risk Overview
            </h2>

            <p className="text-gray-400 mt-2">
              AI-assisted prioritization of inspection activity.
            </p>

          </div>


          {/* RISK CARDS */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {riskCards.map((card) => (

              <div
                key={card.title}
                className="rounded-2xl border border-gray-800 bg-[#111A2E] p-5"
              >

                <div className="flex justify-between">

                  <span className="text-2xl">
                    {card.icon}
                  </span>

                  <span className="text-xs text-gray-500">
                    Risk
                  </span>

                </div>

                <p className="text-3xl font-bold mt-4">
                  {card.value}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {card.title}
                </p>

              </div>

            ))}

          </div>


          {/* QUICK ACCESS */}

          <div className="mt-6">

            <h3 className="font-bold text-lg mb-4">
              Command Center
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

              <QuickCard
                icon="🗺️"
                title="Risk Map"
                onClick={() => navigate('/risk-map')}
              />

              <QuickCard
                icon="📋"
                title="Inspections"
                onClick={() => navigate('/inspection-queue')}
              />

              <QuickCard
                icon="🏢"
                title="Businesses"
                onClick={() => navigate('/businesses')}
              />

              <QuickCard
                icon="🚨"
                title="Alerts"
                onClick={() => navigate('/alerts')}
              />

              <QuickCard
                icon="🧪"
                title="Lab Results"
                onClick={() => navigate('/lab-results')}
              />

              <QuickCard
                icon="🔗"
                title="Supply Chain"
                onClick={() => navigate('/supply-chain')}
              />

            </div>

          </div>


          {/* MAP PREVIEW */}

          <div className="grid lg:grid-cols-3 gap-6 mt-6">

            <div className="lg:col-span-2 rounded-3xl border border-gray-800 bg-[#111A2E]">

              <div className="p-5 flex items-center justify-between">

                <div>

                  <h3 className="font-bold">
                    Risk Map
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    High-risk indicators by location
                  </p>

                </div>

                <button
                  onClick={() => navigate('/risk-map')}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  View full map →
                </button>

              </div>

              <div className="m-4 rounded-2xl bg-[#0B1220] p-6">

                <div className="grid grid-cols-3 gap-6 text-center">

                  <Location
                    name="Andheri"
                    risk="94"
                    icon="🔴"
                  />

                  <Location
                    name="Bandra"
                    risk="87"
                    icon="🟠"
                  />

                  <Location
                    name="Dadar"
                    risk="78"
                    icon="🟠"
                  />

                  <Location
                    name="Borivali"
                    risk="41"
                    icon="🟡"
                  />

                  <Location
                    name="Thane"
                    risk="22"
                    icon="🟢"
                  />

                  <Location
                    name="Navi Mumbai"
                    risk="15"
                    icon="🟢"
                  />

                </div>

              </div>

              <div className="px-5 pb-5 text-xs text-gray-500">
                ⚠ Risk indicators represent inspection priority, not confirmed adulteration.
              </div>

            </div>


            {/* EARLY WARNING */}

            <div className="rounded-3xl border border-gray-800 bg-[#111A2E] p-5">

              <div className="flex items-center justify-between">

                <h3 className="font-bold">
                  Early Warning
                </h3>

                <span className="text-red-400 text-xs font-semibold">
                  ● LIVE
                </span>

              </div>

              <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-4">

                <p className="text-sm font-semibold text-red-300">
                  🚨 Complaint spike detected
                </p>

                <p className="text-xs text-gray-400 mt-3">
                  Milk-related complaints increased significantly over the last 4 weeks.
                </p>

                <div className="flex items-end gap-2 mt-5 h-16">

                  <div className="w-1/4 h-2 bg-gray-700 rounded" />
                  <div className="w-1/4 h-4 bg-gray-600 rounded" />
                  <div className="w-1/4 h-8 bg-gray-500 rounded" />
                  <div className="w-1/4 h-14 bg-red-500 rounded" />

                </div>

                <p className="text-xs text-gray-500 mt-3">
                  2 → 5 → 14 → 27 complaints
                </p>

              </div>

              <button
                onClick={() => navigate('/alerts')}
                className="mt-5 text-sm text-blue-400"
              >
                View all alerts →
              </button>

            </div>

          </div>


          {/* RECOMMENDED INSPECTIONS */}

          <div className="mt-6 rounded-3xl border border-gray-800 bg-[#111A2E] overflow-hidden">

            <div className="p-5 flex justify-between">

              <div>

                <h3 className="font-bold">
                  Today's Recommended Inspections
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Prioritized using risk indicators
                </p>

              </div>

              <button
                onClick={() => navigate('/inspection-queue')}
                className="text-sm text-blue-400"
              >
                View all →
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="border-y border-gray-800">

                  <tr className="text-xs text-gray-500">

                    <th className="px-5 py-3">
                      Priority
                    </th>

                    <th className="px-5 py-3">
                      Business
                    </th>

                    <th className="px-5 py-3">
                      Location
                    </th>

                    <th className="px-5 py-3">
                      Risk
                    </th>

                    <th className="px-5 py-3">
                      Reason
                    </th>

                    <th className="px-5 py-3">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {inspections.map((item, index) => (

                    <tr
                      key={item.business}
                      className="border-b border-gray-800 last:border-none hover:bg-white/[0.02]"
                    >

                      <td className="px-5 py-4 font-bold">
                        #{index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          {item.business}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-400">
                        {item.location}
                      </td>

                      <td className="px-5 py-4">

                        <span className="rounded-full px-3 py-1 text-xs font-bold bg-red-500/10 text-red-400">
                          {item.risk}/100
                        </span>

                      </td>

                      <td className="px-5 py-4 text-sm text-gray-400">
                        {item.reason}
                      </td>

                      <td className="px-5 py-4">

                        <button
                          onClick={() =>
                            navigate(`/business/${index + 1}`)
                          }
                          className="text-blue-400 text-sm hover:text-blue-300"
                        >
                          View →
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>


          {/* EXPLANATION */}

          <div className="mt-6 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4 text-sm text-gray-400">

            <span className="text-blue-400 font-semibold">
              AI Risk Intelligence:
            </span>{' '}

            Risk scores prioritize inspection activity using historical
            inspections, complaints, violations and other available
            indicators. They do not constitute confirmation of adulteration
            or a legal violation.

          </div>

        </div>

      </main>

    </div>
  )
}


/* SIDEBAR BUTTON */

function SidebarButton({ icon, label, active, onClick }) {

  return (

    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm transition ${
        active
          ? 'bg-blue-600/10 text-blue-400'
          : 'text-gray-400 hover:bg-white/[0.03] hover:text-white'
      }`}
    >

      <span className="w-5 text-center">
        {icon}
      </span>

      {label}

    </button>

  )
}


/* QUICK CARD */

function QuickCard({ icon, title, onClick }) {

  return (

    <button
      onClick={onClick}
      className="rounded-2xl border border-gray-800 bg-[#111A2E] p-4 text-center hover:border-blue-500/40 hover:bg-[#15203A] transition"
    >

      <div className="text-2xl">
        {icon}
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {title}
      </p>

    </button>

  )
}


/* LOCATION */

function Location({ name, risk, icon }) {

  return (

    <div className="rounded-xl border border-gray-800 bg-[#111A2E] p-4">

      <div className="text-2xl">
        {icon}
      </div>

      <p className="text-sm font-semibold mt-2">
        {name}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Risk {risk}
      </p>

    </div>

  )
}


export default OfficerDashboard
