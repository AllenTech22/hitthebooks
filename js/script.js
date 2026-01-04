// js/script.js

// 1. The Data: Real Team & Generated Keywords
const tutors = [
    {
        name: "Allen Fraiman",
        subjects: [
            "Math", "Algebra 1", "Algebra 2", "Geometry", "Trigonometry", 
            "Pre-Calculus", "Calculus 1", "Calculus 2", "Calculus 3", 
            "Differential Equations", "Statistics", "AP Statistics", "AP Calculus",
            "Physics", "Physics 1", "Physics 2", "E&M", "Electricity & Magnetism",
            "Chemistry", "General Chemistry",
            "Mechanical Engineering", "Thermodynamics", "Fluid Mechanics", 
            "Material Science", "Mechanics of Materials",
            "SAT Prep", "ACT Prep", "Test Prep"
        ],
        bio: "Mechanical Engineering specialist. Tutoring Math (Grade 3 to Diff Eq), Physics, and Engineering.",
        school: "College Name Here", 
        major: "Mechanical Engineering", 
        gpa: "Scores/GPA Here", 
        hobbies: "Hobbies Here", 
        detailedBio: "I tutor any math level from 3rd grade up to Differential Equations. I also specialize in college-level Physics (up to E&M), Chemistry, and core Mechanical Engineering courses like Thermo, Fluids, and Materials.",
        img: "images/allen_profile.jpeg" 
    },
    {
        name: "Philip Zghaib",
        subjects: [
            "Math", "Algebra 1", "Algebra 2", "Geometry", "Pre-Calculus", 
            "Calculus", "AP Calculus AB", 
            "Finance", "Corporate Finance", "Business",
            "Economics", "AP Macroeconomics", 
            "Psychology", "AP Psychology",
            "SAT Prep", "ACT Prep", "Test Prep"
        ],
        bio: "Expert in Mathematics, Finance, Economics, and AP Psychology.",
        school: "College Name Here", 
        major: "Finance/Economics", 
        gpa: "Scores/GPA Here", 
        hobbies: "Hobbies Here", 
        detailedBio: "I tutor math students from grades 3 up to AP Calculus AB. My specialties also include Finance, AP Macroeconomics, and AP Psychology, along with standardized test prep.",
        img: "images/profilepic.png"
    },
    {
        name: "Sam Fraiman",
        subjects: [
            "Math", "Algebra 1", "Algebra 2", "Geometry", 
            "Pre-Calculus", "AP Pre-Calculus",
            "Chemistry", "High School Chemistry",
            "SAT Prep", "ACT Prep", "Test Prep"
        ],
        bio: "Building strong foundations in K-12 Math and Chemistry.",
        school: "College Name Here", 
        major: "Major Here", 
        gpa: "Scores/GPA Here", 
        hobbies: "Hobbies Here", 
        detailedBio: "I help students master math concepts from 3rd grade through AP Pre-Calculus. I also provide dedicated tutoring for High School Chemistry and test preparation.",
        img: "images/sam_profile.png"
    },
    {
        name: "Lillian Zghaib",
        subjects: [
            "English", "English Language", "Reading", "Writing", 
            "Essay Writing", "Grammar", "Vocabulary",
            "Literature", "AP Literature", 
            "College Essays", "Creative Writing"
        ],
        bio: "Specialist in English Literature, Writing, and Composition (Grades 3-12).",
        school: "College Name Here", 
        major: "English/Literature", 
        gpa: "Scores/GPA Here", 
        hobbies: "Hobbies Here", 
        detailedBio: "I work with students from grades 3-12 to improve their reading comprehension and writing skills. I specialize in AP Literature and helping refine academic essays.",
        img: "images/profilepic.png"
    }
];

// 2. Search Function (Home Page)
function searchTutors() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('tutor-results');
    
    resultsContainer.innerHTML = "";

    if (input.trim() === "") {
        return;
    }

    const filteredTutors = tutors.filter(tutor => {
        const matchesSubject = tutor.subjects.some(sub => sub.toLowerCase().includes(input));
        const matchesName = tutor.name.toLowerCase().includes(input);
        return matchesSubject || matchesName;
    });

    if (filteredTutors.length === 0) {
        resultsContainer.innerHTML = "<p style='color:white; font-size: 1.1rem; margin-top: 2rem;'>No coaches found for this fight. Try another subject!</p>";
    } else {
        filteredTutors.forEach((tutor, index) => {
            const row = createTeamRow(tutor, index); 
            resultsContainer.appendChild(row);
        });
    }
}

// 3. Helper: Create Horizontal Row
function createTeamRow(tutor, index) {
    const row = document.createElement('div');
    row.className = 'tutor-row';
    
    const detailsId = `details-${index}-${Math.floor(Math.random() * 10000)}`; 
    const displaySubjects = tutor.subjects.slice(0, 6).join(", ") + (tutor.subjects.length > 6 ? ", and more..." : "");

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

// 4. Toggle Details Animation
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

// 5. Book Tutor Function (Auto-Selects Dropdown)
function bookTutor(tutorName) {
    const contactSection = document.getElementById('contact'); 
    const tutorSelect = document.getElementById('tutor-select');
    const messageBox = document.querySelector('textarea');    

    if (contactSection && tutorSelect) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        tutorSelect.value = tutorName;
        messageBox.focus();
    } else {
        alert(`Please email us at htbtutors@gmail.com to book ${tutorName}!`);
    }
}

// 6. Event Listeners
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchTutors();
        }
    });
}

// 7. Auto-Load Team on Team Page
const teamGrid = document.getElementById('team-grid');
if (teamGrid) {
    tutors.forEach((tutor, index) => {
        const row = createTeamRow(tutor, index);
        teamGrid.appendChild(row);
    });
}

// 8. Handle Form Submission (With Swipe Animation & Success/Error Colors)
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page reload
        
        const btn = bookingForm.querySelector('button');
        const originalText = "Send"; 
        
        // 1. ACTIVATE LOADING STATE
        btn.innerText = "Sending...";
        btn.classList.add('btn-loading'); // Start swipe animation
        btn.disabled = true;

        const formData = new FormData(bookingForm);

        fetch(bookingForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // 2. SUCCESS: Stop Loading, Go Green
            btn.classList.remove('btn-loading');
            btn.classList.add('btn-success');
            btn.innerText = "Message Sent! We'll contact you soon.";
            
            bookingForm.reset(); 
            
            // 3. Reset button after 5 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('btn-success');
                btn.disabled = false;
            }, 5000);
        })
        .catch(error => {
            // 4. ERROR: Stop Loading, Go Red
            console.error('Error!', error.message);
            btn.classList.remove('btn-loading');
            btn.classList.add('btn-error');
            btn.innerText = "Error! Please email us.";
            
            // Reset button after 5 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('btn-error');
                btn.disabled = false;
            }, 5000);
        });
    });
}