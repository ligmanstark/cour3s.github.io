const renderWaitVS = (container) => {
    const h2 = document.createElement('h2');
    h2.textContent = 'Ожидаем достойного противника!';
    h2.classList.add('subtitle_wait-VS');
    container.appendChild(h2);
    const intIdWait = setInterval(() => {
        request({
            url: `${BACKEND_DATE}/game-status`,
            params: {
                token: window.application.token,
                id: window.application.gameId,
            },
            onSuccess: (data) => {
                if (data.status === 'ok') {
                    if (data['game-status'].status !== 'waiting-for-start') {
                        //отрисовываем экран хода
                        window.application.renderScreen('play-render')
                    } else {
                        //ожидаем противника
                    }
                } else {
                    console.error(data.message);
                }
            }
        })
    }, 500);

    window.application.timers.push(intIdWait);


}

window.application.blocks['wait-autm'] = renderWaitVS;

const renderWaitScreen = () => {
    const appGame = document.querySelector('.app-game');
    appGame.textContent = '';

    const title = document.createElement('h1');
    title.textContent = '';

    const paragraph = document.createElement('p');
    paragraph.textContent = '';

    const content = document.createElement('div');
    content.classList.add('wait-box');

    window.application.renderBlock('wait-autm', content);


    appGame.appendChild(title);
    appGame.appendChild(paragraph);
    appGame.appendChild(content);
}

window.application.screens['wait-game'] = renderWaitScreen;