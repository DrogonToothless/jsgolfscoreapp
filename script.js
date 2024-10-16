const thanksgivingPointData = {
    yardageArray: [],
    parArray: [],
    handicapArray: []
};
const foxHollowData = {
    yardageArray: [],
    parArray: [],
    handicapArray: []
};
const spanishOaksData = {
    yardageArray: [],
    parArray: [],
    handicapArray: []
};
const tees = {};
const yardageInputs = Array.from({ length: 18 }, (_, i) =>
    document.getElementById(`yardage-${i + 1}`)
);
const parInputs = Array.from({ length: 18 }, (_, i) =>
    document.getElementById(`par-${i + 1}`)
);
const handicapInputs = Array.from({ length: 18 }, (_, i) =>
    document.getElementById(`handicap-${i + 1}`)
);
async function retrieveAPIData() {
    try {
        const urls = [
            'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json',
            'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course18300.json',
            'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course19002.json'
        ];
        const [firstData, secondData, thirdData] = await Promise.all(
            urls.map(async (url) => {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
        );
        organizeNeededData(firstData, secondData, thirdData);
        displayData(thanksgivingPointData, yardageInputs, parInputs, handicapInputs);
        addNumbers(thanksgivingPointData);
    } catch (error) {
        console.error('Failed to retrieve API data:', error);
    }
}
function organizeNeededData(firstData, secondData, thirdData) {
    function extractYardages(data, targetArray) {
        data.holes.forEach((hole) => {
            hole.teeBoxes.forEach((teeBox) => {
                targetArray.push(teeBox.yards);
            });
        });
    }
    function extractPars(data, targetArray) {
        data.holes.forEach((hole) => {
            hole.teeBoxes.forEach((teeBox) => {
                targetArray.push(teeBox.par);
            });
        });
    }
    function extractHandicaps(data, targetArray) {
        data.holes.forEach((hole) => {
            hole.teeBoxes.forEach((teeBox) => {
                targetArray.push(teeBox.hcp);
            });
        });
    }
    extractYardages(firstData, thanksgivingPointData.yardageArray);
    extractYardages(secondData, foxHollowData.yardageArray);
    extractYardages(thirdData, spanishOaksData.yardageArray);
    extractPars(firstData, thanksgivingPointData.parArray);
    extractPars(secondData, foxHollowData.parArray);
    extractPars(thirdData, spanishOaksData.parArray);
    extractHandicaps(firstData, thanksgivingPointData.handicapArray);
    extractHandicaps(secondData, foxHollowData.handicapArray);
    extractHandicaps(thirdData, spanishOaksData.handicapArray);
}
function displayData(courseData, yardageInputs, parInputs, handicapInputs) {
    yardageInputs.forEach((pElement, index) => {
        pElement.textContent = courseData.yardageArray[index] || "";
    });
    parInputs.forEach((pElement, index) => {
        pElement.textContent = courseData.parArray[index] || "";
    });
    handicapInputs.forEach((pElement, index) => {
        pElement.textContent = courseData.handicapArray[index] || "";
    });
}
function addPlayer() {
    const playersRow = document.getElementById("players-row");
    const playerRow = `
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr><th scope="col">Hole</th><th scope="col">1</th><th scope="col">2</th><th scope="col">3</th><th scope="col">4</th><th scope="col">5</th><th scope="col">6</th><th scope="col">7</th><th scope="col">8</th><th scope="col">9</th></tr>
                <tr><th scope="col" id="player-name-place"><input type="text" placeholder="Player Name" class="player-name-enter"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th></tr>
            </thead>
            <thead>
                <tr><th scope="col"></th><th scope="col">10</th><th scope="col">11</th><th scope="col">12</th><th scope="col">13</th><th scope="col">14</th><th scope="col">15</th><th scope="col">16</th><th scope="col">17</th><th scope="col">18</th></tr>
                <tr><th scope="col"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th><th scope="col"><input type="text"></th></tr>
            </thead>
        </table>
    </div>`;
    playersRow.innerHTML += playerRow;
    const playerNameEnter = playersRow.querySelector('.player-name-enter:last-of-type');
    playerNameEnter.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const playerName = playerNameEnter.value.trim();
            if (playerName === "") {
                alert("Please enter a valid name.");
                return;
            }
            const playerNamePlace = playersRow.querySelector("#player-name-place:last-of-type");
            playerNamePlace.textContent = playerName;
            playerNameEnter.remove();
        }
    });
}
function addNumbers(thanksgivingPointData) {
    const yardageTotal = document.getElementById("yardage-total");
    yardageTotal.textContent = "6136";
    const parTotal = document.getElementById("par-total");
    parTotal.textContent = "74";
    const handicapTotal = document.getElementById("handicap-total");
    handicapTotal.textContent = "196";
}
retrieveAPIData();