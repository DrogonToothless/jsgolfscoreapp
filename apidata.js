function apiData() {
    async function getAvailableCourses() {
        const url = 'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
    getAvailableCourses();
    function selectCourse() {
        const courseSelector = document.getElementById("course-select");
        const selectedCourse = courseSelector.value;
        if (selectedCourse === "Thanksgiving Point") {
            //import thanksgivingpoint.js
        } else if (selectedCourse === "Fox Hollow") {
            //import foxhollow.js
        } else if (selectedCourse === "Spanish Oaks") {
            //import spanishoaks.js
        } 
    }
    selectCourse();
}
export default apiData;