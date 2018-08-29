# A simple textbased gamepad tester for 1 to n gamepad instances

Test-Link: https://rsteam02.github.io/GamepadTester/


+ 28.08:
    - navigate all gamepads with gamepad listener, push in array => window.addEventListener("gamepadconnected", () =>{});     
    - get device name strings => navigator.getGamepads()[e.gamepad.index].id
    - track all controls in a requestAnimationFrame loop for each instance (works currently only on Firefox)
    - when disconnected, remove the gamepad with the certain index from array, show info  => window.addEventListener(("gamepaddisconnected", () =>{});
      