window.onload = init;

// const fs = require('fs');
// const path = require('path');

const { fs, path } = window.electron;

// const mainPath = path.join(__dirname, '..', '..', 'Stream Tool', 'Resources', 'Texts');

// Global Variables
let currentP1WL = "Nada";
let currentP2WL = "Nada";
let currentBestOf = "Bo5";

const wlButtons1 = document.getElementById("wlButtons1");
const wlButtons2 = document.getElementById('wlButtons2');

const viewport = document.getElementById('viewport');

const p1NameInp = document.getElementById('p1Name');
const p1TagInp = document.getElementById('p1Tag');
const p2NameInp = document.getElementById('p2Name');
const p2TagInp = document.getElementById('p2Tag');

// const p1PFP = document.getElementById('p1PFP');
// const p2PFP = document.getElementById('p2PFP');

const p1PFP = document.getElementById('file1');
const previewContainer1 = document.getElementById('preview1');
const previewImage1 = previewContainer1.querySelector('.image-preview__image');
const previewDefaultText1 = previewContainer1.querySelector('.image-preview__default-text');

const p2PFP = document.getElementById('file2');
const previewContainer2 = document.getElementById('preview2');
const previewImage2 = previewContainer2.querySelector('.image-preview__image');
const previewDefaultText2 = previewContainer2.querySelector('.image-preview__default-text');


const p1Win1 = document.getElementById('winP1-1');
const p1Win2 = document.getElementById('winP1-2');
const p1Win3 = document.getElementById('winP1-3');
const p2Win1 = document.getElementById('winP2-1');
const p2Win2 = document.getElementById('winP2-2');
const p2Win3 = document.getElementById('winP2-3');

const p1W = document.getElementById('p1W');
const p1L = document.getElementById('p1L');
const p2W = document.getElementById('p2W');
const p2L = document.getElementById('p2L');

const roundInp = document.getElementById('roundName');

function init() {
    checkRound();
    // Listener for update button
    document.getElementById('updateRegion').addEventListener("click", writeScoreboard);

    // Move viewport to the center to avoid animation bugs
    viewport.style.right = "100%";

    p1PFP.addEventListener("change", showImage1);
    p2PFP.addEventListener("change", showImage2);
    previewImage1.addEventListener("click", removeImage1);
    previewImage2.addEventListener("click", removeImage2);
    // Score Checks
    p1Win1.addEventListener("click", changeScoreTicks1);
    p2Win1.addEventListener("click", changeScoreTicks1);
    p1Win2.addEventListener("click", changeScoreTicks2);
    p2Win2.addEventListener("click", changeScoreTicks2);
    p1Win3.addEventListener("click", changeScoreTicks3);
    p2Win3.addEventListener("click", changeScoreTicks3);

    // Listeners for [W] and [L] buttons
    p1W.addEventListener("click", setWLP1);
    p1L.addEventListener("click", setWLP1);
    p2W.addEventListener("click", setWLP2);
    p2L.addEventListener("click", setWLP2);



    // Check player names for skin
    p1NameInp.addEventListener("input", resizeInput);
    p2NameInp.addEventListener("input", resizeInput);

    // Resize box when user types
    p1TagInp.addEventListener("input", resizeInput);
    p2TagInp.addEventListener("input", resizeInput);

    // Set click listeners to change the "best of" status
    document.getElementById("bo1Div").addEventListener("click", changeBestOf);
    document.getElementById("bo3Div").addEventListener("click", changeBestOf);
    document.getElementById("bo5Div").addEventListener("click", changeBestOf);

    // Initialize Values
    document.getElementById("bo5Div").style.backgroundImage = "linear-gradient(to top, #575757, #00000000)";
    document.getElementById("bo3Div").style.color = "var(--text2)";
    document.getElementById("bo1Div").style.color = "var(--text2)";

    // Check if round is Grand Finals
    roundInp.addEventListener("input", checkRound);

    // Add a listener to the swap button
    document.getElementById('swapButton').addEventListener("click", swap);
    // Add a listener to the clear button
    document.getElementById('clearButton').addEventListener("click", clearPlayers);
}

