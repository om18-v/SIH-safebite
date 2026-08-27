import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function OfficerVerification() {

  const navigate = useNavigate()

  const [officerId, setOfficerId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  const handleVerification = (e) => {

    e.preventDefault()

    setError('')

    if (!officerId || !password) {
      setError('Please enter your Officer ID and password.')
      return
    }

    setLoading(true)

    // Temporary demo authentication
    setTimeout(() => {

      if (
        officerId === 'MH-FSO-10245' &&
        password === 'demo123'
      ) {

        navigate('/dashboard')

      } else {

        setError(
          'Officer verification failed. Invalid credentials.'
        )

      }

      setLoading(false)

    }, 900)

  }


  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white mb-8 transition"
        >
          ← Back
        </button>


        <div className="mb-8">

          <div className="w-14 h-14 rounded-2xl bg-blue-500/10
                          flex items-center justify-center text-2xl mb-5">
            👮
          </div>

          <p className="text-blue-400 text-sm font-semibold tracking-wider">
            AUTHORIZED ACCESS
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Officer Verification
          </h1>

          <p className="text-gray-400 mt-3">
            Verify your official credentials to access
            the LabelComply command center.
          </p>

        </div>


        <form
          onSubmit={handleVerification}
          className="rounded-3xl border border-gray-700
                     bg-[#111A2E] p-7"
        >

          <div className="mb-5">

            <label className="block text-sm font-medium text-gray-300 mb-2">
              Officer ID
            </label>

            <input
              type="text"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              placeholder="e.g. MH-FSO-10245"
              className="w-full rounded-xl bg-[#0B1220]
                         border border-gray-700 px-4 py-3
                         text-white outline-none
                         focus:border-blue-500 transition"
            />

          </div>


          <div className="mb-5">

            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-xl bg-[#0B1220]
                         border border-gray-700 px-4 py-3
                         text-white outline-none
                         focus:border-blue-500 transition"
            />

          </div>


          {error && (

            <div className="mb-5 rounded-xl border border-red-500/30
                            bg-red-500/10 p-3 text-sm text-red-300">
              ⚠ {error}
            </div>

          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600
                       hover:bg-blue-700 py-3.5
                       font-semibold transition
                       disabled:opacity-50"
          >

            {loading
              ? 'Verifying...'
              : 'Verify & Continue'
            }

          </button>


          <div className="mt-5 text-center text-xs text-gray-500">
            🔒 Restricted to authorized officers
          </div>

        </form>


        <div className="mt-5 rounded-2xl border border-yellow-500/20
                        bg-yellow-500/5 p-4 text-xs text-yellow-300">

          <p className="font-semibold mb-1">
            Demo credentials
          </p>

          <p>
            Officer ID: MH-FSO-10245
          </p>

          <p>
            Password: demo123
          </p>

        </div>

      </div>

    </div>
  )
}

export default OfficerVerification