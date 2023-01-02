const renderWinBlock = (container) => {
    const h2 = document.createElement('h2');
    h2.classList.add('win-h2');
    h2.textContent = '';
    container.appendChild(h2);


}
window.application.blocks['win-block'] = renderWinBlock;



const renderReturnBlock = (container) => {

    const buttonLobby = document.createElement('button');
    buttonLobby.classList.add('btn-Lobby-return');
    buttonLobby.textContent = 'Вернуться в лобби';
    container.appendChild(buttonLobby);

    buttonLobby.addEventListener('click', () => {
        window.application.renderScreen('lobby');
    })

}
window.application.blocks['return-block'] = renderReturnBlock;




const renderWinScreen = () => {
    const appGame = document.querySelector('.app-game');
    appGame.textContent = '';

    const title = document.createElement('h1');
    title.textContent = 'Ты победил!';

    const paragraph = document.createElement('p');
    paragraph.textContent = '';

    const content = document.createElement('div');
    content.classList.add('win-box');

    window.application.renderBlock('win-block', content);
    window.application.renderBlock('return-block', content);
    //играть еще >lobby
    window.application.renderBlock('button-play', content);

    appGame.appendChild(title);
    appGame.appendChild(paragraph);
    appGame.appendChild(content);
}

window.application.screens['win-screen'] = renderWinScreen;