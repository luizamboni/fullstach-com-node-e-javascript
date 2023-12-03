function createUserBar(userName) {
    const userBarDiv = document.getElementById('userBar');

    userBarDiv.className = 'user-bar';
    userBarDiv.innerHTML = `
        <span class="user-name">${userName}</span>
        <button class="logout-button" onclick="logout()">Deslogar</button>
    `;
}

function logout() {
    document.cookie = ""
    window.location.href = "/"
}


function createErrorOverlay(message, href) {

    if (document.getElementById('errorOverlay')) {
        return
    }

    const overlayDiv = document.createElement('div')
    overlayDiv.id = 'errorOverlay'
    overlayDiv.style.display = 'none'
    overlayDiv.style.position = 'fixed'
    overlayDiv.style.top = '0'
    overlayDiv.style.left = '0'
    overlayDiv.style.width = '100%'
    overlayDiv.style.height = '100%'
    overlayDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
    overlayDiv.style.display = 'flex'
    overlayDiv.style.justifyContent = 'center'
    overlayDiv.style.alignItems = 'center'
    overlayDiv.style.zIndex = '1000'

    // Criação do modal de erro
    const modalDiv = document.createElement('div')
    modalDiv.className = 'error-modal'
    modalDiv.style.backgroundColor = 'white'
    modalDiv.style.padding = '20px'
    modalDiv.style.borderRadius = '5px'
    modalDiv.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)'
    modalDiv.style.textAlign = 'center'

    // Criação do conteúdo do modal
    const errorTitle = document.createElement('h2')
    errorTitle.innerText = 'Erro'
    const errorMessage = document.createElement('p')
    errorMessage.id = 'errorMessage'
    errorMessage.innerText = 'Algo deu errado.'

    const backButton = document.createElement('button')
    backButton.innerText = 'Voltar'
    backButton.style.marginTop = '15px'
    backButton.style.padding = '10px 20px'
    backButton.style.backgroundColor = '#007bff'
    backButton.style.color = 'white'
    backButton.style.border = 'none'
    backButton.style.borderRadius = '5px'
    backButton.style.cursor = 'pointer'
    backButton.onclick = function() {
        overlayDiv.style.display = 'none'
        window.location.href = href
    };

    // Montagem do modal no DOM
    modalDiv.appendChild(errorTitle)
    modalDiv.appendChild(errorMessage)
    modalDiv.appendChild(backButton)
    overlayDiv.appendChild(modalDiv)

    document.body.appendChild(overlayDiv)
    document.getElementById('errorMessage').innerText = message
    overlayDiv.style.display = 'flex'
}

function hideError() {
    overlayDiv.style.display = 'none'
}