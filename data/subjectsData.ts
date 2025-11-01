// data/subjectsData.ts
// Subjects extracted from the uploaded syllabus PDF (only names).
// Semester keys are "Semester 1" .. "Semester 8"

const subjectsData: Record<string, string[]> = {
    "Semester 1": [
        "Engineering Mechanics",
        "Engineering Graphics",
        "Mathematics-I",
        "Physics",
        "Enterpreneurship",
        "Punjabi",
    ],
    "Semester 2": [
        "Engineering Chemistry",
        "Mathematics-II",
        "Basic Electrical & Electronics Engineering",
        "Fundamentals of IT & Programming using Python",
        "Communicative English-I",
        "Elective-II",
        "Manufacturing Practices",
    ],
    "Semester 3": [
        "Programming in C++",
        "Data Structures",
        "Digital Design",
        "Written & Oral Technical Communication",
        "Mini Project",
    ],
    "Semester 4": [
        "Operating System",
        "Data Communication",
        "System Programming",
        "Discrete Structures",
        "Computer Architecture",
        "Human Rights and Constitutional Duties",
    ],
    "Semester 5": [
        "System Analysis And Design",
        "Relational Database Management Systems",
        "Design & Analysis of Algorithms",
        "Formal Languages & Automata Theory",
        "Programming in ASP.Net",
        "Interdisciplinary Course-I",
    ],
    "Semester 6": [
        "Object Oriented Analysis & Design",
        "Object Oriented Programming using JAVA",
        "Software Engineering and Testing",
        "Elective-I",
        "Real Time Systems",
    ],
    "Semester 7": [
        "Computer Graphics",
        "Cloud Computing",
        "Artificial Intelligence",
        "Machine Learning",
        "Departmental Elective-II",
    ],
    "Semester 8": [
        "Industrial Training Cum Projects",
    ],
};

export default subjectsData;
