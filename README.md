# Help Me Decide

An AI-assisted decision-making web application that helps users make better decisions through guided reflection.

## Overview

Help Me Decide is a web app that assists users in making decisions between two options. The app generates thoughtful multiple-choice questions based on the options provided, and after the user answers these questions, it provides a recommendation with reasoning.

## Features

- **Option Input**: Users enter two options they are deciding between
- **Reflective Questions**: AI generates 3-5 thoughtful multiple-choice questions to help users reflect on their priorities
- **Sequential Question Flow**: One question at a time with a progress indicator
- **Back Navigation**: Users can go back to review and change their answers
- **AI Recommendation**: Based on the answers, the app suggests a decision with concise reasoning
- **Clean, Minimal UI**: Easy-to-use interface with a focus on the decision-making process

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend API**: Next.js API routes
- **Future Enhancement**: Integration with DeepSeek or other LLM APIs for more personalized questions and recommendations

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/help-me-decide.git
   cd help-me-decide
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Architecture

The app consists of two main API endpoints:

1. `/api/questions` - Generates questions based on the two options provided
2. `/api/decision` - Provides a recommendation based on the answers to the questions

Currently, these endpoints use placeholder logic, but they're designed to be easily integrated with LLM APIs for more sophisticated question generation and decision-making in the future.

## Future Enhancements

- Integration with DeepSeek API or other LLM providers
- User accounts to save past decisions
- More detailed analysis of decision factors
- Option to share decision processes with others
- Mobile app version
