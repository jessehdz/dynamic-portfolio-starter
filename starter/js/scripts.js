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
    card.style.backgroundImage = `url(${
      project.card_image || "./starter/images/card_placeholder_bg.webp"
    })`;

    const title = document.createElement("h4");
    title.textContent = project.project_name;

    const description = document.createElement("p");
    description.textContent = project.short_description;

    // "click" event listener for each card
    card.addEventListener("click", () => {
      updateSpotlight(project);
    });

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

  // first object is default spotlight
  projectSpotlightDiv.style.backgroundImage = `url(${projectsData[0].spotlight_image})`;
  spotlightTitle.textContent = `${projectsData[0].project_name}`;
  spotlightDesc.textContent = projectsData[0].long_description;
  spotlightLink.textContent = `Click to view ${projectsData[0].project_name}`;
  spotlightLink.setAttribute("href", `${projectsData[0].url}`);

  // update spotlight - event listener function
  function updateSpotlight(project) {
    projectSpotlightDiv.style.backgroundImage = `url(${
      project.spotlight_image ||
      "./starter/images/spotlight_placeholder_bg.webp"
    })`;
    spotlightTitle.textContent = `${project.project_name}`;
    spotlightDesc.textContent = project.long_description;
    spotlightLink.textContent = project.url
      ? `Click to view ${project.project_name}`
      : "Work in progress...";
    spotlightLink.setAttribute("href", `${project.url ? project.url : "#"}`);
  }

  // add cards to div all at once
  projectList.append(projectsFragment);
};

// Project Nav Arrows
const projectNavigation = () => {
  console.log(projectList);
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");

  const mediaQuery = window.matchMedia("(width <= 1024px)");
  console.log(mediaQuery.matches);

  // add scroll-snap css behavior to projects container and div
  const projectsContainer = document.querySelector("#projectSection");
  projectsContainer.style.scrollSnapType = "x mandatory";
  projectsContainer.style.scrollBehavior = "smooth";
  projectList.style.scrollSnapAlign = "start";

  // event handlers based on width of screen
  const scrollProjects = (direction) => {
    if (mediaQuery.matches) {
      // mobile = scroll horizontally
      projectList.scrollBy({ left: direction * 200 });
    } else {
      // desktop = scroll vertically
      projectList.scrollBy({ top: direction * 200 });
    }
  };

  // event listener for each arrow
  leftArrow.addEventListener("click", () => {
    // go backwards
    scrollProjects(-1);
  });
  rightArrow.addEventListener("click", () => {
    // go forward
    scrollProjects(1);
  });
};

// initialize app
const init = async () => {
  await loadData();
  populateAboutMe();
  populateProjectsData();
  projectNavigation();
};

init(); // starts program
