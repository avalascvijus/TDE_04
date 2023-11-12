//INICIO MENU LATERAL

const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
});

//FINAL MENU LATERAL

//==================================================

//INICIO CHAT


const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");


let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    //Cria um elemento chat <li> com a mensagem e a classe 
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    //Define as propriedades e mensagem para o API do chat
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Ops! Alguma coisa deu errado. Por favor, tente novamente.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    //coloca a mensagem do usuário no chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        //Criando a mensagem de aguardando resposta
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);

}

chatInput.addEventListener("input", () => {
    //ajusta a altura da área de texto de entrada com base do content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
})

chatInput.addEventListener("keydown", (e) => {
    //Se o enter foir precionado sem o shift e a largura for maior que 800px, handle the chat 
    if (e.key === "Enter" & !e.shiftKey && window.innerWidth > 800) {
        e.proventDefault();
        handleChat();
    }
})


sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
//FINAL CHAT

//==================================================

//INICIO GALERIA

const slides = document.querySelector('.slides');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const slideWidth = slides.clientWidth;

let currentPosition = 0;

leftArrow.addEventListener('click', () => {
    if (currentPosition > 0) {
        currentPosition -= slideWidth;
        slides.style.transform = `translateX(-${currentPosition}px)`;
    }
});

rightArrow.addEventListener('click', () => {
    if (currentPosition < (slides.children.length - 1) * slideWidth) {
        currentPosition += slideWidth;
        slides.style.transform = `translateX(-${currentPosition}px)`;
    }
});

//==================================================

//INICIO FAC

const question = document.querySelector('.question');
const answer = document.querySelector('.answer');
const icon = document.querySelector('.icon');

question.addEventListener('click', () => {
    if (answer.style.display === 'none') {
        answer.style.display = 'block';
        icon.textContent = '-';
    } else {
        answer.style.display = 'none';
        icon.textContent = '+';
    }
});

//FINAL FAC

// Verifique se o usuário já deu consentimento para os cookies
if (!localStorage.getItem('cookieConsent')) {
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    // Exibe o pop-up de cookies
    cookiePopup.style.display = 'block';

    // Lidar com o clique no botão "Aceitar Cookies"
    acceptCookiesBtn.addEventListener('click', function() {
        // Esconda o pop-up de cookies
        cookiePopup.style.display = 'none';
        // Armazene o consentimento do usuário no armazenamento local
        localStorage.setItem('cookieConsent', 'true');
    });
}