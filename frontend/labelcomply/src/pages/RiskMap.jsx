import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'

function RiskMap() {
  const navigate = useNavigate()

  const riskZones = [
    {
      id: 1,
      area: 'Andheri',
      position: [19.1197, 72.8468],
      risk: 94,
      level: 'Critical',

      businesses: [
        {
          id: 1,
          name: 'ABC Dairy',
          risk: 94,
          issue: 'Repeated failed milk samples',
          complaints: 18,
          failedSamples: 7
        },
        {
          id: 4,
          name: 'Fresh Milk Co.',
          risk: 91,
          issue: 'Adulteration complaints',
          complaints: 14,
          failedSamples: 5
        },
        {
          id: 5,
          name: 'Daily Foods',
          risk: 86,
          issue: 'Repeated laboratory failures',
          complaints: 11,
          failedSamples: 4
        },
        {
          id: 6,
          name: 'Pure Dairy',
          risk: 78,
          issue: 'Labelling and quality concerns',
          complaints: 8,
          failedSamples: 2
        }
      ]
    },

    {
      id: 2,
      area: 'Kurla',
      position: [19.0726, 72.8845],
      risk: 90,
      level: 'Critical',

      businesses: [
        {
          id: 2,
          name: 'XYZ Foods',
          risk: 92,
          issue: 'Repeated consumer complaints',
          complaints: 16,
          failedSamples: 6
        },
        {
          id: 7,
          name: 'Mumbai Snacks',
          risk: 89,
          issue: 'Failed food quality samples',
          complaints: 13,
          failedSamples: 5
        },
        {
          id: 8,
          name: 'Food Hub',
          risk: 76,
          issue: 'Hygiene-related complaints',
          complaints: 9,
          failedSamples: 2
        }
      ]
    },

    {
      id: 3,
      area: 'Bandra',
      position: [19.0607, 72.8362],
      risk: 67,
      level: 'Moderate',

      businesses: [
        {
          id: 9,
          name: 'Bandra Fresh Foods',
          risk: 72,
          issue: 'Increasing complaints',
          complaints: 8,
          failedSamples: 2
        },
        {
          id: 10,
          name: 'Coastal Foods',
          risk: 61,
          issue: 'Minor labelling concerns',
          complaints: 5,
          failedSamples: 1
        }
      ]
    },

    {
      id: 4,
      area: 'Dadar',
      position: [19.0178, 72.8478],
      risk: 58,
      level: 'Moderate',

      businesses: [
        {
          id: 11,
          name: 'PQR Sweets',
          risk: 78,
          issue: 'Previous sample failure',
          complaints: 5,
          failedSamples: 1
        },
        {
          id: 12,
          name: 'Dadar Foods',
          risk: 54,
          issue: 'Low-level consumer complaints',
          complaints: 4,
          failedSamples: 0
        }
      ]
    },

    {
      id: 5,
      area: 'Powai',
      position: [19.1176, 72.9060],
      risk: 28,
      level: 'Low',

      businesses: [
        {
          id: 13,
          name: 'Powai Fresh',
          risk: 28,
          issue: 'No major risk indicators',
          complaints: 3,
          failedSamples: 0
        }
      ]
    },

    {
      id: 6,
      area: 'Borivali',
      position: [19.2307, 72.8567],
      risk: 19,
      level: 'Low',

      businesses: [
        {
          id: 14,
          name: 'Borivali Foods',
          risk: 19,
          issue: 'No major risk indicators',
          complaints: 2,
          failedSamples: 0
        }
      ]
    }
  ]

  const getZoneColor = (level) => {
    if (level === 'Critical' || level === 'High') {
      return 'red'
    }

    if (level === 'Moderate') {
      return 'yellow'
    }

    return 'green'
  }

  const getRiskColor = (risk) => {
    if (risk >= 90) return 'text-red-600'
    if (risk >= 70) return 'text-orange-500'
    if (risk >= 40) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Back */}

        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-400 mb-6 hover:text-blue-300"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}

        <div className="mb-6">

          <p className="text-blue-400 text-sm font-semibold">
            GEOGRAPHIC RISK INTELLIGENCE
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Mumbai Risk Map
          </h1>

          <p className="text-gray-400 mt-2">
            Select a risk zone to identify businesses requiring
            inspection priority.
          </p>

        </div>

        {/* Legend */}

        <div className="flex flex-wrap gap-5 mb-5">

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-500"></span>
            <span className="text-sm text-gray-300">
              Critical / High
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
            <span className="text-sm text-gray-300">
              Moderate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-300">
              Low
            </span>
          </div>

        </div>

        {/* Map */}

        <div className="rounded-3xl overflow-hidden border border-gray-800">

          <MapContainer
            center={[19.0760, 72.8777]}
            zoom={11}
            style={{
              height: '600px',
              width: '100%'
            }}
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {riskZones.map((zone) => (

              <Circle
                key={zone.id}
                center={zone.position}
                radius={1800}
                pathOptions={{
                  color: getZoneColor(zone.level),
                  fillColor: getZoneColor(zone.level),
                  fillOpacity: 0.35,
                  weight: 2
                }}
              >

                <Popup>

                  <div className="text-gray-900 w-[300px]">

                    {/* Area heading */}

                    <h2 className="text-xl font-bold">
                      {zone.area}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Mumbai Risk Zone
                    </p>

                    <div className="mt-3 p-3 rounded-lg bg-gray-100">

                      <p className="font-bold">
                        Area Risk: {zone.risk}/100
                      </p>

                      <p className="text-sm">
                        Status: {zone.level}
                      </p>

                    </div>

                    {/* Business list */}

                    <h3 className="font-bold mt-4 mb-2">
                      Businesses requiring attention
                    </h3>

                    <div className="space-y-2">

                      {zone.businesses
                        .filter((business) => business.risk >= 70)
                        .map((business) => (

                          <div
                            key={business.id}
                            className="border border-gray-200 rounded-lg p-3"
                          >

                            <div className="flex justify-between gap-2">

                              <p className="font-semibold">
                                {business.name}
                              </p>

                              <span
                                className={`font-bold ${getRiskColor(
                                  business.risk
                                )}`}
                              >
                                {business.risk}
                              </span>

                            </div>

                            <p className="text-xs text-gray-600 mt-1">
                              {business.issue}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              Complaints: {business.complaints}
                              {' • '}
                              Failed Samples: {business.failedSamples}
                            </p>

                            <button
                              onClick={() =>
                                navigate(`/business/${business.id}`)
                              }
                              className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md text-xs font-semibold"
                            >
                              View Business Details →
                            </button>

                          </div>

                        ))}

                    </div>

                  </div>

                </Popup>

              </Circle>

            ))}

          </MapContainer>

        </div>

        {/* Information */}

        <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-gray-400">

          <span className="text-blue-400 font-semibold">
            Officer Guidance:
          </span>{' '}

          Select a high-risk zone to identify businesses that
          require immediate inspection based on aggregated
          complaints, failed samples and other risk indicators.

        </div>

      </div>

    </div>
  )
}

export default RiskMap