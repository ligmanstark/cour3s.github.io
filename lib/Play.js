const renderGameBlock = (container) => {
    const buttonRock = document.createElement('button');
    buttonRock.textContent = 'Камень';
    buttonRock.classList.add('btn-rock');
    //buttonRock.dataset.weapon = 'rock';
    // container.appendChild(buttonRock);

    const rockImg = document.createElement('img');
    rockImg.classList.add('img');
    rockImg.setAttribute('src', './img/hand_rock.png');

    const rockContainer = document.createElement('div');
    rockContainer.classList.add('img-box');
    rockContainer.appendChild(rockImg);
    rockContainer.appendChild(buttonRock);
    container.appendChild(rockContainer);

    const buttonScissors = document.createElement('button');
    buttonScissors.textContent = 'Ножницы';
    buttonScissors.classList.add('btn-scissor');
    //buttonScissors.dataset.weapon = 'scissor';
    // container.appendChild(buttonScissors);

    const scissorsImg = document.createElement('img');
    scissorsImg.classList.add('img');
    scissorsImg.setAttribute('src', './img/hand_scissors.png');

    const scissorsContainer = document.createElement('div');
    scissorsContainer.classList.add('img-box');
    scissorsContainer.appendChild(scissorsImg);
    scissorsContainer.appendChild(buttonScissors);
    container.appendChild(scissorsContainer);

    const buttonPaper = document.createElement('button');
    buttonPaper.textContent = 'Бумага';
    buttonPaper.classList.add('btn-paper');
    // container.appendChild(buttonPaper);
    //buttonPaper.dataset.weapon = 'paper';

    const paperImg = document.createElement('img');
    paperImg.classList.add('img');
    paperImg.setAttribute('src', './img/hand_paper.png');

    const paperContainer = document.createElement('div');
    paperContainer.classList.add('img-box');
    paperContainer.appendChild(paperImg);
    paperContainer.appendChild(buttonPaper);
    container.appendChild(paperContainer);

    buttonRock.addEventListener('click', () => {
        handleGame('rock');
    });

    buttonScissors.addEventListener('click', () => {
        handleGame('scissors');
    });

    buttonPaper.addEventListener('click', () => {
        handleGame('paper');
    });

    const handleGame = (move) => {
        request({
            url: `${BACKEND_DATE}/play`,
            params: {
                token: window.application.token,
                id: window.application.gameId,
                move: move,
            },
            onSuccess: (data) => {
                if (data.status === 'ok') {
                    const statusCheck = data['game-status'].status;
                    switch (statusCheck) {
                        case 'waiting-for-enemy-move':
                            window.application.renderScreen('wait-enemy-move-render');
                            console.log('ход противника');
                            break;

                        case 'waiting-for-your-move':
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
                } else {
                    console.error(data.message);
                }
                console.log(data);
            },
            onError: (error) => {
                console.error(error.message);
            }
        })

    }



}
window.application.blocks['play'] = renderGameBlock;



const renderPlayScreen = () => {
    const appGame = document.querySelector('.app-game');
    appGame.textContent = '';

    const title = document.createElement('h1');
    title.textContent = 'Поле боя!';

    const paragraph = document.createElement('p');
    paragraph.textContent = '';

    const content = document.createElement('div');
    content.classList.add('play-box');

    window.application.renderBlock('play', content);


    appGame.appendChild(title);
    appGame.appendChild(paragraph);
    appGame.appendChild(content);
}

window.application.screens['play-render'] = renderPlayScreen;