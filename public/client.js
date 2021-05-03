var socket = io();

let names;
var audio=new Audio('ping.mp3')

let textArea = document.querySelector('#messageInput')
console.log(textArea)
let messageArea = document.querySelector('.chat-log')

do {
    names = prompt('enter your name')
} while (!names)

// textArea.addEventListener("keyup", e => {
//     if(e.key==='Enter'){
//         console.log(e.target.value)
//         sendMessage(e.target.value)
//     }
// })

textArea.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

const sendMessage = (message) => {
    let msg = {
        user: names,
        message:message.trim()
    }
    appandMessage(msg, 'right')
    textArea.value=''
    scrollToBottom()


    socket.emit('message',msg)
}

const appandMessage = (message, postition) => {
    let mainDiv = document.createElement('div')
    let className = postition
    mainDiv.classList.add(className)

    let markUp = `
    <h4>${message.user}</h4>
                <p>${message.message}</p>
    `
    mainDiv.innerHTML = markUp
    messageArea.appendChild(mainDiv)
}

socket.on('message',msg=>
{
    console.log(msg)
    audio.play()
    appandMessage(msg,'left')
    
    scrollToBottom()
})

const scrollToBottom=()=>{
    messageArea.scrollTop=messageArea.scrollHeight
}