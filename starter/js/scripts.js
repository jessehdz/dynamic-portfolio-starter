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

// add "projectsData" as project cards and project spotlight
const populateProjectsData = () => {
  // project cards
  const projectList = document.getElementById("projectList");
  const projectsFragment = document.createDocumentFragment();

  projectsData.forEach((project) => {
    const card = document.createElement("div");
    card.className = "projectCard";
    card.setAttribute("id", `${project.project_id}`);
    card.style.backgroundImage = `url(${project.card_image})`;

    const title = document.createElement("h4");
    title.textContent = project.project_name;

    const description = document.createElement("p");
    description.textContent = project.short_description;

    card.append(title, description);
    projectsFragment.append(card);
  });

  // project spotlight
  const projectSpotlightDiv = document.getElementById("projectSpotlight");
  const projectSpotlightTitlesDiv = document.getElementById("spotlightTitles");

  // build spotlight
  const spotlightTitle = document.createElement("h3");
  const spotlightDesc = document.createElement("p");
  const spotlightLink = document.createElement("a");
  projectSpotlightTitlesDiv.append(
    spotlightTitle,
    spotlightDesc,
    spotlightLink
  );

  projectSpotlightDiv.style.backgroundImage = `url(${projectsData[0].spotlight_image})`;
  spotlightTitle.textContent = projectsData[0].project_name;
  spotlightDesc.textContent = projectsData[0].long_description;

  // add cards to div all at once
  projectList.append(projectsFragment);
};

// initialize app
const init = async () => {
  await loadData();
  populateAboutMe();
  populateProjectsData();
};

init(); // starts program
