window.application = {
    blocks: {},
    screens: {},
    timers: [],
    renderScreen: function (screenName) {
        window.application.timers.forEach(idTimer => {
            clearInterval(idTimer);
        })
        if (window.application.screens[screenName]) {
            window.application.screens[screenName]();
        } else {
            console.error(`Ошибка! Не существует screen - ${Auth}`);
        }
    },

    renderBlock: function (blockName, container) {
        if (window.application.blocks[blockName]) {
            window.application.blocks[blockName](container);

        } else {
            console.error(`Ошибка! Не существует блока - ${blockName}`);
        };
    },

}

