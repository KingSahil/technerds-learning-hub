// Core theory CSE subjects (Semester → Subject → Topics → Placeholder YouTube video)

const learningData: Record<
    string,
    Record<string, { title: string; video: string }[]>
> = {
    "Semester 1": {
        "Engineering Mechanics": [
            { title: "Laws of Motion and Equilibrium", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Friction and Inclined Planes", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Centroid and Moment of Inertia", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Kinematics and Dynamics of Particles", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Physics": [
            { title: "Waves and Oscillations", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Interference and Diffraction", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Quantum Mechanics", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Semiconductors and Superconductivity", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Mathematics-I": [
            { title: "Differential Calculus", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Multiple Integrals", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Vector Calculus", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Differential Equations", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Engineering Graphics and Drafting": [
            { title: "Orthographic Projection", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Isometric Drawing", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Section of Solids", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
    },

    "Semester 2": {
        "Programming in Python": [
            { title: "Python Basics", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Functions and Modules", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Object-Oriented Programming", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "File Handling", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Basic Electrical and Electronics Engineering": [
            { title: "Circuit Theorems", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "AC/DC Circuits", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Diodes and Transistors", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Mathematics-II": [
            { title: "Laplace Transforms", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Fourier Series", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Matrices and Linear Algebra", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
    },

    "Semester 3": {
        "Data Structures": [
            { title: "Arrays and Linked Lists", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Stacks and Queues", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Trees and Binary Search Trees", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Graphs and Traversal Algorithms", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Discrete Mathematics": [
            { title: "Set Theory and Relations", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Graph Theory", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Propositional Logic", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Digital Electronics": [
            { title: "Boolean Algebra", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Combinational Circuits", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Sequential Circuits", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
    },

    "Semester 4": {
        "Operating Systems": [
            { title: "Process Scheduling", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Deadlocks", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Memory Management", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Database Management Systems": [
            { title: "ER Model", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Normalization", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "SQL Queries", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Computer Networks": [
            { title: "OSI and TCP/IP Models", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Routing Algorithms", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Network Security", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
    },

    "Semester 5": {
        "Design and Analysis of Algorithms": [
            { title: "Divide and Conquer", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Dynamic Programming", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Graph Algorithms", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Theory of Computation": [
            { title: "Finite Automata", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Context-Free Grammars", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Turing Machines", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Software Engineering": [
            { title: "SDLC Models", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Requirements Engineering", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Testing and Maintenance", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
    },

    "Semester 6": {
        "Compiler Design": [
            { title: "Lexical Analysis", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Parsing", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Code Generation", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Object-Oriented Programming using Java": [
            { title: "Inheritance and Polymorphism", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Exception Handling", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Multithreading", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Artificial Intelligence": [
            { title: "Search Algorithms", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Knowledge Representation", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Expert Systems", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
    },

    "Semester 7": {
        "Machine Learning": [
            { title: "Supervised Learning", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Unsupervised Learning", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Neural Networks", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Cloud Computing": [
            { title: "Virtualization", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "AWS and Azure Basics", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Serverless Computing", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Data Mining": [
            { title: "Data Preprocessing", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Classification and Clustering", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
    },

    "Semester 8": {
        "Big Data Analytics": [
            { title: "Hadoop and MapReduce", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Spark Framework", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Streaming Analytics", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Deep Learning": [
            { title: "CNN Architectures", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "RNN and LSTM", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Transfer Learning", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        "Project Work": [
            { title: "Problem Definition", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "System Design and Implementation", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
    },
};

export default learningData;
