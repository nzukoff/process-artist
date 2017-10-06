const axiom = "A"
let rules = []
let sentence = axiom

rules[0] = {
  a: "A",
  b: "ABC"
}

rules[1] = {
  a: "B",
  b: "A"
}

function generate() {
  let nextSentence = ""

  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i)
    let found = false
    for (let j = 0; j < rules.length; j++) {
      console.log("J IS ", j)

        if (current === rules[j].a) {
          found = true
          nextSentence += rules[j].b
          break
        }
    }
    if (!found) {
      nextSentence += current
    }
  }
  sentence = nextSentence
  createP(sentence)
}

function setup() {
  // createCanvas(400, 400);
  noCanvas()
  createP(axiom)
  var button = createButton("generate")
  button.mousePressed(generate)
}
//
// function draw() {
//   background(0);
// }
