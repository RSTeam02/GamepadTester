# A simple textbased gamepad tester for 1 to n gamepad instances

Test-Link: https://rsteam02.github.io/GamepadTester/

+ 31.08:
    - remove empty device name string tag after disconnect

+ 28.08:
    - navigate all gamepads (navigator.getGamepads()) with gamepad listener, push gamepad in array => window.addEventListener("gamepadconnected", () =>{});     
    - get device name strings => navigator.getGamepads()[e.gamepad.index].id
    - track all controls in a requestAnimationFrame loop for each instance (works currently only on Firefox)
    - when disconnected, remove the gamepad object with the certain index from array, show "gamepad[index] disconnected" info  => window.addEventListener(("gamepaddisconnected", () =>{});
      