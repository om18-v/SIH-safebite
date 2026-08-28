import { useNavigate, useLocation } from 'react-router-dom'

function ComplianceResult() {
  const navigate = useNavigate()
  const location = useLocation()

  // Grab the response data returned by the backend (or fallback safely if accessed directly)
  const result = location.state?.resultData || {}

  // Extract real backend response properties (falling back gracefully if a key is missing)
  const productName = result.product_name || result.ocr_data?.product_name || 'Scanned Product'
  const manufacturer = result.manufacturer || result.ocr_data?.manufacturer || 'Unknown Manufacturer'
  const status = result.status || (result.compliance_score >= 80 ? 'COMPLIANT' : 'NON_COMPLIANT')
  
  // Extract OCR values or build dynamic declarations list from backend checks
  const declarations = [
    ['MRP', result.ocr_data?.mrp || result.mrp || 'Not Found', Boolean(result.ocr_data?.mrp)],
    ['Net Quantity', result.ocr_data?.net_quantity || result.net_quantity || 'Not Found', Boolean(result.ocr_data?.net_quantity)],
    ['Manufacturing Date', result.ocr_data?.mfg_date || result.mfg_date || 'Not Found', Boolean(result.ocr_data?.mfg_date)],
    ['Expiry Date', result.ocr_data?.expiry_date || result.expiry_date || 'Not Found', Boolean(result.ocr_data?.expiry_date)],
    ['FSSAI License', result.ocr_data?.fssai_lic_no || result.fssai_lic_no || 'Not Found', Boolean(result.ocr_data?.fssai_lic_no)],
    ['Batch Number', result.ocr_data?.batch_number || result.batch_number || 'Not Found', Boolean(result.ocr_data?.batch_number)]
  ]

  const isCompliant = status === 'COMPLIANT'

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/citizen')}
          className="text-blue-700 font-medium"
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

        <div className="mt-7 rounded-3xl bg-white border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">
                Product
              </p>

              <h2 className="text-2xl font-bold">
                {productName}
              </h2>

              <p className="text-gray-500 mt-1">
                Manufacturer: {manufacturer}
              </p>
            </div>

            <div className={`rounded-full px-4 py-2 font-bold ${
              isCompliant 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {status}
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
                  className="flex justify-between border-b border-gray-100 pb-3"
                >
                  <span className="text-gray-600">
                    {name}
                  </span>

                  <span className={`font-semibold ${valid ? 'text-gray-900' : 'text-red-500'}`}>
                    {valid ? '✓ ' : '✕ '}
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-7 rounded-2xl p-5 ${isCompliant ? 'bg-blue-50' : 'bg-red-50'}`}>
            <h3 className={`font-bold ${isCompliant ? 'text-blue-800' : 'text-red-800'}`}>
              What does this mean?
            </h3>

            <p className={`text-sm mt-2 ${isCompliant ? 'text-blue-700' : 'text-red-700'}`}>
              {isCompliant
                ? 'The visible label information satisfies all Legal Metrology checks.'
                : 'One or more mandatory label fields are missing or non-compliant.'}
            </p>
          </div>

          <button
            onClick={() => navigate('/citizen/complaint')}
            className="mt-6 w-full rounded-xl border border-red-200 text-red-600 py-3 font-semibold hover:bg-red-50"
          >
            Report a Problem
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComplianceResult