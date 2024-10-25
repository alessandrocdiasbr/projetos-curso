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

