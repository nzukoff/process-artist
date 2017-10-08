const axiom = "F"
let rules = []
let sentence = axiom
let len = 100
let angle
let slider
let generations = 0
let canvas
let sentenceDiv
let sliderDiv
let patternInput
let patternText
let rulesP
let generateButton
let submitButton
let resetButton
let nextSentence
let genText

rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
  // b: patternText.value()
}

// rules[1] = {
//   a: "FF",
//   b: ""
// }


function generate() {
  console.log("PATTERN INPUT IS ", patternInput)
  if (!patternText) {
    patternText = patternInput.value()
    patternInput.hide()
    // generateButton.html()
  }
  rules[0].b = patternText
  rulesP.html(axiom + "->" + patternText)
  console.log("RULES ARE ", rules)
  len *= 0.5
  generations++
  nextSentence = ""
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
  sentenceP.html(sentence)
  if (generations <= 5) {
    genText = select("#generations")
    genText.html(`Generation ${generations}:`)
    genText.style("font-weight","bold")
    console.log("GEN TEXT IS ", genText)
    drawTree()
  }
  patternInput.value("")
}

function drawTree() {
  angle = radians(25)
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

function reset() {
  console.log("RESET")
  rules[0].b = ""
  rulesP.html(axiom + "->")
  len = 100
  generations = 0
  sentence = axiom
  sentenceP.html("")
  genText.html("Generation 0:")
  patternInput.show()
  patternText = ""
  drawTree()
}

function setup() {
  patternInput = select("#pattern")
  generateButton = select("#generate")
  generateButton.mousePressed(generate)
  // slider = createSlider(0,50,25,0.5)
  canvasDiv = select("#canvas")
  createNewCanvas()
  sentenceP = select("#sentence")
  // sentenceP.html(axiom)
  rulesP = select("#rules")
  rulesP.html(axiom + "->")
  resetButton = select("#reset")
  resetButton.mousePressed(reset)
  sentenceDiv = select("#sentenceDiv")
  sentenceDiv.style("height","40%")
  sentenceDiv.style("overflow-y","scroll")
  drawTree()
}

function createNewCanvas() {
  const bb = document.querySelector('#canvas')
                    .getBoundingClientRect()

  const body = document.body, html = document.documentElement;
  const height = Math.max(body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
  const width = Math.max(body.scrollWidth, body.offsetWidth,
                        html.clientWidth, html.scrollWidth, html.offsetWidth );
  canvas = createCanvas(width/3,400)
  canvas.position(bb.left, height/2.5)
}

function draw() {
}
