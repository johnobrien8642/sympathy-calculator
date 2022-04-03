import { useState, useRef, useEffect } from 'react'
import { useScreenshot, createFileName } from 'use-react-screenshot'
import Head from 'next/head'

export default function Home() {
  let [text, setText] = useState('')
  let [sq, setSQ] = useState('')
  let [maxChars, setMaxChars] = useState(false)
  let [calculated, setCalculated] = useState(false)
  let sqScorePanelRef = useRef(null)
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  })
  const download = (image, { name =  `sq-score-${sq + '-' + Date.now()}`, extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const getImage = () => takeScreenshot(sqScorePanelRef.current).then(download)

  useEffect(() => {
    if (sq) {
      sqScorePanelRef.current.scrollIntoView()
    }
  }, [sq])
  
  return (
    <div className={`main-page container`}>
      <Head>
        <title>Sympathy Calculator</title>
        <meta 
          name="description" 
          content="An A.I. powered calculator determing how much sympathy you should receive based on the description of your situation" 
        />
      </Head>
      
      <main
        className='main-content container-md'
      >
        <h1>Sympathy Calculator</h1>
        <h4>English only at this time.</h4>
        <p>
          Have you been suffering? Would you like some Sympathy? Wouldn't it be nice to know
          exactly how much Sympathy you should receive for your given situation?
        </p>
        <p>
          That's where the Sympathy Calculator comes in to play. Simply describe your situation
          in the text box below and hit calculate. Our A.I. will analyze your text and calculate a
          Sympathy Quotient (SQ) score.
        </p>
        <p>
          Afterwards you'll receive a certificate with your SQ score. You can copy this certificate
          and attach it to your post, or share it with family and friends.
        </p>
        <p>
          Example: "I woke up this morning depressed. I have a bad back. On the way to the toilet,
          I stubbed my toe. I was devestated." Currently, this will be around 200 SQ, depending upon quantitative 
          variations.
        </p>
        <p>
          <span className='italicize'>Spelling is important to receive the most accurate calculation.</span>
        </p>
      </main>

      <div
        className='calculator container-md'
      >
        <form
          className='calculator-form'
          onSubmit={async (e) => {
            e.preventDefault()
            if (text && !maxChars) {
              const res = await fetch('/api/calculate_sq_score', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  text: text.toLowerCase()
                })
              })
              const SQ = await res.json()
              setSQ(SQ.score)
            }
            setCalculated(false)
          }}
        >
          <textarea
            className='text-input w-100'
            disabled={calculated}
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
            className='btn btn-secondary'
            disabled={`${maxChars ? 'disabled' : ''}`}
            onClick={() => {
              setCalculated(true)
            }}
          >
            <span className={`spinner-border me-1 calculating ${calculated ? 'active' : ''}`}></span>
            {calculated ? 'Calculating...' : 'Calculate'}
          </button>
          <span
            className={`warning ${maxChars ? 'active ' : ''}`}
          >
            2500 Characters Max
          </span>
        </form>
      </div>

      <button
        className={`btn btn-secondary screenshot-btn ${sq ? 'active' : ''}`}
        onClick={getImage}
      >
        Download Certificate
      </button>

      <div
        className={`sq-score-panel ${sq ? 'active' : ''} container`}
        ref={sqScorePanelRef}
      >
        <p>
          The amount of sympathy deserved is:
        </p>
        <p><span className='sq-num'>{sq}</span><span className='sq-text'>SQ</span></p>
        <p className='sq-explainer'>(Sympathy Quotient)</p>
        <p>
          Certified by the NCQAHS 
        </p>
        <p className='consortium-name'>(National Consortium for the Quantification of All Human Suffering)</p>
        <p>
          sympathycalculator.com
        </p>
      </div>
    </div>
  )
}
