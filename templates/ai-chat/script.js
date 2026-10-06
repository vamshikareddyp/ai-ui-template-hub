/* ==============================
   AI CHAT INTERFACE
   ============================== */

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesArea = document.getElementById("messagesArea");
const emptyState = document.getElementById("emptyState");
const typingIndicator = document.getElementById("typingIndicator");

const newChatButton = document.getElementById("newChatButton");
const headerNewChat = document.getElementById("headerNewChat");
const clearChatButton = document.getElementById("clearChatButton");

const menuButton = document.getElementById("menuButton");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");

const themeButton = document.getElementById("themeButton");

const suggestions = document.querySelectorAll(".suggestion");

let chatMessages = [];

/* ==============================
   GET CURRENT TIME
   ============================== */

function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

/* ==============================
   ADD MESSAGE TO UI
   ============================== */

function addMessage(text, sender) {

    if (emptyState) {
        emptyState.style.display = "none";
    }

    const message = document.createElement("div");

    message.className = `message ${sender}`;

    const avatar = document.createElement("div");

    avatar.className = "avatar";
    avatar.textContent = sender === "user" ? "U" : "✦";

    const content = document.createElement("div");

    content.className = "message-content";

    const bubble = document.createElement("div");

    bubble.className = "message-bubble";

    bubble.textContent = text;

    const time = document.createElement("div");

    time.className = "message-time";
    time.textContent = getCurrentTime();

    content.appendChild(bubble);
    content.appendChild(time);

    message.appendChild(avatar);
    message.appendChild(content);

    messagesArea.appendChild(message);

    messagesArea.scrollTop = messagesArea.scrollHeight;

    chatMessages.push({
        text: text,
        sender: sender
    });
}

/* ==============================
   DEMO AI RESPONSE
   ============================== */

function generateDemoResponse(userText) {

    const text = userText.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) {
        return "Hello! I'm Nova AI. How can I help you today?";
    }

    if (text.includes("javascript")) {
        return "JavaScript is a programming language used to make websites interactive. You can use it to handle events, update HTML, validate forms, and build dynamic interfaces.";
    }

    if (text.includes("website")) {
        return "A good modern website should have clear navigation, responsive layouts, readable typography, consistent spacing, and useful interactions.";
    }

    if (text.includes("ai")) {
        return "Artificial Intelligence allows computer systems to perform tasks that normally require human intelligence, such as understanding language, recognizing patterns, and generating content.";
    }

    return `That's an interesting question about "${userText}". This template currently uses a demo response system. A Hugging Face model or another AI API can be connected here later.`;
}

/* ==============================
   SHOW TYPING
   ============================== */

function showTyping() {
    typingIndicator.classList.remove("hidden");
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

/* ==============================
   HIDE TYPING
   ============================== */

function hideTyping() {
    typingIndicator.classList.add("hidden");
}

/* ==============================
   SEND MESSAGE
   ============================== */

function sendMessage(text) {

    const cleanText = text.trim();

    if (!cleanText) {
        return;
    }

    addMessage(cleanText, "user");

    messageInput.value = "";
    messageInput.style.height = "auto";

    showTyping();

    setTimeout(() => {

        hideTyping();

        const response = generateDemoResponse(cleanText);

        addMessage(response, "ai");

    }, 900);
}

/* ==============================
   FORM SUBMISSION
   ============================== */

messageForm.addEventListener("submit", function(event) {

    event.preventDefault();

    sendMessage(messageInput.value);

});

/* ==============================
   ENTER TO SEND
   ============================== */

messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage(messageInput.value);
    }

});

/* ==============================
   AUTO RESIZE TEXTAREA
   ============================== */

messageInput.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height = `${Math.min(this.scrollHeight, 130)}px`;

});

/* ==============================
   NEW CHAT
   ============================== */

function startNewChat() {

    messagesArea.querySelectorAll(".message").forEach(message => {
        message.remove();
    });

    chatMessages = [];

    emptyState.style.display = "block";

    hideTyping();

    messageInput.value = "";
    messageInput.focus();

    sidebar.classList.remove("open");
}

newChatButton.addEventListener("click", startNewChat);
headerNewChat.addEventListener("click", startNewChat);

/* ==============================
   CLEAR CHAT
   ============================== */

clearChatButton.addEventListener("click", function() {

    if (chatMessages.length === 0) {
        return;
    }

    startNewChat();

});

/* ==============================
   SUGGESTIONS
   ============================== */

suggestions.forEach(button => {

    button.addEventListener("click", function() {

        sendMessage(this.textContent);

    });

});

/* ==============================
   MOBILE SIDEBAR
   ============================== */

menuButton.addEventListener("click", function() {
    sidebar.classList.add("open");
});

closeSidebar.addEventListener("click", function() {
    sidebar.classList.remove("open");
});

/* ==============================
   DARK / LIGHT MODE
   ============================== */

themeButton.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("novaTheme", isDark ? "dark" : "light");

});

/* Restore theme */

if (localStorage.getItem("novaTheme") === "dark") {
    document.body.classList.add("dark");
}