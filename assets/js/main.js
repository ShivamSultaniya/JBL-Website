/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose= document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click',() =>{
        navMenu.classList.add('show-menu')
    })
}
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () =>{
    // const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('blur-header')
                        : header.classList.remove('blur-header') 
}
window.addEventListener('scroll',blurHeader)

/*=============== SWIPER FAVORITES ===============*/ 
let swiperFavorite = new Swiper('.favorite__swiper',{
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',
    grabCursor: true,

    breakpoints: {
        768:{
            slidesPerView:3
        }
    }
})

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin:'top;',
    distance:'60px',
    duration: 2500,
    delay: 400,
    
})

sr.reveal(`.home__social, .favorite__container, .sponsor__container, .footer,.chatbot-toggler`)
sr.reveal(`.home__title span:nth-child(1)`, {origin:'left', opacity:1})
sr.reveal(`.home__title span:nth-child(3)`, {origin:'right', opacity:1})
sr.reveal(`.home__tooltip, .home__button, .model__button`, {origin:'bottom'})
sr.reveal(`.about__data`, {origin:'left'})
sr.reveal(`.about__img, .model__tooltip`, {origin:'right'})


/*=============== CHATBOT ===============*/
import { GoogleGenerativeAI } from "@google/generative-ai";
  
// Fetch your API_KEY
const API_KEY = "AIzaSyDdRK8RSbGU1i5dW6166W32Xyco0Hr0J2k";



const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");

let userMessage;


const createChatLi = (message, className) => {
    //create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ?`<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}



// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = userMessage

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  chatbox.appendChild(createChatLi(text, "incoming"));
  chatbox.scrollTo(0,chatbox.scrollHeight);
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;


    //Append the users message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    //display thinking message while waiting for the response
    run();
    chatInput.value = "";
    chatbox.scrollTo(0,chatbox.scrollHeight);
}


chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleChat();
    }
  });
sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click",() => document.body.classList.toggle("show-chatbot"));

