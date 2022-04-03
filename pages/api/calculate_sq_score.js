import dbConnect from '../../lib/mongodb'
import EmotionSympItem from '../../models/Emotion_Symp_Item.js'
import FinancialOrMaterialSympItem from '../../models/Financial_Or_Material_Symp_Item.js'
import PhysicalSympItem from '../../models/Physical_Symp_Item.js'
import LossSympItem from '../../models/Loss_Symp_Item.js'

export default async function calculateScore(req, res) {
  await dbConnect()
  const { text } = req.body
  
  const modelArr = [ EmotionSympItem, FinancialOrMaterialSympItem, PhysicalSympItem, LossSympItem ]
  let model
  let docs
  let regexObj
  let regex
  let keys
  let matches
  let score
  let totalScore = 0

  try {
    for (let i = 0; i < modelArr.length; i++) {
      model = modelArr[i]
      docs = await model.find({})
      regexObj = handleRegexObj(docs)
      keys = Object.keys(regexObj)
      regex = new RegExp('\\b' + keys.join('\\b|\\b') + '\\b', 'gmi')
      matches = text.match(regex)
      score = handleAddScore(matches ? matches : [], regexObj)
      totalScore += score
    }

    totalScore = handleWildCard(totalScore)
    return res.status(200).json({ success: true, score: totalScore })
  } catch(err) {
    return res.status(500).json({ success: true, errorMessage: err.message })
  }
}

function handleRegexObj(docs) {
  let obj = {}
  let doc
  for (let i = 0; i < docs.length; i++) {
    doc = docs[i]
    if (!obj[doc.item]) {
      obj[doc.item] = doc
    }
  }
  return obj
}

function handleAddScore(matches, regexObj) {
  let value
  let match
  let initScore = 0
  
  if (!Object.keys(regexObj).length) return initScore
  for (let i = 0; i < matches.length; i++) {
    match = matches[i]
    value = regexObj[match].sympathyAmount
    initScore += value
  }
  
  return initScore
}

function handleWildCard(totalScore) {
  let randOneOrZero = Math.round(Math.random())
  let randAmt = Math.floor(Math.random() * 9)
  if (randOneOrZero) {
    totalScore += randAmt
  } else {
    if (totalScore < randAmt) return
    totalScore -= randAmt
  }

  return totalScore
}

