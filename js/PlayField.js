class PlayField {
    constructor(game) {
        this.game = game;
        this.audioCtx;
        this.button1 = new Button(this, 1, "blue", 523);
        this.button2 = new Button(this, 2, "red", 392);
        this.button3 = new Button(this, 3, "yellow", 329);
        this.button4 = new Button(this, 4, "green", 440);
        this.startButton;
    }
    init() {
        this._addButtons();
        this.startButton = this._createStartButton();
        this._addModes();
    }
    _addButtons() {
        const table = document.createElement('table');
        table.id = "play-field";
        document.body.appendChild(table);
        for (let i = 0; i < 2; i++) {
            const row = document.createElement('tr');
            table.appendChild(row);
            for (let j = 0; j < 2; j++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
                const id = j + 2 * i + 1;
                cell.dataset.number = id;
                cell.appendChild(this[`button${id}`].buttonElem);
            }
        }
    }
    _createStartButton() {
        const startButton = document.createElement('button');
        startButton.innerHTML = "START";
        document.body.appendChild(startButton);
        startButton.addEventListener("click", () => {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.game.newRound();
            this.startButton.setAttribute('disabled', true);
        })
        return startButton;
    }
    _addModes() {
        const modes = [
            { id: "mode-easy", value: "easy", label: "Легкий" },
            { id: "mode-normal", value: "normal", label: "Средний" },
            { id: "mode-hard", value: "hard", label: "Сложный" },
        ];

        for (const mode of modes) {
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.id = mode.id;
            radioInput.name = "mode";
            radioInput.value = mode.value;
            radioInput.addEventListener('input', event => {
                this.game.modeChanged(event.target.value);
            });

            const label = document.createElement("label");
            label.for = mode.id;
            label.textContent = mode.label;

            document.body.appendChild(radioInput);
            document.body.appendChild(label);
        }
        document.getElementById('mode-easy').setAttribute('checked', true);
    }
    pressButton(id) {
        this[`button${id}`].press();
    }
    buttonClicked(id) {
        this.game.buttonClicked(id);
    }
    showStartButton() {
        this.startButton.removeAttribute('disabled');
    }
}