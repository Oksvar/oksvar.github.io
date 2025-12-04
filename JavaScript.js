const apiBase = "https://7105.api.green-api.com";

function getInput(id) {
    return document.getElementById(id).value;
}

function printOutput(data) {
    document.getElementById("output").textContent =
        JSON.stringify(data, null, 4);
}
function formatChatId(raw) {
    raw = raw.trim();

    if (raw.endsWith("@c.us") || raw.endsWith("@g.us") || raw.endsWith("@lid")) {
        return raw;
    }

    if (raw.includes("-")) {
        return raw + "@g.us";
    }

    let digitsOnly = true;
    for (let i = 0; i < raw.length; i++) {
        const ch = raw[i];
        if (ch < '0' || ch > '9') {
            digitsOnly = false;
            break;
        }
    }

    if (digitsOnly) {
        return raw + "@c.us";
    }

    return raw;
}
function extractFileName(url) {
    try {
        return url.split('/').pop().split('?')[0];
    } catch {
        return "file";
    }
}
async function getSettings() {
    const id = getInput("idInstance");
    const token = getInput("apiTokenInstance");

    const url = `${apiBase}/waInstance${id}/getSettings/${token}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        printOutput(json);
    } catch (err) {
        printOutput({ error: err.message });
    }
}

async function getInstanceStatus() {
    const id = getInput("idInstance");
    const token = getInput("apiTokenInstance");

    const url = `${apiBase}/waInstance${id}/getStateInstance/${token}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        printOutput(json);
    } catch (err) {
        printOutput({ error: err.message });
    }
}

async function postSendMessage() {
    const id = getInput("idInstance");
    const token = getInput("apiTokenInstance");

    let chatId = getInput("chatIdMessage");
    let message = getInput("message");
    chatId = formatChatId(chatId);

    const url = `${apiBase}/waInstance${id}/sendMessage/${token}`;

    const payload = {
        chatId: chatId,
        message: message
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const json = await response.json();
        printOutput(json);
    } catch (err) {
        printOutput({ error: err.message });
    }
}


async function postSendFileByURL() {
    const id = getInput("idInstance");
    const token = getInput("apiTokenInstance");

    let chatId = getInput("chatIdPic");
    let urlFile = getInput("urlFile");

    chatId = formatChatId(chatId);
    const fileName = extractFileName(urlFile);

    const url = `${apiBase}/waInstance${id}/sendFileByUrl/${token}`;

    const payload = {
        chatId: chatId,
        urlFile: urlFile,
        fileName: fileName
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const json = await response.json();
        printOutput(json);
    } catch (err) {
        printOutput({ error: err.message });
    }
}
