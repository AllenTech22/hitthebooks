// js/script.js

// 1. The Data: List of Tutors
const tutors = [
    {
        name: "Sarah Jenkins",
        subjects: ["Calculus", "Algebra", "SAT Math"],
        bio: "Math major with 5 years of teaching experience.",
        school: "Columbia University",
        major: "Mathematics",
        gpa: "3.9 GPA / 1580 SAT",
        hobbies: "Chess, Hiking, Piano",
        detailedBio: "I specialize in helping students overcome math anxiety. My teaching style focuses on breaking down complex problems into simple, manageable steps.",
        img: "images/profilepic.png" 
    },
    {
        name: "David Chen",
        subjects: ["Physics", "Calculus", "Math"],
        bio: "Engineering graduate who loves mechanics.",
        school: "Georgia Tech",
        major: "Mechanical Engineering",
        gpa: "4.0 GPA",
        hobbies: "Robotics, Cycling, Sci-Fi Novels",
        detailedBio: "Physics doesn't have to be scary. I use real-world examples to explain forces and motion, making abstract concepts easy to visualize.",
        img: "images/profilepic.png"
    },
    {
        name: "Emily Davis",
        subjects: ["English", "Literature", "Essay Writing"],
        bio: "Published author and creative writing coach.",
        school: "NYU",
        major: "English Literature",
        gpa: "3.8 GPA",
        hobbies: "Poetry, Theater, Coffee",
        detailedBio: "I help students find their unique voice in writing. Whether it's a college essay or a literary analysis, we will craft something you are proud of.",
        img: "images/profilepic.png"
    },
    {
        name: "Michael Ross",
        subjects: ["Biology", "Anatomy", "MCAT Prep"],
        bio: "Pre-med student with a passion for life sciences.",
        school: "Johns Hopkins",
        major: "Biology",
        gpa: "3.95 GPA / 520 MCAT",
        hobbies: "Gardening, Cooking, Basketball",
        detailedBio: "Biology is the study of life, and I bring that life into every lesson. I focus on memory techniques and understanding systems.",
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
        const matchesSubject = tutor.subjects.some(sub => sub.toLowerCase().includes(input));
        const matchesName = tutor.name.toLowerCase().includes(input);
        return matchesSubject || matchesName;
    });

    if (filteredTutors.length === 0) {
        resultsContainer.innerHTML = "<p style='color:white;'>No coaches found for this fight. Try another subject!</p>";
    } else {
        filteredTutors.forEach(tutor => {
            const card = createTutorCard(tutor);
            resultsContainer.appendChild(card);
        });
    }
}

// 3. Helper: Create Vertical Card (Home Page Search)
function createTutorCard(tutor) {
    const card = document.createElement('div');
    card.className = 'tutor-card';
    
    // Updated Button with onclick event
    card.innerHTML = `
        <h3>${tutor.name}</h3>
        <p class="subjects"><strong>Specialties:</strong> ${tutor.subjects.join(", ")}</p>
        <p class="bio">${tutor.bio}</p>
        <div class="card-footer">
            <button class="btn-book" onclick="bookTutor('${tutor.name}')">Book Now</button>
        </div>
    `;
    return card;
}

// 4. Helper: Create Horizontal Row (Team Page)
function createTeamRow(tutor, index) {
    const row = document.createElement('div');
    row.className = 'tutor-row';
    const detailsId = `details-${index}`;

    // Updated Button with onclick event
    row.innerHTML = `
        <div class="row-header">
            <img src="${tutor.img}" alt="${tutor.name}" class="profile-pic">
            
            <div class="row-info">
                <h3>${tutor.name}</h3>
                <p class="subjects"><strong>Specialties:</strong> ${tutor.subjects.join(", ")}</p>
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
            </div>
        </div>
    `;
    return row;
}

// 5. Toggle Details Animation
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

// 6. NEW: Book Tutor Function (Handles Scrolling & Pre-filling)
function bookTutor(tutorName) {
    // 1. Find the contact section and textarea
    const contactSection = document.getElementById('contact'); 
    const messageBox = document.querySelector('textarea');    

    if (contactSection && messageBox) {
        // 2. Scroll to the footer smoothly
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // 3. Pre-fill the text area
        messageBox.value = `Hi, I am interested in booking a session with ${tutorName}.`;
        
        // 4. Briefly highlight the message box so they see it
        messageBox.focus();
    } else {
        // Fallback if we are on a page without a contact form
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