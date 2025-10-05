// global import of data (aboutMeData and projectsData)
let aboutMeData = {};
let projectsData = {};

const loadData = async () => {
  try {
    // fetch aboutMeData and projectsData at the same time
    const [aboutMeResponse, projectsDataResponse] = await Promise.all([
      fetch("./starter/data/aboutMeData.json"),
      fetch("./starter/data/projectsData.json"),
    ]);

    // check for successful request
    if (!aboutMeResponse.ok) {
      throw new Error(`Error fetching aboutMeData: ${aboutMeResponse.status}`);
    }
    if (!projectsDataResponse.ok) {
      throw new Error(
        `Error fetching projectsData: ${projectsDataResponse.status}`
      );
    }

    // parse JSON results into global variables
    aboutMeData = await aboutMeResponse.json();
    projectsData = await projectsDataResponse.json();

    console.log("Data loaded successfully");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// initialize app
const init = async () => {
  await loadData();
  // populateAboutMe();
};

init(); // starts program
