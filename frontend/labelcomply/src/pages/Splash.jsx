function Splash() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1220] flex items-center justify-center">

      {/* Animated bubbles */}
      <div className="absolute inset-0 pointer-events-none">

        <span className="bubble bubble-1"></span>
        <span className="bubble bubble-2"></span>
        <span className="bubble bubble-3"></span>
        <span className="bubble bubble-4"></span>
        <span className="bubble bubble-5"></span>

      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Logo */}
        <h1 className="splash-logo text-4xl sm:text-6xl font-bold tracking-tight text-white">
          LABELCOMPLY
        </h1>

        {/* Tagline */}
        <div className="splash-content mt-6 px-6">

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Verify Before You Buy
          </h2>

          <p className="mt-3 max-w-md text-sm sm:text-base text-gray-300">
            Scan product labels and understand compliance,
            warnings and violations instantly.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Splash