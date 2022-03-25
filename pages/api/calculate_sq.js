import addSQ from './util/add_sq_util'

export default async function(req, res) {
  const text = req.body.text
  let SQ = 0;
  const physical = 'physical'
  const spiritual = 'spiritual'
  const identity = 'identity'
  const emotional = 'emotional'
  const financial = 'financial'
  const material = 'material'
  console.log('text in calc sq func', text)

  // physical
  addSQ(SQ, text, physical, regexPhysical1, 1)
  // addSQ(SQ, text, physical, regexPhysical2, 2)
  // addSQ(SQ, text, physical, regexPhysical3, 3)
  // addSQ(SQ, text, physical, regexPhysical4, 4)
  // addSQ(SQ, text, physical, regexPhysical5, 5)
  
  // // identity
  // addSQ(SQ, text, identity, regexIdentity1, 1)
  // addSQ(SQ, text, identity, regexIdentity2, 2)
  // addSQ(SQ, text, identity, regexIdentity3, 3)
  // addSQ(SQ, text, identity, regexIdentity4, 4)
  // addSQ(SQ, text, identity, regexIdentity5, 5)
  
  // // emotional
  // addSQ(SQ, text, emotional, regexEmotional1, 1)
  // addSQ(SQ, text, emotional, regexEmotional2, 2)
  // addSQ(SQ, text, emotional, regexEmotional3, 3)
  // addSQ(SQ, text, emotional, regexEmotional4, 4)
  // addSQ(SQ, text, emotional, regexEmotional5, 5)
  
  // // financial
  // addSQ(SQ, text, financial, regexFinancial1, 1)
  // addSQ(SQ, text, financial, regexFinancial2, 2)
  // addSQ(SQ, text, financial, regexFinancial3, 3)
  // addSQ(SQ, text, financial, regexFinancial4, 4)
  // addSQ(SQ, text, financial, regexFinancial5, 5)

  // // material
  // addSQ(SQ, text, material, regexMaterial1, 1)
  // addSQ(SQ, text, material, regexMaterial2, 2)
  // addSQ(SQ, text, material, regexMaterial3, 3)
  // addSQ(SQ, text, material, regexMaterial4, 4)
  // addSQ(SQ, text, material, regexMaterial5, 5)

  // // relationship
}