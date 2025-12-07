# LearnLabs Frontend

An AI-driven learning platform that generates personalized courses, tutorials, and developer roadmaps based on any topic or technology.

🔗 **Live Demo**: [https://learn-labs-fe.vercel.app/](https://learn-labs-fe.vercel.app/)

🔗 **Backend Repository**: [Link ](https://github.com/NikhilMahajn/LearnLabs-be)


## Overview

LearnLabs helps developers and learners master new technologies through AI-generated, structured learning content. Search for any subject like React, Python, CSS, Node.js, or explore complete learning paths such as Frontend and Backend Development. The platform delivers beginner-friendly explanations and step-by-step roadmaps to help you build tech skills efficiently.

## Features

- **AI-Powered Course Generation**: Get personalized courses on any programming language, framework, or technology
- **Developer Roadmaps**: Access comprehensive learning paths for Frontend, Backend, and Full-Stack development
- **Structured Lessons**: Follow organized, step-by-step tutorials designed for progressive learning
- **Beginner-Friendly**: Content tailored for learners at all levels with clear explanations
- **Wide Topic Coverage**: From fundamental programming concepts to advanced technologies

## Tech Stack

- **React**: Frontend framework
- **Javascript**: Faster Development
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling (if applicable)
- **Vercel**: Deployment platform

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NikhilMahajn/LearnLabs-fe
cd learnLabs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```env
VITE_API_URL=your_api_url_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Project Structure
```
src/
├── components/     # Reusable React components
├── pages/          # Page components
├── cotext/          # Global Contexts
├── utils/          # Utility functions
├── assets/         # Static assets
└── App.tsx         # Main application component
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ by the [Nikil Mahajan](https://nikhilmahajan.vercel.app)