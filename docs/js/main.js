const body = document.querySelector("html")
const btn = document.querySelector("#start-btn")
const result = document.querySelector("#result")






var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


const colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow']
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'


const recognition = new SpeechRecognition()
    recognition.continuous = false
    // recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (e) => {
        const color = event.results[0][0].transcript
        onSuccess(color)
    }


    recognition.onspeechend = function() {
        onError("未识别...")
        recognition.stop()
    }
      
    recognition.onerror = function(event) {
        onError('识别错误: ' + event.error)
    }


    btn.addEventListener("click",(e) => {
        e.target.className += " start" 
        recognition.start()
        btn.textContent = "识别中..."
    })


    function onSuccess(color) {
        btn.className = "btn"
        result.className = "result right"
        body.style.backgroundColor = color

        result.textContent = color
        btn.textContent = "开始识别"
        setTimeout(() => {
            result.className = "result"
            result.textContent = ""
            body.style.backgroundColor = "#fff"
        }, 3000)
    }

    function onError(msg) {
        result.className = "result error"
        result.textContent = msg
        btn.className = "btn"
        btn.textContent = "开始识别"

        setTimeout(() => {
            result.className = "result"
            result.textContent = ""
            body.style.backgroundColor = "#fff"
        }, 3000)
    }