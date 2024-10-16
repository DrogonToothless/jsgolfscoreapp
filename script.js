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
console.log(yardageInputs);
const parInputs = Array.from({ length: 18 }, (_, i) =>
    document.getElementById(`par-${i + 1}`)
);
console.log(parInputs);
const handicapInputs = Array.from({ length: 18 }, (_, i) =>
    document.getElementById(`handicap-${i + 1}`)
);
console.log(handicapInputs);
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
        organizeNeededData(firstData, secondData, thirdData, thanksgivingPointData, foxHollowData, spanishOaksData, tees);
    } catch (error) {
        console.error('Failed to retrieve API data:', error);
    }
}
function organizeNeededData(firstData, secondData, thirdData, thanksgivingPointData, foxHollowData, spanishOaksData, tees) {
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
    console.log(thanksgivingPointData);
    console.log(foxHollowData);
    console.log(spanishOaksData);
}
retrieveAPIData();
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
retrieveAPIData().then(() => {
    displayData(thanksgivingPointData, yardageInputs, parInputs, handicapInputs);
});
document.getElementById('select-button').addEventListener('click', (event) => {
    const courseSelector = document.getElementById("course-select")
    const selectedCourse = courseSelector.options;
    if (selectedCourse === 'thanksgiving') {
        displayData(thanksgivingPointData, yardageInputs, parInputs, handicapInputs);
    } else if (selectedCourse === 'foxHollow') {
        displayData(foxHollowData, yardageInputs, parInputs, handicapInputs);
    } else if (selectedCourse === 'spanishOaks') {
        displayData(spanishOaksData, yardageInputs, parInputs, handicapInputs);
    }
});