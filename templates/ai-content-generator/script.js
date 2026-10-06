/* ==============================
   AI CONTENT GENERATOR
   ============================== */

const promptInput = document.getElementById("promptInput");

const contentType = document.getElementById("contentType");
const tone = document.getElementById("tone");
const length = document.getElementById("length");

const generateButton = document.getElementById("generateButton");

const outputContent = document.getElementById("outputContent");

const loadingState = document.getElementById("loadingState");

const generationStatus =
    document.getElementById("generationStatus");

const copyButton = document.getElementById("copyButton");

const regenerateButton =
    document.getElementById("regenerateButton");

const clearButton = document.getElementById("clearButton");

const wordCount = document.getElementById("wordCount");
const characterCount =
    document.getElementById("characterCount");

const examplePrompts =
    document.querySelectorAll(".example-prompt");

let lastPrompt = "";

/* ==============================
   DEMO CONTENT GENERATOR
   ============================== */

function generateDemoContent(prompt, type, selectedTone, selectedLength) {

    const lengthText = {
        short: "a concise",
        medium: "a detailed",
        long: "a comprehensive"
    };

    const intro = `Here is ${lengthText[selectedLength]} ${type.toLowerCase()} based on your request.`;

    const content = `
${intro}

Topic:
${prompt}

Introduction

Artificial intelligence is changing the way people create, communicate, learn, and work. Modern AI tools can help transform simple ideas into useful and engaging digital content.

Main Content

The key to creating effective content is understanding the audience and communicating the main idea clearly. A ${selectedTone.toLowerCase()} approach can make the message easier to understand while keeping readers interested.

For this topic, the content should focus on practical value, clear explanations, and meaningful examples. Combining creativity with a structured approach helps produce content that is useful and engaging.

Key Points

• Keep the main message clear and focused.
• Use simple and readable language.
• Organize information into meaningful sections.
• Add examples that are relevant to the audience.
• Review the final content before publishing.

Conclusion

AI-assisted content generation can make the writing process faster while still allowing people to control the ideas, tone, and final message.

This is a frontend demonstration. A real Hugging Face model can be connected to the JavaScript generation function later.
`;

    return content.trim();
}

/* ==============================
   GENERATE CONTENT
   ============================== */

function generateContent() {

    const prompt = promptInput.value.trim();

    if (!prompt) {

        promptInput.focus();

        generationStatus.textContent =
            "Please enter a prompt first.";

        return;
    }

    lastPrompt = prompt;

    const selectedType = contentType.value;
    const selectedTone = tone.value;
    const selectedLength = length.value;

    outputContent.style.display = "none";
    loadingState.classList.remove("hidden");

    generationStatus.textContent =
        "Generating...";

    generateButton.disabled = true;

    setTimeout(() => {

        const result = generateDemoContent(
            prompt,
            selectedType,
            selectedTone,
            selectedLength
        );

        loadingState.classList.add("hidden");

        outputContent.style.display = "block";

        outputContent.textContent = result;

        generationStatus.textContent =
            "Generated successfully";

        generateButton.disabled = false;

        updateCounts();

    }, 1200);
}

/* ==============================
   COUNT WORDS AND CHARACTERS
   ============================== */

function updateCounts() {

    const text = outputContent.textContent.trim();

    const words = text
        ? text.split(/\s+/).length
        : 0;

    const characters = text.length;

    wordCount.textContent =
        `${words} words`;

    characterCount.textContent =
        `${characters} characters`;
}

/* ==============================
   COPY
   ============================== */

copyButton.addEventListener("click", async function() {

    const text = outputContent.textContent.trim();

    if (!text) {
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        generationStatus.textContent =
            "Copied to clipboard";

    } catch (error) {

        generationStatus.textContent =
            "Copy failed";

    }

});

/* ==============================
   REGENERATE
   ============================== */

regenerateButton.addEventListener("click", function() {

    if (lastPrompt) {
        generateContent();
    } else {
        promptInput.focus();
    }

});

/* ==============================
   CLEAR
   ============================== */

clearButton.addEventListener("click", function() {

    promptInput.value = "";

    outputContent.innerHTML = `
        <div class="output-placeholder">

            <div class="placeholder-icon">
                ✦
            </div>

            <h4>Your generated content will appear here</h4>

            <p>
                Add a prompt and click Generate Content
                to start.
            </p>

        </div>
    `;

    generationStatus.textContent =
        "Ready to generate";

    wordCount.textContent = "0 words";

    characterCount.textContent =
        "0 characters";

    lastPrompt = "";

});

/* ==============================
   EXAMPLE PROMPTS
   ============================== */

examplePrompts.forEach(button => {

    button.addEventListener("click", function() {

        promptInput.value =
            this.textContent.trim();

        promptInput.focus();

    });

});

/* ==============================
   GENERATE BUTTON
   ============================== */

generateButton.addEventListener(
    "click",
    generateContent
);