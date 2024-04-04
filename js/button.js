class Button {
    constructor(playField, id, color, soundFrequency) {
        this.playField = playField;
        this.id = id;
        this.color = color;
        this.soundFrequency = soundFrequency;
        this.buttonElem = this._createElem();
    }
    _createElem() {
        const elem = document.createElement('div');
        elem.className = "button"
        elem.id = `button-${this.id}`;
        elem.style.backgroundColor = this.color;
        elem.addEventListener("click", () => {
            this.press();
            this.playField.buttonClicked(this.id);
        })
        return elem;
    }
    press() {
        this.blink();
        this.playNote();
    }
    blink() {
        this.buttonElem.style.opacity = 0.3;
        setTimeout(() => {
            this.buttonElem.style.opacity = 1;
        }, 200);
    }
    playNote() {
        const duration = 0.2;
        const oscillator = this.playField.audioCtx.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.value = this.soundFrequency; // value in hertz
        oscillator.connect(this.playField.audioCtx.destination);
        oscillator.start(0);
        oscillator.stop(this.playField.audioCtx.currentTime + duration);
    }
}