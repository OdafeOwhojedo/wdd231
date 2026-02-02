const filterSelect = document.querySelector("#filter");

filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;
  document.querySelector("#places").innerHTML = "";

  const filtered =
    value === "all"
      ? allPlaces
      : allPlaces.filter(place => place.category === value);

  displayPlaces(filtered);
});
