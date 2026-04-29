/*** Dark Mode ***

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
    
    // This section will run whenever the button is clicked
    document.documentElement.classList.toggle("dark-mode");
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);


/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here

const addParticipant = (person) => {

    /* event.preventDefault(); */

    // Step 2: Write your code to manipulate the DOM here
    const rsvpCount = document.getElementById("rsvp-count");
    if (rsvpCount) {
      rsvpCount.remove();
    }

    const nameInput = person.name;
    const homecityInput = person.homecity;
    const groupsizeInput = person.groupsize;
    const emailInput = person.email;

    const locationsText = person.locations.length > 0 ? person.locations.join(", ") : "No locations selected";

    const participantPara = document.createElement("p");

    participantPara.textContent = `🎟️ ${nameInput} from ${homecityInput} is bringing a group of ${groupsizeInput} to ${locationsText}`;

    const participantsDiv = document.querySelector(".rsvp-participants");
    participantsDiv.appendChild(participantPara);

    const participantCount = document.createElement("p");

    let count = 10;
    const groupSize = Number(groupsizeInput);
    count = count + groupSize

    participantCount.textContent = `⭐️ ${count} people have RSVP'd to this event!`;
    participantsDiv.appendChild(participantCount);

}

// Step 3: Add a click event listener to the submit RSVP button here
/* rsvpForm.addEventListener("submit", addParticipant); */

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {

  if (event) {
    event.preventDefault();
  }

  let containsErrors = false;

  const rsvpInputs = document.getElementById("rsvp-form").elements;
  // TODO: Loop through all inputs
  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];

    if (input.type === "submit" || input.tagName === "FIELDSET") {
      continue;
    }

    if (
      input.type === "text" ||
      input.type === "email" /* ||
       input.type === "number" */
    ) {
      const value = input.value.trim();

      if (value.length < 2) {
        containsErrors = true;
        input.classList.add("error");
      } else {
        input.classList.remove("error")
      }
    }
  }

  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();

  if (!emailValue.includes("@") || !emailValue.includes(".com")) {
    containsErrors = true;
    emailInput.classList.add("error");
  } else {
    emailInput.classList.remove("error");
  }

  const beachCheckbox = document.getElementById("beach");
  const icwCheckbox = document.getElementById("icw");

  const locations = [];
  if (beachCheckbox.checked) {
      locations.push(beachCheckbox.value)
  }
  if (icwCheckbox.checked) {
    locations.push(icwCheckbox.value)
  }

  // TODO: Inside loop, validate the value of each input

  // TODO: If no errors, call addParticipant() and clear fields
  if (!containsErrors) {
    const person = {
      name: rsvpInputs[0].value, // accesses and saves value of first input
      homecity: rsvpInputs[1].value,
      groupsize: Number(rsvpInputs[2].value),
      email: rsvpInputs[3].value,
      locations: locations
    };

    addParticipant(person);

    toggleModal(person);

    document.getElementById("rsvp-form").reset();
  }
}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
const rsvpForm = document.getElementById("rsvp-form");
rsvpForm.addEventListener("submit", validateForm);

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

const toggleModal = (person) => {
    let modal = document.getElementById("thanks-modal");
    let modalContent = document.getElementById("thanks-content-modal"); // TODO
    
    // TODO: Update modal display to flex
    modal.style.display = "flex"

    // TODO: Update modal text to personalized message
    modalContent.innerHTML = `<p>Beach Cleanup... 🚀 Engage! 🚀 
                        <br><br>
                        Thanks for RSVP'ing, ${person.name}!
                        <br><br>
                        Don't forget to arrive a few minutes early, and 
                        definitely don't forget the rest of your cleanup crew!
                        </p>`
    clearInterval(animationInterval);
    rotationIndex = 0;

    if (reduceMotion === false) {
      animateImage();
      animationInterval = setInterval(animateImage, 400);
    } else {
      sunglasses.style.transform = "rotate(0deg)";
    }

    // Set modal timeout to 5 seconds
    setTimeout(() => {
      modal.style.display = "none"
      clearInterval(animationInterval);
      sunglasses.style.transform = "rotate(0deg)";
    }, 10000);

    
}

// TODO: animation variables and animateImage() function

const sunglasses = document.querySelector("#thanks-image-modal img");
  let animationInterval = null;
  let rotationIndex = 0;
  const rotationPositions = [-10, 0, 10];

const animateImage = () => {
  sunglasses.style.transform = `rotate(${rotationPositions[rotationIndex]}deg)`;
  rotationIndex = (rotationIndex + 1) % rotationPositions.length;
};

/*  const animateImage = () => {
    if (rotateFactor === 0) {
      rotateFactor = -10;
    }
    else {
      rotateFactor = 0;
    }

  modalImage.style.transform = `rotate(${rotateFactor}deg)`;

} */

// Close Modal via Close Button
const closeModalButton = document.getElementById("close-modal-button");

closeModalButton.addEventListener("click", () => {
  document.getElementById("thanks-modal").style.display = "none";
  clearInterval(animationInterval);
  sunglasses.style.transform = "rotate(0deg)";
});

// Turn off Modal Motion via Reduce Motion button
const reduceMotionButton = document.getElementById("reduce-motion-button");
reduceMotion = false;

const updateMotionButton = () => {
  if (reduceMotion === true) {
    reduceMotionButton.textContent = "Reduce Motion: ON";
  } else {
    reduceMotionButton.textContent = "Reduce Motion: OFF";
  }
};

reduceMotionButton.addEventListener("click", () => {
  reduceMotion = !reduceMotion;
  updateMotionButton();

  const modal = document.getElementById("thanks-modal");

  if (reduceMotion === true) {
    clearInterval(animationInterval);
    sunglasses.style.transform = "rotate(0deg)";
  } else if (modal.style.display === "flex") {
    clearInterval(animationInterval);
    rotationIndex = 0;
    animateImage();
    animationInterval = setInterval(animateImage, 400);
  }
});

updateMotionButton();