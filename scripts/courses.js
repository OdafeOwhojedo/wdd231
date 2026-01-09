const courses = [
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const courseContainer = document.getElementById("courseCards");
const creditSpan = document.getElementById("totalCredits");

function displayCourses(list) {
  courseContainer.innerHTML = "";
  const totalCredits = list.reduce((sum, course) => sum + course.credits, 0);
  creditSpan.textContent = totalCredits;

  list.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) {
    card.classList.add("completed");
    card.setAttribute("data-completed", "true");
    }

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>Credits: ${course.credits}</p>
    `;
    courseContainer.appendChild(card);
  });
}

displayCourses(courses);

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    if (filter === "all") {
      displayCourses(courses);
    } else {
      displayCourses(courses.filter(c => c.subject === filter));
    }
  });
});