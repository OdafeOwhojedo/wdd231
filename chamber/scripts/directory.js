const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const levelFilter = document.querySelector("#levelFilter");

// Fetch members
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    displayMembers(data.members);
    setupFilter(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

// Display members
function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.innerHTML = `
  <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">

  <h3>${member.name}</h3>

  <dl class="member-details">
    <dt>Address</dt><dd>${member.address}</dd>
    <dt>Phone</dt><dd>${member.phone}</dd>
    <dt>Specialization</dt><dd>${member.category}</dd>
    <dt>Established</dt><dd>${member.established}</dd>
    <dt>Staff Strength</dt><dd>${member.staff}</dd>
  </dl>

  <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
  <p class="level">Membership Class: ${membershipLabel(member.membership)}</p>
`;



    // card.innerHTML = `
    //   <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
    //   <h3>${member.name}</h3>
    //   <p>${member.address}</p>
    //   <p>${member.phone}</p>
    //   <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    //   <p class="level">Membership: ${membershipLabel(member.membership)}</p>
    // `;

    membersContainer.appendChild(card);
  });
}

// Membership label
function membershipLabel(level) {
  return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
}

// Grid/List toggle
gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");

  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");

  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});
// gridBtn.addEventListener("click", () => {
//   membersContainer.classList.add("grid");
//   membersContainer.classList.remove("list");
// });

// listBtn.addEventListener("click", () => {
//   membersContainer.classList.add("list");
//   membersContainer.classList.remove("grid");
// });

// Membership filtering
function setupFilter(members) {
  levelFilter.addEventListener("change", () => {
    if (levelFilter.value === "all") {
      displayMembers(members);
    } else {
      const filtered = members.filter(
        m => m.membership === Number(levelFilter.value)
      );
      displayMembers(filtered);
    }
  });
}

// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Header transparency on scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

getMembers();
