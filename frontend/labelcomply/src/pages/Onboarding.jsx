function Onboarding() {
  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">

      {/* Skip button */}
      <div className="flex justify-end">
        <button className="text-sm font-medium text-gray-500">
          Skip
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">

        {/* Illustration */}
        <div className="w-32 h-32 rounded-3xl bg-blue-50 flex items-center justify-center mb-8">
          <span className="text-5xl">📦</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Verify Before You Buy
        </h1>

        <p className="mt-4 max-w-sm text-gray-500 leading-relaxed">
          Scan a product label and let LabelComply analyze
          its information for compliance, warnings and violations.
        </p>

        {/* Process */}
        <div className="mt-8 flex items-center gap-3 text-sm font-medium">
          <span className="text-blue-700">Scan</span>
          <span className="text-gray-300">→</span>
          <span className="text-blue-700">Verify</span>
          <span className="text-gray-300">→</span>
          <span className="text-blue-700">Act</span>
        </div>

      </div>

      {/* Bottom */}
      <div className="pb-4">

        <button className="w-full rounded-2xl bg-blue-700 py-4 text-white font-semibold shadow-sm hover:bg-blue-800 transition">
          Get Started
        </button>

        {/* Page indicators */}
        <div className="flex justify-center gap-2 mt-5">
          <span className="h-2 w-6 rounded-full bg-blue-700"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
        </div>

      </div>

    </div>
  )
}

export default Onboarding