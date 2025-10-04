// global import of data (aboutMeData and projectsData)
let aboutMeData = {};
let projectsData = {};

async function loadData() {
  try {
    // fetch aboutMeData and projectsData files
    const aboutMeResponse = await fetch("./starter/data/aboutMeData.json");
    const projectsDataResponse = await fetch(
      "./starter/data/projectsData.json"
    );

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

    console.log("Data loaded successfully:", { aboutMeData, projectsData });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

loadData();
