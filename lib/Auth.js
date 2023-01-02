
function renderAuthBlock(container) {
    const appGame = document.querySelector('.app-game');
    const errorLength = document.createElement('p');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Ваш Никнейм');
    input.classList.add('inp-auth');
    input.setAttribute('minlength', 5);
    input.setAttribute('required', 'required');



    const button = document.createElement('button');
    button.classList.add('btn-auth');
    button.textContent = 'Войти!';
    //запрос, auth
    const auth = () => {
        if (input.value.length < 5) {
            errorLength.textContent = 'Минимальная длина никнейма 5 символов';
            errorLength.classList.add('length-error')
            errorLength.classList.remove('length-hidden');
            appGame.appendChild(errorLength);
            //alert('Минимальная длина никнейма - 5 символов');
            return;
        } else {
            errorLength.classList.add('length-hidden');
            request({
                url: `${BACKEND_DATE}/login`,
                params: {
                    login: input.value
                },
                onSuccess: (data) => {
                    if (data.status === 'ok') {
                        console.log(data);
                        const token = data.token;
                        window.application.token = token;
                        console.log(token);
                        //чекаем токен
                        request({
                            url: `${BACKEND_DATE}/player-status`,
                            params: {
                                token: token
                            },
                            onSuccess: (data) => {
                                if (data.status === 'ok') {
                                    console.log(data);
                                    if (data['player-status'].status === 'lobby') {
                                        console.log('Лобби');
                                        window.application.renderScreen('lobby');
                                    } else {
                                        console.log('Игра');
                                        window.application.gameId = data['player-status'].game.id;
                                        window.application.renderScreen('play-render');
                                    }

                                } else {
                                    console.error(`Все сломалось! Срочно бегите в Telegram - ${SUPPORT_CONTACT}`);

                                }
                            },
                            onError: (error) => { console.error(error); }
                        })
                    } else {
                        console.error(`Все сломалось! Срочно бегите в Telegram - ${SUPPORT_CONTACT}`);
                    };
                },
                onError: (error) => {
                    console.error(error);
                }
            })
        }
    };
    //активация кнопки
    button.addEventListener('click', auth);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            auth();
        }
    });
    //аппендим детей
    container.appendChild(input);
    container.appendChild(button);
}

// Записываем функцию в поле объекта
window.application.blocks['Auth'] = renderAuthBlock;





function renderAuthScreen() {
    const appGame = document.querySelector('.app-game');
    appGame.textContent = '';

    const title = document.createElement('h1');
    title.textContent = 'Камень, ножницы, бумага';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Вооружайся воин!';
    paragraph.classList.add('nickname-paragraph');

    const content = document.createElement('div');
    content.classList.add('auth-box');
    content.classList.add('snow-container');

    appGame.appendChild(title);
    appGame.appendChild(content);
    content.appendChild(paragraph);

    window.application.renderBlock('Auth', content);


}

// Записываем функцию в поле объекта
window.application.screens['Auth'] = renderAuthScreen;

// Должен вызвать window.application.blocks['example']() 
window.application.renderScreen('Auth');
