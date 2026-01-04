// js/script.js

// 1. The Data: List of Real Tutors
const tutors = [
    {
        name: "Allen Fraiman",
        // Comprehensive list covering Math (Grade 3 - Diff Eq), Physics, Engineering, Chem, and Test Prep
        subjects: [
            "Math", "Algebra 1", "Algebra 2", "Geometry", "Trigonometry", 
            "Pre-Calculus", "Calculus 1", "Calculus 2", "Calculus 3", 
            "Differential Equations", "Statistics", "AP Statistics", "AP Calculus",
            "Physics", "Physics 1", "Physics 2", "E&M", "AP Physics",
            "Chemistry", "General Chemistry",
            "Mechanical Engineering", "Thermodynamics", "Fluid Mechanics", 
            "Material Science", "Mechanics of Materials",
            "SAT Prep", "ACT Prep", "Test Prep"
        ],
        bio: "Specializes in advanced Mathematics, Physics, and Mechanical Engineering courses.",
        school: "College Name Here", // Edit this
        major: "Mechanical Engineering", // Edit this
        gpa: "GPA / SAT Score", // Edit this
        hobbies: "Hobby 1, Hobby 2", // Edit this
        detailedBio: "I can tutor any math level from 3rd grade up to Differential Equations. I also specialize in college-level Physics (up to E&M), Chemistry, and core Mechanical Engineering courses like Thermo and Fluids.",
        img: "images/profilepic.png" 
    },
    {
        name: "Philip Zghaib",
        // Covers Math up to Calc AB, Finance, Econ, Psych, and Test Prep
        subjects: [
            "Math", "Algebra 1", "Algebra 2", "Geometry", "Pre-Calculus", 
            "Calculus", "AP Calculus AB", 
            "Finance", "Corporate Finance",
            "Economics", "AP Macroeconomics", 
            "Psychology", "AP Psychology",
            "SAT Prep", "ACT Prep", "Test Prep"
        ],
        bio: "Expert in Mathematics, Finance, and AP Social Sciences.",
        school: "College Name Here", // Edit this
        major: "Finance/Economics", // Edit this
        gpa: "GPA / SAT Score", // Edit this
        hobbies: "Hobby 1, Hobby 2", // Edit this
        detailedBio: "I tutor math students from elementary school up to AP Calculus AB. My other specialties include Finance, AP Macroeconomics, and AP Psychology, along with standardized test prep.",
        img: "images/profilepic.png"
    },
    {
        name: "Sam Fraiman",
        // Covers Math up to AP Pre-Calc, Chem, and Test Prep
        subjects: [
            "Math", "Algebra 1", "Algebra 2", "Geometry", 
            "Pre-Calculus", "AP Pre-Calculus",
            "Chemistry", "High School Chemistry",
            "SAT Prep", "ACT Prep", "Test Prep"
        ],
        bio: "Focused on building strong foundations in Math and Chemistry.",
        school: "College Name Here", // Edit this
        major: "Major Here", // Edit this
        gpa: "GPA / SAT Score", // Edit this
        hobbies: "Hobby 1, Hobby 2", // Edit this
        detailedBio: "I help students master math concepts from 3rd grade through AP Pre-Calculus. I also provide tutoring for High School Chemistry and standardized test preparation.",
        img: "images/profilepic.png"
    },
    {
        name: "Lillian Zghaib",
        // Covers English, Reading, Writing, Lit
        subjects: [
            "English", "English Lang", "Reading", "Writing", 
            "Essay Writing", "Grammar", "Vocabulary",
            "Literature", "AP Literature", 
            "College Essays", "Creative Writing"
        ],
        bio: "Specialist in English Literature, Writing, and Composition.",
        school: "College Name Here", // Edit this
        major: "English/Literature", // Edit this
        gpa: "GPA / SAT Score", // Edit this
        hobbies: "Hobby 1, Hobby 2", // Edit this
        detailedBio: "I work with students from grades 3-12 to improve their reading comprehension and writing skills. I specialize in AP Literature and helping refine essays.",
        img: "images/profilepic.png"
    }
];

