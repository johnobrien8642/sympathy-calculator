import { useState, useRef, useEffect } from 'react'
import { useScreenshot, createFileName } from 'use-react-screenshot'
import Head from 'next/head'

export default function Home() {
  let [text, setText] = useState('')
  let [sq, setSQ] = useState('')
  let [maxChars, setMaxChars] = useState(false)
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
          in the text box below and hit calculate. Our A.I. will analyze your text and calculate you a
          Sympathy Quotient (SQ) score.
        </p>
        <p>
          Afterwards, you can take a screenshot of your SQ score and attach it to your post.
        </p>
      </header>

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
            className='btn btn-secondary'
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

      <button
        className={`btn btn-secondary screenshot-btn ${sq ? 'active' : ''}`}
        onClick={getImage}
      >
        Take Screenshot
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
