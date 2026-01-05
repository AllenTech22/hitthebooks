// js/script.js

// 1. The Data: Real Team & Generated Keywords
const tutors = [
    {
        name: "Allen Fraiman",
        // Reordered to show diversity (Math + Science) immediately on the card
        subjects: [
            "Algebra", "Calculus", "Physics", "Chemistry", "Mechanical Engineering",
            "Math", "Geometry", "Trigonometry", "Pre-Calculus", 
            "Calculus 1", "Calculus 2", "Calculus 3", "Differential Equations", 
            "Statistics", "AP Statistics", "AP Calculus",
            "Physics 1", "Physics 2", "E&M", "Electricity & Magnetism",
            "General Chemistry",
            "Thermodynamics", "Fluid Mechanics", "Material Science", "Mechanics of Materials",
            "SAT Prep", "ACT Prep", "Test Prep"
        ],
        bio: "STEM specialist. Tutoring Math, Physics, Chemistry, and standardized test prep.",
        school: "Boston University / Staten Island Technical HS", 
        major: "Mechanical Engineering", 
        gpa: "3.98 GPA / 1510 SAT", 
        hobbies: "Soccer, Jiu Jitsu, Music", 
        detailedBio: "With 4 years of experience tutoring students from elementary to college level, I have extensive experience teaching STEM topics, including AP courses and middle school curriculum. I have helped students gain acceptance into specialized high schools and increase their SAT scores by 250+ points.",
        img: "images/allen_profile.jpeg" 
    },
    {
        name: "Philip Zghaib",
        // Reordered to show Test Prep & Math immediately
        subjects: [
            "SAT Prep", "Math", "LSAT Prep", "Accounting", "Algebra", 
            "Calculus", "Finance", "Economics",
            "Algebra 1", "Algebra 2", "Geometry", "Trigonometry", 
            "Pre-Calculus", "Calculus 1",
            "Financial Accounting", "Corporate Finance", "Business",
            "AP Macroeconomics",
            "SAT Math", "SAT Verbal", "Test Prep"
        ],
        bio: "Accounting & Finance Major. Expert in SAT strategies and logical reasoning.",
        school: "Fordham University / Staten Island Technical HS", 
        major: "Accounting and Finance", 
        gpa: "3.7 GPA / 1480 SAT", 
        hobbies: "Travelling, Music Production, Cooking", 
        detailedBio: "I am an alumnus of Staten Island Technical HS and Fordham University. As an LSAT (166) and CPA exam candidate, I specialize in logical, step-by-step thinking. I teach heuristic strategies that help students cut down time and arrive at the right answer efficiently, particularly for the SAT (all sections), Mathematics, and Financial Accounting.",
        img: "images/phil_profile.jpg"
    },
    {
        name: "Sam Fraiman",
        // Reordered to show Math, Chemistry, and Test Prep immediately
        subjects: [
            "Math", "Chemistry", "SAT Prep", "Algebra 1", "Geometry",
            "Algebra 2", "Pre-Calculus", "AP Pre-Calculus",
            "High School Chemistry",
            "ACT Prep", "Test Prep"
        ],
        bio: "Mechanical Engineering Major. Building strong foundations in K-12 Math and Chemistry.",
        school: "Northeastern University / Staten Island Tech HS", 
        major: "Mechanical Engineering", 
        gpa: "4.0 GPA / 33 ACT", 
        hobbies: "Coding, Jiu Jitsu, Baking", 
        detailedBio: "I help students master math concepts from 3rd grade through AP Pre-Calculus. I also provide dedicated tutoring for High School Chemistry and test preparation.",
        img: "images/sam_profile.png"
    },
    {
        name: "Lillian Zghaib",
        // Reordered to highlight Test Prep & College Essays immediately
        subjects: [
            "SAT Reading", "SAT Writing", "College Essays", "English", "AP Literature",
            "Reading", "Writing", "Essay Writing", "Grammar", "Vocabulary",
            "Literature", "English Language", "Creative Writing"
        ],
        bio: "English & Writing Specialist. Perfect Scorer in SAT Reading/Writing.",
        school: "Staten Island Technical HS", 
        major: "English / Literature", 
        gpa: "4.0 GPA / 1540 SAT (Perfect Reading/Writing)", 
        hobbies: "Writing, Music, Reading", 
        detailedBio: "With a perfect score in the Reading and Writing portion of the SAT, and as the author of an award-winning essay, I specialize in high school-level language examinations, college essay writing, and SAT English prep. I work with students from grades 3-12 to master reading comprehension and composition.",
        img: "images/lily_profile.jpg"
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