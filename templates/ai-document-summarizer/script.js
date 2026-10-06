/* ==============================
   AI DOCUMENT SUMMARIZER
   ============================== */

const uploadArea =
    document.getElementById("uploadArea");

const fileInput =
    document.getElementById("fileInput");

const documentText =
    document.getElementById("documentText");

const summaryLength =
    document.getElementById("summaryLength");

const summarizeButton =
    document.getElementById("summarizeButton");

const clearButton =
    document.getElementById("clearButton");

const copyButton =
    document.getElementById("copyButton");

const downloadButton =
    document.getElementById("downloadButton");

const wordCount =
    document.getElementById("wordCount");

const characterCount =
    document.getElementById("characterCount");

const summaryWordCount =
    document.getElementById("summaryWordCount");

const summaryResult =
    document.getElementById("summaryResult");

const loadingState =
    document.getElementById("loadingState");

const summaryStatus =
    document.getElementById("summaryStatus");

/* ==============================
   UPDATE INPUT COUNTS
   ============================== */

function updateInputCounts() {

    const text = documentText.value.trim();

    const words = text
        ? text.split(/\s+/).length
        : 0;

    wordCount.textContent =
        `${words} words`;

    characterCount.textContent =
        `${text.length} characters`;
}

documentText.addEventListener(
    "input",
    updateInputCounts
);

/* ==============================
   FILE UPLOAD
   ============================== */

uploadArea.addEventListener("click", function() {

    fileInput.click();

});

fileInput.addEventListener("change", function() {

    const file = this.files[0];

    if (!file) {
        return;
    }

    readTextFile(file);

});

/* ==============================
   READ TEXT FILE
   ============================== */

function readTextFile(file) {

    const reader = new FileReader();

    reader.onload = function(event) {

        documentText.value =
            event.target.result;

        updateInputCounts();

        summaryStatus.textContent =
            `${file.name} loaded`;

    };

    reader.onerror = function() {

        summaryStatus.textContent =
            "Unable to read file";

    };

    reader.readAsText(file);

}

/* ==============================
   DRAG AND DROP
   ============================== */

uploadArea.addEventListener(
    "dragover",
    function(event) {

        event.preventDefault();

        uploadArea.classList.add("dragging");

    }
);

uploadArea.addEventListener(
    "dragleave",
    function() {

        uploadArea.classList.remove("dragging");

    }
);

uploadArea.addEventListener(
    "drop",
    function(event) {

        event.preventDefault();

        uploadArea.classList.remove("dragging");

        const file =
            event.dataTransfer.files[0];

        if (!file) {
            return;
        }

        const extension =
            file.name.split(".").pop().toLowerCase();

        if (extension !== "txt" && extension !== "md") {

            summaryStatus.textContent =
                "Please use a TXT or MD file.";

            return;
        }

        readTextFile(file);

    }
);

/* ==============================
   SIMPLE DEMO SUMMARIZER
   ============================== */

function createSummary(text, length) {

    const sentences = text
        .replace(/\s+/g, " ")
        .match(/[^.!?]+[.!?]+/g);

    if (!sentences || sentences.length === 0) {

        return text.trim();

    }

    let sentenceLimit;

    if (length === "short") {
        sentenceLimit = 2;
    } else if (length === "medium") {
        sentenceLimit = 4;
    } else {
        sentenceLimit = 6;
    }

    const selectedSentences =
        sentences.slice(0, sentenceLimit);

    return selectedSentences
        .map(sentence => sentence.trim())
        .join(" ");
}

/* ==============================
   SUMMARIZE
   ============================== */

summarizeButton.addEventListener(
    "click",
    function() {

        const text =
            documentText.value.trim();

        if (!text) {

            summaryStatus.textContent =
                "Please add a document first.";

            documentText.focus();

            return;
        }

        loadingState.classList.remove("hidden");

        summaryResult.style.display =
            "none";

        summaryStatus.textContent =
            "Analyzing document...";

        summarizeButton.disabled = true;

        setTimeout(function() {

            const summary =
                createSummary(
                    text,
                    summaryLength.value
                );

            loadingState.classList.add("hidden");

            summaryResult.style.display =
                "block";

            summaryResult.textContent =
                summary;

            summaryStatus.textContent =
                "Summary generated";

            summarizeButton.disabled = false;

            const words =
                summary.split(/\s+/).length;

            summaryWordCount.textContent =
                `${words} summary words`;

        }, 1200);

    }
);

/* ==============================
   COPY SUMMARY
   ============================== */

copyButton.addEventListener(
    "click",
    async function() {

        const summary =
            summaryResult.textContent.trim();

        if (!summary) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                summary
            );

            summaryStatus.textContent =
                "Summary copied";

        } catch (error) {

            summaryStatus.textContent =
                "Copy failed";

        }

    }
);

/* ==============================
   DOWNLOAD SUMMARY
   ============================== */

downloadButton.addEventListener(
    "click",
    function() {

        const summary =
            summaryResult.textContent.trim();

        if (!summary) {
            return;
        }

        const blob = new Blob(
            [summary],
            {
                type: "text/plain"
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "ai-summary.txt";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    }
);

/* ==============================
   CLEAR EVERYTHING
   ============================== */

clearButton.addEventListener(
    "click",
    function() {

        documentText.value = "";

        fileInput.value = "";

        updateInputCounts();

        summaryResult.innerHTML = `
            <div class="result-empty">

                <div class="result-icon">
                    ✦
                </div>

                <h4>
                    Your summary will appear here
                </h4>

                <p>
                    Add a document and click
                    Summarize Document.
                </p>

            </div>
        `;

        summaryStatus.textContent =
            "Waiting for document";

        summaryWordCount.textContent =
            "0 summary words";

    }
);