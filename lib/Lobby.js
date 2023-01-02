const renderPlayerBlock = (container) => {
    const ul = document.createElement('ul');
    ul.classList.add('player-lobby');
    container.appendChild(ul);

    const intIdLobby = setInterval(() => {
        request({
            url: `${BACKEND_DATE}/player-list`,
            params: {
                token: window.application.token
            },
            onSuccess: (data) => {
                if (data.status === 'ok') {
                    ul.replaceChildren();
                    data.list.forEach(players => {
                        //     const li = document.createElement('li');
                        //     li.classList.add('player-list-lobby');
                        //     li.textContent = `${players.login} ${players.wins} / ${players.loses}`;
                        //     ul.appendChild(li);
                        // });
                        const liNameBox = document.createElement('div');
                        liNameBox.classList.add('li-box-lobby');
                        const liName = document.createElement('li');
                        liName.classList.add('player-list-lobby');
                        liName.textContent = `${players.login}`;
                        liNameBox.appendChild(liName);

                        const liStat = document.createElement('li');
                        liStat.classList.add('player-list-lobby-stats');
                        liStat.textContent = `В:${players.wins}  /  П:${players.loses}`;
                        liNameBox.appendChild(liStat);
                        ul.appendChild(liNameBox);

                    });
                    console.log(data);
                } else {
                    console.error('Все сломалось в Лобби!');
                }

            }
        })
    }, 1000);

    window.application.timers.push(intIdLobby);

}
window.application.blocks['players-list'] = renderPlayerBlock;



function renderPlayBlock(container) {
    const button = document.createElement('button');
    button.classList.add('btn-play');
    button.textContent = 'Играть';
    const playActive = () => {
        request({
            url: `${BACKEND_DATE}/start`,
            params: {
                token: window.application.token
            },
            onSuccess: (data) => {
                if (data.status === 'ok') {
                    window.application.gameId = data['player-status'].game.id;
                    window.application.renderScreen('wait-game');
                    console.log(`id боя - ${data['player-status'].game.id}`);

                } else {
                    console.error(`Что - то сломалось в Start - ${data.message}`);
                }
            }
        })
    }

    button.addEventListener('click', playActive);

    container.appendChild(button);

}
window.application.blocks['button-play'] = renderPlayBlock;


const renderLobbyScreen = () => {
    const appGame = document.querySelector('.app-game');
    appGame.textContent = '';

    const title = document.createElement('h1');
    title.textContent = 'Лобби';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Рискни всем!';
    paragraph.classList.add('nickname-paragraph');

    const content = document.createElement('div');
    content.classList.add('lobby-box');

    appGame.appendChild(title);
    content.appendChild(paragraph);
    appGame.appendChild(content);

    window.application.renderBlock('players-list', content);
    window.application.renderBlock('button-play', content);


}

window.application.screens['lobby'] = renderLobbyScreen;