function showImage1() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        previewDefaultText1.style.display = "none";
        previewImage1.style.display = "block";
        reader.addEventListener("load", function () {
            if (previewImage1) {
                console.log('true');
                previewImage1.setAttribute("src", this.result);
            } else {
                console.log('false');
            }
            // previewImage1.setAttribute("src", this.result); // original
        });

        reader.readAsDataURL(file);
    }
}

function showImage2() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        previewDefaultText2.style.display = "none";
        previewImage2.style.display = "block";
        reader.addEventListener("load", function () {
            if (previewImage2) {
                console.log('true');
                previewImage2.setAttribute("src", this.result);
            } else {
                console.log('false');
            }
            // previewImage2.setAttribute("src", this.result); // original
        });

        reader.readAsDataURL(file);
    }
}

function removeImage1() {
    document.getElementById('file1').value = "";
    if (!previewImage1.src.endsWith('index.html')) {
        console.log('pog1');
        previewImage1.setAttribute("src", ""); // remove if statement for original
    } else {
        console.log('elsepog1');
        console.log(previewImage1);
    }

    previewImage1.style.display = "none";
    previewDefaultText1.style.display = "block";
}

function removeImage2() {
    document.getElementById('file2').value = "";
    if (!previewImage2.src.endsWith('index.html')) {
        console.log('pog2');
        previewImage2.setAttribute("src", ""); // remove if/else statement for original
    } else {
        console.log('elsepog2');
        console.log(previewImage2);
    }
    previewImage2.style.display = "none";
    previewDefaultText2.style.display = "block";
}

function moveViewport() {
    if (!movedSettings) {
        viewport.style.right = "140%";
        document.getElementById('overlay').style.opacity = "25%";
        document.getElementById('goBack').style.display = "block"
        movedSettings = true;
    }
}

function goBack() {
    viewport.style.right = "100%";
    document.getElementById('overlay').style.opacity = "100%";
    document.getElementById('goBack').style.display = "none";
    movedSettings = false;
}

//whenever clicking on the first score tick
function changeScoreTicks1() {
    let pNum = 1;
    if (this == p2Win1) {
        pNum = 2;
    }

    //deactivate wins 2 and 3
    document.getElementById('winP' + pNum + '-2').checked = false;
    document.getElementById('winP' + pNum + '-3').checked = false;
}
//whenever clicking on the second score tick
function changeScoreTicks2() {
    let pNum = 1;
    if (this == p2Win2) {
        pNum = 2;
    }

    //deactivate wins 2 and 3
    document.getElementById('winP' + pNum + '-1').checked = true;
    document.getElementById('winP' + pNum + '-3').checked = false;
}
//something something the third score tick
function changeScoreTicks3() {
    let pNum = 1;
    if (this == p2Win3) {
        pNum = 2;
    }

    //deactivate wins 2 and 3
    document.getElementById('winP' + pNum + '-1').checked = true;
    document.getElementById('winP' + pNum + '-2').checked = true;
}

//returns how much score does a player have
function checkScore(tick1, tick2, tick3) {
    let totalScore = 0;

    if (tick1.checked) {
        totalScore++;
    }
    if (tick2.checked) {
        totalScore++;
    }
    if (tick3.checked) {
        totalScore++;
    }

    return totalScore;
}

//gives a victory to player 1 
function giveWinP1() {
    if (p1Win2.checked) {
        p1Win3.checked = true;
    } else if (p1Win1.checked) {
        p1Win2.checked = true;
    } else if (!p1Win1.checked) {
        p1Win1.checked = true;
    }
}
//same with P2
function giveWinP2() {
    if (p2Win2.checked) {
        p2Win3.checked = true;
    } else if (p2Win1.checked) {
        p2Win2.checked = true;
    } else if (!p2Win1.checked) {
        p2Win1.checked = true;
    }
}

