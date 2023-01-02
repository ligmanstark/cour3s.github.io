const renderEnemyMoveBlock = (container) => {
    const h2 = document.createElement('h2');
    h2.textContent = 'Ожидаем ход соперника!';
    h2.classList.add('subtitle_enemy-move');
    container.appendChild(h2);
    const intIdWait = setInterval(() => {
        request({
            url: `${BACKEND_DATE}/game-status`,
            params:
            {
                token: window.application.token,
                id: window.application.gameId,
            },
            onSuccess: (data) => {
                if (data.status === 'ok') {
                    const statusCheck = data['game-status'].status;
                    switch (statusCheck) {
                        case 'waiting-for-your-move':
                            window.application.renderScreen('play-render');
                            console.log('твой ход');
                            break;

                        case 'lose':
                            window.application.renderScreen('lose-screen');
                            console.log('проиграл');
                            break;

                        case 'win':
                            window.application.renderScreen('win-screen');
                            console.log('победа');
                            break;
                    }
                }
                else {
                    console.error(data.message);
                }
            }
        })
    }, 500);

    window.application.timers.push(intIdWait);
}
window.application.blocks['wait-enemy-move'] = renderEnemyMoveBlock;



const renderEnemyMoveScreen = () => {
    const appGame = document.querySelector('.app-game');
    appGame.textContent = '';

    const title = document.createElement('h1');
    title.textContent = 'Поле боя!';

    const paragraph = document.createElement('p');
    paragraph.textContent = '';

    const content = document.createElement('div');
    content.classList.add('play-box');

    window.application.renderBlock('wait-enemy-move', content);


    appGame.appendChild(title);
    appGame.appendChild(paragraph);
    appGame.appendChild(content);
}

window.application.screens['wait-enemy-move-render'] = renderEnemyMoveScreen;