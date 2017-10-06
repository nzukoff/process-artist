const axiom = "F"
let rules = []
let sentence = axiom
let len = 100
let angle
let slider
let generations = 0

rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
  len *= 0.5
  generations++
  let nextSentence = ""
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i)
    let found = false
    for (let j = 0; j < rules.length; j++) {
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
  // createP(sentence)
  if (generations <= 5) {
    createP(generations)
    drawTree()
  }

}

function drawTree() {
  angle = radians(slider.value())
  background(51)
  resetMatrix()
  translate(width/2, height)
  stroke(255, 100)
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i)

    if (current == "F") {
      line(0,0,0,-len)
      translate(0,-len)
    } else if (current == "+") {
      rotate(angle)
    } else if (current == "-") {
      rotate(-angle)
    } else if (current == "[") {
      push()
    } else if (current == "]") {
      pop()
    }
  }

}

function setup() {
  createCanvas(400, 400)
  slider = createSlider(0,50,25,0.5)
  background(51)
  drawTree()
  createP(axiom)
  var button = createButton("generate")
  button.mousePressed(generate)

}
//
// function draw() {
//   background(0);
// }
