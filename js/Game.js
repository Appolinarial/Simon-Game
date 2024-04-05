class Game {
    constructor() {
        this.sequence = [];
        this.playerSequence = [];
        this.round = 0;
        this.tempo = 1;
        this.playField = new PlayField(this);
        this.playField.init();
        this.modes = { easy: 1500, normal: 1000, hard: 400 };
        this.currentMode = this.modes.easy;
    }
    newRound() {
        this.round++;
        this.playerSequence = [];
        this.sequence.push(Math.floor(Math.random() * 4) + 1);
        this.sequence.forEach((id, i) => {
            setTimeout(() => {
                this.playField.pressButton(id);
            }, (i + 1) * this.currentMode);
        });
    }
    buttonClicked(id) {
        this.playerSequence.push(id);
        if (this.playerSequence[this.playerSequence.length - 1] !== this.sequence[this.playerSequence.length - 1]) {
            alert('Game over! You reached round ' + this.round + '.');
            this.sequence = [];
            this.playerSequence = [];
            this.round = 0;
            this.playField.showStartButton();
        } else if (this.playerSequence.length === this.sequence.length) {
            this.newRound();
        }
    }
    modeChanged(mode) {
        this.currentMode = this.modes[mode];
    }
}
