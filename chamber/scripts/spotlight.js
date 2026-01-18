const spotlightContainer = document.querySelector('#spotlight-container');

async function loadSpotlights() {
  const response = await fetch('data/members.json');
  const data = await response.json();

  const qualified = data.members.filter(
    m => m.membership === 2 || m.membership === 3
  );

  const shuffled = qualified.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  spotlightContainer.innerHTML = '';

  selected.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <img src="images/members/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="level">${member.membership === 3 ? 'Gold' : 'Silver'} Member</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

loadSpotlights();
