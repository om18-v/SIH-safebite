function Login() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">
            LABELCOMPLY
          </h1>

          <p className="mt-3 text-gray-500">
            Welcome back
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <button className="w-full rounded-xl bg-blue-700 py-3.5 text-white font-semibold hover:bg-blue-800 transition">
            Login
          </button>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span className="text-blue-700 font-semibold cursor-pointer">
            Sign up
          </span>
        </p>

      </div>

    </div>
  )
}

export default Login