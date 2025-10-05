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

// add "aboutMe" value as an element
const populateAboutMe = () => {
  // deconstructing aboutMeData.json
  const { aboutMe, headshot } = aboutMeData;

  const aboutMeDiv = document.querySelector("#aboutMe");

  // aboutMeBio
  const aboutMeBio = document.createElement("p");
  aboutMeBio.textContent = aboutMe;

  // headshot div and image
  const headshotDiv = document.createElement("div");
  headshotDiv.className = "headshotContainer";
  const headshotImg = document.createElement("img");
  headshotImg.setAttribute("src", `${headshot}`);
  headshotImg.setAttribute("alt", "Avatar of African American woman");

  aboutMeDiv.append(aboutMeBio);
  aboutMeDiv.append(headshotDiv);
  headshotDiv.appendChild(headshotImg);
};

// initialize app
const init = async () => {
  await loadData();
  populateAboutMe();
};

init(); // starts program
