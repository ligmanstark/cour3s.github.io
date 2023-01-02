const renderLoseBlock = (container) => {
    const h2 = document.createElement('h2');
    h2.classList.add('lose-h2');
    h2.textContent = '';
    container.appendChild(h2);


}
window.application.blocks['lose-block'] = renderLoseBlock;


const renderLoseScreen = () => {
    const appGame = document.querySelector('.app-game');
    appGame.textContent = '';

    const title = document.createElement('h1');
    title.textContent = 'Ты проиграл!';

    const paragraph = document.createElement('p');
    paragraph.textContent = '';

    const content = document.createElement('div');
    content.classList.add('lose-box');

    window.application.renderBlock('lose-block', content);
    window.application.renderBlock('return-block', content);
    //играть еще >lobby
    window.application.renderBlock('button-play', content);

    appGame.appendChild(title);
    appGame.appendChild(paragraph);
    appGame.appendChild(content);
}

window.application.screens['lose-screen'] = renderLoseScreen;