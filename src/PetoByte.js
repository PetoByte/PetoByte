function startGame () {
    isPlaying = true
    // 0=Tag, 1=Hide&Seek (this is real dogshit)
    game2 = Math.randomRange(0, 1)
    if (game2 == 0) {
        // Tag game
        isIt = Math.randomBoolean()
        if (isIt) {
            basic.showString("TAG! YOU'RE IT!")
            radio.sendString("tag_you_it")
        } else {
            basic.showString("TAG! RUN!")
            radio.sendString("tag_run")
        }
        // Tag gameplay (becuase.)
        basic.pause(2000)
        if (isIt) {
            basic.showArrow(ArrowNames.North)
        } else {
            basic.showIcon(IconNames.Rabbit)
        }
    } else {
        // Hide & Seek game (because)
        basic.showString("HIDE!")
        radio.sendString("hide")
        basic.showIcon(IconNames.House)
        basic.pause(3000)
        basic.showString("SEEK!")
    }
    // End game after 10 seconds
    basic.pause(10000)
    isPlaying = false
    basic.showIcon(IconNames.Happy)
}
// Feed pet (Button A)
input.onButtonPressed(Button.A, function () {
    if (isPlaying) {
        return
    }
    hunger = Math.max(hunger - 30, 0)
    basic.showString("YUM!")
    basic.showIcon(IconNames.Happy)
})
// Radio messages
radio.onReceivedString(function (receivedString) {
    if (receivedString == "tag_you_it") {
        isPlaying = true
        basic.showString("TAG! CHASE!")
        basic.showArrow(ArrowNames.South)
        basic.pause(10000)
        isPlaying = false
        basic.showIcon(IconNames.Happy)
    } else if (receivedString == "tag_run") {
        isPlaying = true
        basic.showString("TAG! RUN!")
        basic.showIcon(IconNames.Rabbit)
        basic.pause(10000)
        isPlaying = false
        basic.showIcon(IconNames.Happy)
    } else if (receivedString == "hide") {
        isPlaying = true
        basic.showString("HIDE?")
        basic.pause(3000)
        basic.showString("SEEK!")
        basic.pause(7000)
        isPlaying = false
        basic.showIcon(IconNames.Happy)
    }
})
// Water pet (Button B)
input.onButtonPressed(Button.B, function () {
    if (isPlaying) {
        return
    }
    thirst = Math.max(thirst - 30, 0)
    basic.showString("WATER!")
    basic.showIcon(IconNames.Happy)
})
// Shake to play games
input.onGesture(Gesture.Shake, function () {
    if (isPlaying) {
        return
    }
    startGame()
})
// Sleep (Logo button) - Restores ALL needs
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (isPlaying) {
        return
    }
    basic.showString("Zzz")
    for (let index = 0; index < 5; index++) {
        hunger = Math.max(hunger - 5, 0)
        thirst = Math.max(thirst - 5, 0)
        energy = Math.min(energy + 20, 100)
        basic.pause(1000)
    }
    basic.showIcon(IconNames.Happy)
})
let isIt = false
let game2 = 0
let isPlaying = false
let energy = 0
let thirst = 0
let hunger = 0
// Pet stats
hunger = 50
thirst = 50
energy = 100
// For tag game
// Setup
radio.setGroup(1)
basic.showIcon(IconNames.Happy)
// Update pet needs
basic.forever(function () {
    if (!(isPlaying)) {
        // Gradually decrease needs
        hunger = Math.min(hunger + 1, 100)
        thirst = Math.min(thirst + 1, 100)
        energy = Math.max(energy - 1, 0)
        // Show status
        if (hunger > 80 || thirst > 80) {
            basic.showIcon(IconNames.Sad)
        } else if (energy < 20) {
            basic.showIcon(IconNames.Asleep)
        } else {
            basic.showIcon(IconNames.Happy)
        }
        // Update every 2 seconds (this needs to happen.)
        basic.pause(2000)
    }
})
