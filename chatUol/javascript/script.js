const UUID = "3e3ba45d-0f81-41fa-88e5-5544e02fe5b3";
let username = prompt("Diga seu nome");
let recipient = 'Todos'; 
let messageType = 'public'; 
let currentMessageType = 'public';
let currentRecipient = 'Todos';

//Entar no chat
function enterChat() {
    fetch(`https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username })
    })
    .then(response => {
        if (response.status === 200) {
            console.log(`${username} entrou na sala com sucesso.`);
            startChat();
        } else if (response.status === 400) {
            username = prompt("Nome de usuário já está em uso, por favor, insira outro nome!");
            enterChat();
        }
    })
    .catch(error => console.log('Erro ao entrar na sala', error));
}

//Manutenção de usuário ativo 
function notifyPresent() {
    fetch(`https://mock-api.driven.com.br/api/v6/uol/status/${UUID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username })
    })
    .then(response => {
        if (response.status !== 200) {
            alert("Você foi desconectado. A página será recarregada!");
            location.reload();
        }
    })
    .catch(error => console.error("Erro ao notificar presença", error));
}

//Carregando mensagens do servidor
function loadMessages() {
    fetch(`https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`)
    .then(response => response.json())
    .then(data => {
        let chatWindow = document.getElementById("messages");
        chatWindow.innerHTML = "";

        data.forEach(message => {
            if (message.type === "private_message" && (message.from === username || message.to === username)) {
                displayMessage(message, "private");
            } else if (message.type !== "private_message") {
                const className = message.type === "status" ? "status" : "normal";
                displayMessage(message, className);
            }
        });

        chatWindow.scrollTop = chatWindow.scrollHeight; 
    })
    .catch(error => console.error("Erro ao carregar mensagens", error));
}

//Cores das mensagens do chat
function displayMessage(message, className) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", className);

    let messageText = '';
    if (message.type === 'private_message') {
        messageText = `<strong>${message.from}</strong> reservadamente para <strong>${message.to}</strong>: ${message.text}`;
    } else if (message.type === 'status') {
        messageText = `<strong>${message.from}</strong> ${message.text}`;
    } else {
        messageText = `<strong>${message.from}</strong> para <strong>${message.to}</strong>: ${message.text}`;
    }

    msgDiv.innerHTML = `${message.time} ${messageText}`;
    document.getElementById("messages").appendChild(msgDiv);
}