// 2. Search Function (Home Page)
function searchTutors() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('tutor-results');
    
    resultsContainer.innerHTML = "";

    if (input.trim() === "") {
        resultsContainer.innerHTML = "<p style='color:white;'>Please enter a subject to search!</p>";
        return;
    }

    const filteredTutors = tutors.filter(tutor => {
        // Checks if input matches a subject OR the tutor's name
        const matchesSubject = tutor.subjects.some(sub => sub.toLowerCase().includes(input));
        const matchesName = tutor.name.toLowerCase().includes(input);
        return matchesSubject || matchesName;
    });

    if (filteredTutors.length === 0) {
        resultsContainer.innerHTML = "<p style='color:white;'>No coaches found for this fight. Try another subject!</p>";
    } else {
        filteredTutors.forEach(tutor => {
            const card = createTutorCard(tutor); // Uses the vertical card style
            resultsContainer.appendChild(card);
        });
    }
}

// 3. Helper: Create Vertical Card (For Home Page Search)
function createTutorCard(tutor) {
    const card = document.createElement('div');
    card.className = 'tutor-card';
    
    // We only show the first 3-4 subjects on the small card to keep it clean
    // The .slice(0, 3) part does this.
    const displaySubjects = tutor.subjects.slice(0, 3).join(", ") + (tutor.subjects.length > 3 ? "..." : "");

    card.innerHTML = `
        <h3>${tutor.name}</h3>
        <p class="subjects"><strong>Specialties:</strong> ${displaySubjects}</p>
        <p class="bio">${tutor.bio}</p>
        <div class="card-footer">
            <button class="btn-book" onclick="bookTutor('${tutor.name}')">Book Now</button>
        </div>
    `;
    return card;
}

// 4. Helper: Create Horizontal Row (For Team Page)
function createTeamRow(tutor, index) {
    const row = document.createElement('div');
    row.className = 'tutor-row';
    
    const detailsId = `details-${index}`;

    // For the team page, we show a few more subjects, but still truncate if it's huge
    const displaySubjects = tutor.subjects.slice(0, 5).join(", ") + (tutor.subjects.length > 5 ? ", and more..." : "");

    row.innerHTML = `
        <div class="row-header">
            <img src="${tutor.img}" alt="${tutor.name}" class="profile-pic">
            
            <div class="row-info">
                <h3>${tutor.name}</h3>
                <p class="subjects"><strong>Specialties:</strong> ${displaySubjects}</p>
                <p class="bio-short">${tutor.bio}</p>
            </div>

            <div class="row-actions">
                <button class="btn-book" onclick="bookTutor('${tutor.name}')">Book Now</button>
                <button class="btn-expand" onclick="toggleDetails('${detailsId}', this)">
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
            </div>
        </div>

        <div id="${detailsId}" class="row-details">
            <div class="details-grid">
                <div><strong>School:</strong> ${tutor.school}</div>
                <div><strong>Major:</strong> ${tutor.major}</div>
                <div><strong>Stats:</strong> ${tutor.gpa}</div>
                <div><strong>Hobbies:</strong> ${tutor.hobbies}</div>
            </div>
            <div class="details-bio">
                <p>${tutor.detailedBio}</p>
                <p style="margin-top:1rem; font-size: 0.9rem; color: var(--text-secondary);">
                    <strong>All Subjects:</strong> ${tutor.subjects.join(", ")}
                </p>
            </div>
        </div>
    `;
    return row;
}

// 5. Function to Toggle the "Expand" section
function toggleDetails(id, btn) {
    const details = document.getElementById(id);
    const icon = btn.querySelector('i');
    
    if (details.classList.contains('show')) {
        details.classList.remove('show');
        icon.classList.remove('rotate');
    } else {
        details.classList.add('show');
        icon.classList.add('rotate');
    }
}

// 6. Book Tutor Function
function bookTutor(tutorName) {
    const contactSection = document.getElementById('contact'); 
    const messageBox = document.querySelector('textarea');    

    if (contactSection && messageBox) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        messageBox.value = `Hi, I am interested in booking a session with ${tutorName}.`;
        messageBox.focus();
    } else {
        alert(`Please email us at email@hitthebooks.com to book ${tutorName}!`);
    }
}

// 7. Event Listeners
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchTutors();
        }
    });
}

const teamGrid = document.getElementById('team-grid');
if (teamGrid) {
    tutors.forEach((tutor, index) => {
        const row = createTeamRow(tutor, index);
        teamGrid.appendChild(row);
    });
}