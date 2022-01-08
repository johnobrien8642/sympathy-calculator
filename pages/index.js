import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  let [text, setText] = useState('')
  let [sq, setSQ] = useState('')
  let [maxChars, setMaxChars] = useState(false)
  let [active, setActive] = useState(false)

  return (
    <div className={`main-page container`}>
      <Head>
        <title></title>
        <meta 
          name="description" 
          content="This is a calculator to figure out exactly how much sympathy you're supposed to receive for your given situation" 
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      
      <header
        className='header container-md'
      >
        <h1>Sympathy Calculator</h1>
        <p>
          Have you been suffering? Would you like some Sympathy? Wouldn't it be nice to know
          exactly how much Sympathy you should receive for your given situation?
        </p>
        <p>
          That's where the Sympathy Calculator comes in to play. Simply describe your situation
          in the text box below and hit calculate. The system will analyze what you wrote and
          return an SQ score. SQ stands for Sympathy Quotient.
        </p>
      </header>

      <div
        className='calculator container-md'
      >
        <form
          className='calculator-form'
          onSubmit={async (e) => {
            e.preventDefault()
            if (!maxChars) {
              const SQ = await fetch('/api/calculate_sq', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  text: text
                })
              })
              setSQ(SQ)
            }
          }}
        >
          <textarea
            className='text-input w-100'
            value={text}
            onInput={e => {
              setText(e.target.value)
              if (text.length > 2500) {
                setMaxChars(true)
              } else {
                setMaxChars(false)
              }
            }}
          ></textarea>
          <button
            disabled={`${maxChars ? 'disabled' : ''}`}
          >
            Calculate
          </button>
          <span
            className={`${maxChars ? 'active ' : ''}warning`}
          >
            2500 Characters Max
          </span>
        </form>
      </div>

      <div
        className={`${active ? 'active ' : ''}sq-score container`}
      >
        <span>{sq}</span><span>SQ</span>
        <p>
          Your Sympathy Quotient for your situation is {sq}SQ.
          This is how much sympathy you deserve. You are now ready
          to request this amount of sympathy from the people around you.
        </p>
      </div>
    </div>
  )
}