function setWLP1() {
    if (this == p1W) {
        currentP1WL = "W";
        this.style.color = "var(--text1)";
        p1L.style.color = "var(--text2)";
        this.style.backgroundImage = "linear-gradient(to top, #575757, #00000000)";
        p1L.style.backgroundImage = "var(--bg4)";
    } else {
        currentP1WL = "L";
        this.style.color = "var(--text1)";
        p1W.style.color = "var(--text2)";
        this.style.backgroundImage = "linear-gradient(to top, #575757, #00000000)";
        p1W.style.backgroundImage = "var(--bg4)";
    }
}
function setWLP2() {
    if (this == p2W) {
        currentP2WL = "W";
        this.style.color = "var(--text1)";
        p2L.style.color = "var(--text2)";
        this.style.backgroundImage = "linear-gradient(to top, #575757, #00000000)";
        p2L.style.backgroundImage = "var(--bg4)";
    } else {
        currentP2WL = "L";
        this.style.color = "var(--text1)";
        p2W.style.color = "var(--text2)";
        this.style.backgroundImage = "linear-gradient(to top, #575757, #00000000)";
        p2W.style.backgroundImage = "var(--bg4)";
    }
}

function deactivateWL() {
    currentP1WL = "Nada";
    currentP2WL = "Nada";
    document.getElementById;

    pWLs = document.getElementsByClassName("wlBox");
    for (let i = 0; i < pWLs.length; i++) {
        pWLs[i].style.color = "var(--text2)";
        pWLs[i].style.backgroundImage = "var(--bg4)";
    }
}


//same code as above but just for the player tag
function resizeInput() {
    changeInputWidth(this);
}

//changes the width of an input box depending on the text
function changeInputWidth(input) {
    input.style.width = getTextWidth(input.value,
        window.getComputedStyle(input).fontSize + " " +
        window.getComputedStyle(input).fontFamily
    ) + 12 + "px";
}


//used to get the exact width of a text considering the font used
function getTextWidth(text, font) {
    let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
}


//used when clicking on the "Best of" buttons
function changeBestOf() {
    let theOtherBestOf1; // We need to track the other best-of
    let theOtherBestOf2; // Track another element for bo1Div

    if (this == document.getElementById("bo5Div")) {
        currentBestOf = "Bo5";
        theOtherBestOf1 = document.getElementById("bo1Div");
        theOtherBestOf2 = document.getElementById("bo3Div");
        p1Win3.style.display = "block";
        p2Win3.style.display = "block";
        p1Win2.style.display = "block";
        p2Win2.style.display = "block";
    } else if (this == document.getElementById("bo3Div")) {
        currentBestOf = "Bo3";
        theOtherBestOf1 = document.getElementById("bo1Div");
        theOtherBestOf2 = document.getElementById("bo5Div");
        // Hide or show any elements specific to "Bo1" if necessary
        p1Win3.style.display = "none";
        p2Win3.style.display = "none";
        p1Win2.style.display = "block";
        p2Win2.style.display = "block";
    } else {
        currentBestOf = "Bo1";
        theOtherBestOf1 = document.getElementById("bo3Div");
        theOtherBestOf2 = document.getElementById("bo5Div");
        p1Win3.style.display = "none";
        p2Win3.style.display = "none";
        p1Win2.style.display = "none";
        p2Win2.style.display = "none";
    }
    // Change the color and background of the buttons
    this.style.color = "var(--text1)";
    this.style.backgroundImage = "linear-gradient(to top, #575757, #00000000)";
    theOtherBestOf1.style.color = "var(--text2)";
    theOtherBestOf1.style.backgroundImage = "var(--bg4)";
    theOtherBestOf2.style.color = "var(--text2)";
    theOtherBestOf2.style.backgroundImage = "var(--bg4)";
}

function checkRound() {
    const wlButtons = document.getElementsByClassName("wlButtons");
    if (roundInp.value.toLocaleUpperCase().includes("Grand".toLocaleUpperCase())) {
        for (let i = 0; i < wlButtons.length; i++) {
            wlButtons[i].style.display = "inline";
        }
    } else {
        for (let i = 0; i < wlButtons.length; i++) {
            wlButtons[i].style.display = "none";
            deactivateWL();
        }
    }
}

