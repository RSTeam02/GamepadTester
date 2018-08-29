export class Controller {
    /**
     * @author sakaijun
     * 
     * simple testprogram to test one or more input device(s) (gamepads, joysticks)     
     * 
     */
    constructor() {
        this.gamepadSet = [];
        this.gamePadListener();
        this.testLoop();

    }

    gamePadListener() {
        /**
         * check connected gamecontroller device(s)
         * add gamepad obj into array, insert pre tags for displaying input device string  
         */
        window.addEventListener("gamepadconnected", (e) => {
            var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
            this.gamepadSet.push(gamepads[e.gamepad.index]);
            let connIdx = e.gamepad.index;
            let insertAfter = (connIdx > 0) ? `#gpInfo${connIdx - 1}` : "h1";
            $(`<pre class = "gpSet" id = "gpInfo${connIdx}"></pre>`).insertAfter($(insertAfter));
            $(".gpSet").css({ "margin": "0" });
            $(`#gpInfo${connIdx}`).html(`Gamepad${connIdx} connected: ${this.gamepadSet[connIdx].id}`);
            (gamepads.length == 1)
                ? $(`<pre id = "ctrlInfo${connIdx}" class="ctrlInfo"></pre>`).insertAfter($(".gpSet").last())
                : $(`<pre id = "ctrlInfo${connIdx}" class="ctrlInfo"></pre>`).insertAfter($(".ctrlInfo").last());
        });

        /*
         * check disconnected gamecontroller device(s)
         * delete (splice) gamepad obj from array by input device index and remove pre tags related to it
         */
        window.addEventListener("gamepaddisconnected", (e) => {
            let disconnIdx = e.gamepad.index;
            this.gamepadSet.splice(disconnIdx, 1);
            $(`#gpInfo${disconnIdx}`).html(`Gamepad${disconnIdx} disconnected`);
            setTimeout(() => {
                $(`#gpInfo${disconnIdx}`).remove();
            }, 1000);
        });
    }

    /**
     * display every input of one or many gamecontroller device(s) in a requestAnim-loop
     * 
     */
    testLoop() {        
        if (this.gamepadSet.length !== 0) {
            let str = [];
            this.gamepadSet.forEach((gamepad) => {
               this.ctrlInfo(gamepad, str);
            });
        }
        window.requestAnimationFrame(() => { this.testLoop(); });
    }


    ctrlInfo(gamepad, str){
        let currIdx = gamepad.index;
        str[currIdx] = "";
        gamepad.axes.forEach((axis, i) => {
            if (axis !== 0) {
                str[currIdx] += `\nGamepad${currIdx}: axis${i}: ${axis}`;
            }
        });
        gamepad.buttons.forEach((button, i) => {
            if (button.pressed) {
                str[currIdx] += `\nGamepad${currIdx}: Pressed Button${i}`;
            }
        });
        $(`#ctrlInfo${currIdx}`).html(str[currIdx]);
    }

}