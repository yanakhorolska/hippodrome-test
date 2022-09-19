const horses = [
    'Secretariat',
    'Eclipse',
    'West Australian',
    'Flying fox',
    'Seabiscuit',
];

let raceCounter = 0;
const refs = {
    startBtn: document.querySelector('.js-start-race'),
    winnerField: document.querySelector('.js-winner'),
    progressField: document.querySelector('.js-progress'),
    tableBody: document.querySelector('.js-results-table > tbody'),
};

refs.startBtn.addEventListener('click', () => {
    raceCounter += 1;
    const promises = horses.map(run);
    updateWinnerField('');
    updateProgressField('🤠 Заїзд розпочався, ставки не приймаються.');
    Promise.race(promises).then(({ horse, time }) => {
        updateWinnerField(`🏅 Переміг ${horse}, фінішувавши за ${time}`);
        updateResultsTable({ horse, time, raceCounter });
    });
    Promise.all(promises).then(() => updateProgressField('🏇🏿 Заїзд скінчився, приймаються ставки'));
    
})

function updateWinnerField(message) {
    refs.winnerField.textContent = message;
}

function updateProgressField(message) {
    refs.progressField.textContent = message;
}

function updateResultsTable({ horse, time }) {
    const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
    refs.tableBody.insertAdjacentHTML('beforeend', tr);
}



function run(horse) {
    return new Promise((resolve) => {
        const time = getRandomTime(2000, 4500);

        setTimeout(() => {
            resolve({ horse, time });
        }, time);
    });
}

function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}