function updatePlayerStyles(playerWL, playerW, playerL) {
    if (playerWL == 'W') {
        playerW.style.color = "var(--text1)";
        playerL.style.color = "var(--text2)";
        playerW.style.backgroundImage = "linear-gradient(to top, #575757, #00000000)";
        playerL.style.backgroundImage = "var(--bg4)";
    } else {
        playerL.style.color = "var(--text1)";
        playerW.style.color = "var(--text2)";
        playerL.style.backgroundImage = "linear-gradient(to top, #575757, #00000000)";
        playerW.style.backgroundImage = "var(--bg4)";
    }
}

function resetPlayerStyles(playerW, playerL) {
    playerW.style.color = "var(--text2)";
    playerL.style.color = "var(--text2)";
    playerW.style.backgroundImage = "var(--bg4)";
    playerL.style.backgroundImage = "var(--bg4)";
}

function swap() {
    // Swap Preview Images and set style accordingly
    const tmpSrc = previewImage1.src;
    previewImage1.src = previewImage2.src;
    previewImage2.src = tmpSrc;

    if (!previewImage1.src.endsWith("index.html")) {
        previewImage1.style.display = 'block';
        previewDefaultText1.style.display = 'none';
    } else {
        previewImage1.style.display = 'none';
        previewDefaultText1.style.display = 'block';
    }

    if (!previewImage2.src.endsWith("index.html")) {
        previewImage2.style.display = 'block';
        previewDefaultText2.style.display = 'none';
    } else {
        previewImage2.style.display = 'none';
        previewDefaultText2.style.display = 'block';
    }

    // Swapping W/L Status and Selections

    tempP1WL = currentP1WL;
    currentP1WL = currentP2WL;
    currentP2WL = tempP1WL;

    if (currentP1WL != "Nada" && currentP2WL != "Nada") {
        updatePlayerStyles(currentP1WL, p1W, p1L);
        updatePlayerStyles(currentP2WL, p2W, p2L);
    } else {
        if (currentP1WL == "Nada") {
            resetPlayerStyles(p1W, p1L);
        } else {
            updatePlayerStyles(currentP1WL, p1W, p1L);
        }

        if (currentP2WL == "Nada") {
            resetPlayerStyles(p2W, p2L);
        } else {
            updatePlayerStyles(currentP2WL, p2W, p2L);
        }
    }

    let tempP1Name = p1NameInp.value;
    let tempP1Team = p1TagInp.value;
    let tempP2Name = p2NameInp.value;
    let tempP2Team = p2TagInp.value;

    p1NameInp.value = tempP2Name;
    p1TagInp.value = tempP2Team;
    p2NameInp.value = tempP1Name;
    p2TagInp.value = tempP1Team;

    changeInputWidth(p1NameInp);
    changeInputWidth(p1TagInp);
    changeInputWidth(p2NameInp);
    changeInputWidth(p2TagInp);

    tempP1Score = checkScore(p1Win1, p1Win2, p1Win3);
    tempP2Score = checkScore(p2Win1, p2Win2, p2Win3);
    setScore(tempP2Score, p1Win1, p1Win2, p1Win3);
    setScore(tempP1Score, p2Win1, p2Win2, p2Win3);

    // Swap file inputs
    let tempFile = document.getElementById('file1').files;
    document.getElementById('file1').files = document.getElementById('file2').files;
    document.getElementById('file2').files = tempFile;
}

function clearPlayers() {
    //clear player texts
    p1TagInp.value = "";
    p1NameInp.value = "";
    p2TagInp.value = "";
    p2NameInp.value = "";
    changeInputWidth(p1TagInp);
    changeInputWidth(p1NameInp);
    changeInputWidth(p2TagInp);
    changeInputWidth(p2NameInp);

    //clear player scores
    let checks = document.getElementsByClassName("scoreCheck");
    for (let i = 0; i < checks.length; i++) {
        checks[i].checked = false;
    }

    // Clear player profile pictures

    removeImage1();
    removeImage2();

    resetPlayerStyles(p1W, p1L);
    resetPlayerStyles(p2W, p2L);
    currentP1WL = "Nada";
    currentP2WL = "Nada";
}

