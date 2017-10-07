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
  sentenceDiv.html(sentence)
  if (generations <= 5) {
    let genText = select("#generations")
    genText.html(`Generations: ${generations}`)
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
  let button = select("#generate")
  button.mousePressed(generate)
  slider = createSlider(0,50,25,0.5)
  canvasDiv = select("#canvas")

  const bb = document.querySelector('#canvas')
                    .getBoundingClientRect()

  const body = document.body, html = document.documentElement;
  const height = Math.max(body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
  const width = Math.max(body.scrollWidth, body.offsetWidth,
                        html.clientWidth, html.scrollWidth, html.offsetWidth );
  canvas = createCanvas(width/3,400)
  canvas.position(bb.left, height/2)
  // canvasDiv.html(canvas)

  // slider = createSlider(0,50,25,0.5)
  // background(51)
  drawTree()
  sentenceDiv = select("#sentence")
  sentenceDiv.html(axiom)
  // sliderDiv = select("#slider")


  // sliderDiv.html(slider)


}

function draw() {
}
