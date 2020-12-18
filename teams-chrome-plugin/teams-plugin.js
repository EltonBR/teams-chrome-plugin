class MicIndicator {
    divRef = null;
    interval = null;
    constructor() {
        let div = document.createElement("div");
        div.id = "div-animated-indicator";
        this.divRef = div;
        document.body.appendChild(div)
    }

    show() {
        if (this.divRef !== null) {
            this.divRef.style.display = "block";
        }
    }

    hide() {
        if (this.divRef !== null) {
            this.divRef.style.display = "none";
        }
    }

    watchMicChanges() {
        this.interval = setInterval(() => {
            let micBtn = document.querySelector("#microphone-button .icons-call-microphone-off-filled") ?? document.querySelector("#microphone-button .icons-call-microphone")
            if (micBtn === null) {
                this.hide();
                return;
            }
            let isMuted = [...micBtn.classList].indexOf("icons-call-microphone-off-filled") > -1;
            if (!isMuted) {
                this.show();
            } else {
                this.hide();
            }
        }, 500);
    }

    stopMicChanges() {
        if(this.interval !== null) {
            clearInterval(this.interval);
        }
    }
} 

var isPressed = false;

const pushToTalkEvent = (e) => {
    if (e.code !== 'AltRight') {
        return;
    }

    if (isPressed && e.type == "keydown") {
        return;
    }

    console.log()

    const mute = (mute) => {
        var micBtn = document.querySelector("#microphone-button .icons-call-microphone-off-filled") ?? document.querySelector("#microphone-button .icons-call-microphone")
        isMuted = [...micBtn.classList].indexOf("icons-call-microphone-off-filled") > -1;
        if (mute) {
            if (isMuted) {
                return false;
            }
            micBtn.parentElement.click();
            return true;
        }
        if (!isMuted) {
            return false;
        }
        micBtn.parentElement.click();
        return true;
    };

    if (e.type == "keydown") {
        mute(false);
    } else if (e.type == "keyup") {
        mute(true);
    }

    //dry
    if(e.type == "keydown") {
        isPressed = true;
    } else {
        isPressed = false;
    }
};

window.addEventListener("load", () => {
    micIndicatorInstance = new MicIndicator();
    micIndicatorInstance.watchMicChanges();
    window.addEventListener("keydown", pushToTalkEvent)
    window.addEventListener("keyup", pushToTalkEvent)
});

