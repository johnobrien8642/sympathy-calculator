const test = `“I lost my job. My wife left me and I 
feel alone and abandoned, and then this morning, 
I woke up and stubbed my toe on the way to the bathroom. 
I’m a 42 year old white male.”`


const add = (test) => {
  let num = 0;
  const matchObject = {
    stubbed: { value: 10 },
    lost: { value: 5 },
    job: { value: 3 },
    wife: { value: 2 },
    left: { value: 3.5 },
    white: { value: 40 }
  }
  let keys = Object.keys(matchObject)
  const regex = new RegExp('\\b' + keys.join('\\b|\\b') + '\\b', 'gm')
  const matches = test.match(regex)

  matches.forEach(match => {
    num += matchObject[match].value
  })
  return num
}

const result = add(test)
console.log(result)