function setScore(score, tick1, tick2, tick3) {
    tick1.checked = false;
    tick2.checked = false;
    tick3.checked = false;
    if (score > 0) {
        tick1.checked = true;
        if (score > 1) {
            tick2.checked = true;
            if (score > 2) {
                tick3.checked = true;
            }
        }
    }
}

function writeScoreboard() {
    let p1File = document.getElementById('file1').files[0];
    let p2File = document.getElementById('file2').files[0];
    let streamToolDirectory = './resources/Stream Tool/Resources';
    let textsFolder = `${streamToolDirectory}/Texts/Simple Texts`

    fetch('../resources/Stream Tool/Resources/Player Icons/black.png')
        .then(response => response.blob())
        .then(blob => {
            let defaultFile = new File([blob], 'black.png', { type: 'image/png' });
            // console.log(defaultFile); // Check if the file is loaded correctly

            let scoreboardJson = {
                p1Name: p1NameInp.value,
                p1Team: p1TagInp.value,
                p1Pic: p1File ? p1File.lastModified : "",
                p1Score: checkScore(p1Win1, p1Win2, p1Win3),
                p1WL: currentP1WL,
                p2Name: p2NameInp.value,
                p2Team: p2TagInp.value,
                p2Pic: p2File ? p2File.lastModified : "",
                p2Score: checkScore(p2Win1, p2Win2, p2Win3),
                p2WL: currentP2WL,
                bestOf: currentBestOf,
                round: roundInp.value,
                tournamentName: document.getElementById('tournamentName').value,
                caster1Name: document.getElementById('cName1').value,
                caster1Bluesky: document.getElementById('cbsky1').value,
                caster1Twitch: document.getElementById('cTwitch1').value,
                caster2Name: document.getElementById('cName2').value,
                caster2Bluesky: document.getElementById('cbsky2').value,
                caster2Twitch: document.getElementById('cTwitch2').value,
            };

            let data = JSON.stringify(scoreboardJson, null, 2);


            fs.writeFileSync(path.join(streamToolDirectory, "Texts", "ScoreboardInfo.json"), data);

            //simple .txt files
            fs.writeFileSync(path.join(textsFolder, "Player 1.txt"), p1NameInp.value);
            fs.writeFileSync(path.join(textsFolder, "Player 2.txt"), p2NameInp.value);

            fs.writeFileSync(path.join(textsFolder, "Round.txt"), roundInp.value);
            fs.writeFileSync(path.join(textsFolder, "Tournament Name.txt"), document.getElementById('tournamentName').value);

            fs.writeFileSync(path.join(textsFolder, "Caster 1 Name.txt"), document.getElementById('cName1').value);
            fs.writeFileSync(path.join(textsFolder, "Caster 1 Bluesky.txt"), document.getElementById('cbsky1').value);
            fs.writeFileSync(path.join(textsFolder, "Caster 1 Twitch.txt"), document.getElementById('cTwitch1').value);

            fs.writeFileSync(path.join(textsFolder, "Caster 2 Name.txt"), document.getElementById('cName2').value);
            fs.writeFileSync(path.join(textsFolder, "Caster 2 Bluesky.txt"), document.getElementById('cbsky2').value);
            fs.writeFileSync(path.join(textsFolder, "Caster 2 Twitch.txt"), document.getElementById('cTwitch2').value);

            // Copy p1File and p2File to another directory
            const copyFile = (file, defaultFile, filePath) => {
                let reader = new FileReader();
                reader.onload = function (event) {
                    let buffer = new Uint8Array(event.target.result);
                    window.electron.fs.writeFileSync(filePath, buffer);
                };
                if (!file) {
                    reader.readAsArrayBuffer(defaultFile);
                } else {
                    reader.readAsArrayBuffer(file);
                }
            };

            let p1FilePath = window.electron.path.join(streamToolDirectory, "Player Icons", "p1.png");
            copyFile(p1File, defaultFile, p1FilePath);

            let p2FilePath = window.electron.path.join(streamToolDirectory, "Player Icons", "p2.png");
            copyFile(p2File, defaultFile, p2FilePath);
        })
        .catch(error => console.error('Error loading default file:', error));
}