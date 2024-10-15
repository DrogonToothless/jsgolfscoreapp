function spanishOaks() {
    async function getAvailableCourses() {
        const url = 'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course19002.json';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
    getAvailableCourses();
}
export default spanishOaks;