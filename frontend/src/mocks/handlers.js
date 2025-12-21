import { http } from 'msw';

// Mock data
const mockProfile = {
    id: 1,
    name: "datheory",
    title: "Data Science & Machine Learning Engineer",
    email: "muhdhiauddin@gmail.com",
    phone: "+62 812 3456 7890",
    location: "Indonesia",
    bio: "I am a passionate Data Science & Machine Learning Engineer with expertise in building end-to-end data solutions and AI-powered applications. With experience in Python, JavaScript, and various ML frameworks, I create innovative solutions that drive business value.",
    about: "I specialize in developing data science and machine learning solutions that transform raw data into actionable insights. My expertise spans across data engineering, model development, and deployment of AI systems. I'm passionate about leveraging cutting-edge technologies to solve complex problems.",
    profile_image: null,
    created_at: "2025-01-01T00:00:00.0000Z",
    updated_at: "2025-01-01T00:00:00.0000Z"
};

const mockSkills = [{
        id: 1,
        name: "Python",
        category: "Programming",
        level: 95,
        icon: "python",
        created_at: "2025-01T0:00:00.000000Z",
        updated_at: "2025-01-01T00:00.000000Z"
    },
    {
        id: 2,
        name: "Machine Learning",
        category: "AI/ML",
        level: 90,
        icon: "ml",
        created_at: "2025-01-01T00:00.000000Z",
        updated_at: "2025-01-01T00:00.000000Z"
    },
    {
        id: 3,
        name: "Data Analysis",
        category: "Data Science",
        level: 88,
        icon: "analysis",
        created_at: "2025-01-01T00:00.000000Z",
        updated_at: "2025-01-01T00:00.00000Z"
    },
    {
        id: 4,
        name: "React",
        category: "Frontend",
        level: 85,
        icon: "react",
        created_at: "2025-01-01T00:00:00.000000Z",
        updated_at: "2025-01-01T00:00:00.000000Z"
    },
    {
        id: 5,
        name: "Node.js",
        category: "Backend",
        level: 80,
        icon: "node",
        created_at: "2025-01-01T00:00:00.000000Z",
        updated_at: "2025-01-01T00:00:00.000000Z"
    },
    {
        id: 6,
        name: "SQL",
        category: "Database",
        level: 92,
        icon: "sql",
        created_at: "2025-01-01T00:00:00.000000Z",
        updated_at: "2025-01-01T00:00:00.0000Z"
    }
];

const mockProjects = [{
        id: 1,
        title: "Predictive Analytics Dashboard",
        description: "A comprehensive dashboard that uses machine learning algorithms to predict business trends and customer behavior.",
        content: "This project implements advanced machine learning models to analyze historical data and predict future trends. It includes data preprocessing, model training, and visualization components.",
        image: null,
        github_url: "https://github.com/username/predictive-analytics",
        live_url: "https://example.com/predictive-analytics",
        skills_used: ["Python", "Machine Learning", "Data Analysis", "React"],
        created_at: "2025-01T00:00:00.00000Z",
        updated_at: "2025-01-01T00:00.000000Z"
    },
    {
        id: 2,
        title: "NLP Sentiment Analysis Tool",
        description: "Natural language processing tool that analyzes sentiment in text data from various sources.",
        content: "This application uses advanced NLP techniques to analyze sentiment in real-time. It processes text from social media, reviews, and other sources to determine positive, negative, or neutral sentiment.",
        image: null,
        github_url: "https://github.com/username/sentiment-analysis",
        live_url: "https://example.com/sentiment-analysis",
        skills_used: ["Python", "NLP", "Machine Learning", "API Development"],
        created_at: "2025-01T00:00:00.0000Z",
        updated_at: "2025-01-01T00:00:00.0000Z"
    },
    {
        id: 3,
        title: "Recommendation Engine",
        description: "Personalized recommendation system for e-commerce platforms using collaborative filtering.",
        content: "This recommendation engine uses collaborative filtering and content-based algorithms to provide personalized product recommendations to users, increasing engagement and sales.",
        image: null,
        github_url: "https://github.com/username/recommendation-engine",
        live_url: "https://example.com/recommendation-engine",
        skills_used: ["Python", "Machine Learning", "Data Analysis", "Node.js"],
        created_at: "2025-01-01T00:00.000000Z",
        updated_at: "2025-01-01T00:00:00.0000Z"
    }
];

export const handlers = [
    // Profile handlers
    http.get('http://127.0.0.1:8000/api/profile', () => {
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Profile retrieved successfully',
                data: mockProfile
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }),

    // Skills handlers
    http.get('http://127.0.0.1:8000/api/skills', () => {
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Skills retrieved successfully',
                data: mockSkills
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }),

    // Projects handlers
    http.get('http://127.0.0.1:8000/api/projects', () => {
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Projects retrieved successfully',
                data: mockProjects
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }),

    // Health check
    http.get('http://127.0.0.1:8000/api/health', () => {
        return new Response(
            JSON.stringify({
                success: true,
                message: 'API is healthy',
                data: { status: 'ok' }
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    })
];
