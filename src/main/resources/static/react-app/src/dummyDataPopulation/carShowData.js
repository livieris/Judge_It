// Import Axios
const axios = require('axios');

// Define the URL for your API
const API_URL = 'http://localhost:8080/api/carshows';

// Define the dummy data to be inserted
const dummyData = [
  { showName: 'Show 1', date: '2024-01-15', city: 'City 1', state: 'State 1', cost: 10.00 },
  { showName: 'Show 2', date: '2024-01-20', city: 'City 2', state: 'State 2', cost: 15.00 },
  // Add more dummy data as needed
];
const random = (max) => {
    return Math.floor(Math.random() * max);
}
const createRandomData = (count) => {
    let carShows = [];
    for(let i=0; i<count; i++) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + random(90));

        let carShow = {
            userId: 5,
            showName: "Car Show " + i,
            date: currentDate,
            city: "City " + i,
            state: "State " + i,
            cost: random(30),
            totalClasses: random(40)
        }
        carShows.push(carShow)
    }
    return carShows;
}

// Function to populate the database with dummy data
const populateDatabase = async () => {
  try {
    // Make Axios POST requests to insert each dummy data item
    const carShows = createRandomData(10);
    console.log(carShows);
    for (let data of carShows) {
      await axios.post('http://localhost:8080/api/carshows/create', data);
      console.log(`Inserted data: ${JSON.stringify(data)}`);
    }
    console.log('Database populated successfully.');
  } catch (error) {
    console.error('Error populating database:', error.message);
  }
};

const deleteAllCarShows = async (userId) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/carshows/user/${userId}`);
        console.log("Show deleted successfully:", response.data);
      } catch (error) {
        console.error('Error deleting show:', error);
      }
}

// Call the function to populate the database
populateDatabase();
// deleteAllCarShows('5');
