/**
 * Global Variables
 */
const allSections = document.querySelectorAll('section');
const navList = document.querySelector('#navbar__list');

let activeSection = document.querySelector('.your-active-class');

/**
 * Helper Functions
 */

//make the section active and remove active class from the last one
function changeActiveSection(newSection, previosSection) {
	if (previosSection) {
		previosSection.classList.toggle('your-active-class');
	}

	newSection.classList.toggle('your-active-class');

	activeSection = newSection;
}

//get the space between section and the top of the viewport
function getTopPosition(sec) {
	let rect = sec.getBoundingClientRect();
	return rect.top;
}

//check if section is in vieport
function isActive(sec) {
	const topPosition = getTopPosition(sec);

	const windowHeight = window.innerHeight;

	if (Math.abs(topPosition) >= 0 && Math.abs(topPosition) < windowHeight / 2) {
		return true;
	} else {
		return false;
	}
}

// build the nav

// iterate every section
for (const sec of allSections) {
	// get section id and heading name
	const sectionName = sec.getAttribute('data-nav');
	const sectionId = sec.getAttribute('id');

	//create a list item inside nav list
	listElement = document.createElement('li');
	navList.appendChild(listElement);

	//create link item inside the list item
	const listLink = document.createElement('a');
	listLink.classList.add('menu__link');
	listLink.setAttribute('href', '#' + sectionId);
	listLink.setAttribute('data-nav', sectionName);
	listLink.innerHTML = sectionName;

	// Scroll to section on link click event
	listLink.addEventListener('click', (event) => {
		event.preventDefault();
		sec.scrollIntoView({ behavior: 'smooth' });

		//section will be active when scrolled to
		changeActiveSection(sec, activeSection);
	});

	listElement.appendChild(listLink);
}

//add active class to section in viewport and to its link
function getActiveSection() {
	for (const sec of allSections) {
		const secName = sec.getAttribute('data-nav');
		const activeLink = document.querySelector(`a[data-nav='${secName}']`);
		if (isActive(sec)) {
			changeActiveSection(sec, activeSection);
			activeLink.classList.add('active__link');
		} else {
			activeLink.classList.remove('active__link');
		}
	}
}

// Set section as active on scroll event
window.addEventListener('scroll', getActiveSection);
