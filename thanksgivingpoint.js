async function thanksgivingPoint() {
    async function getAvailableCourses() {
        const url = 'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching courses:', error);
            return null;
        }
    }
    function infoDeclaration(data) {
        if (data && data.holes && data.holes[0]?.teeBoxes?.[0]?.yards) {
            const yardageOne = data.holes[0].teeBoxes[0].yards;
            const yardageOneInput = document.getElementById("yardage-one");
            yardageOneInput.textContent = yardageOne;
        }
    }
    const data = await getAvailableCourses();
    infoDeclaration(data);
}
export default thanksgivingPoint;