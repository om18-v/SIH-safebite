import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LanguageSettings() {

  const navigate = useNavigate()

  const [language, setLanguage] = useState('English')

  const messages = {
    English: 'Your product appears compliant.',
    Hindi: 'आपका उत्पाद अनुपालन के अनुसार प्रतीत होता है।',
    Marathi: 'तुमचे उत्पादन नियमांनुसार असल्याचे दिसते.'
  }

  const speak = () => {

    if (!window.speechSynthesis) return

    const utterance = new SpeechSynthesisUtterance(
      messages[language]
    )

    const languages = {
      English: 'en-IN',
      Hindi: 'hi-IN',
      Marathi: 'mr-IN'
    }

    utterance.lang = languages[language]

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="min-h-screen bg-white p-6">

      <div className="max-w-xl mx-auto">

        <button
          onClick={() => navigate('/citizen')}
          className="text-blue-700"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mt-8">
          Language & Voice
        </h1>

        <p className="text-gray-500 mt-2">
          Choose how LabelComply communicates with you.
        </p>

        <div className="mt-8 space-y-3">

          {['English', 'Hindi', 'Marathi'].map((item) => (

            <button
              key={item}
              onClick={() => setLanguage(item)}
              className={`w-full text-left rounded-2xl
                          border p-5 ${
                language === item
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >

              <span className="font-bold">
                {item}
              </span>

            </button>

          ))}

        </div>

        <div className="mt-7 rounded-3xl bg-gray-50 p-6">

          <p className="text-sm text-gray-500">
            Preview
          </p>

          <p className="text-xl font-bold mt-3">
            {messages[language]}
          </p>

          <button
            onClick={speak}
            className="mt-6 rounded-xl bg-blue-700
                       text-white px-6 py-3 font-semibold"
          >
            🔊 Speak Result
          </button>

        </div>

      </div>

    </div>
  )
}

export default LanguageSettings