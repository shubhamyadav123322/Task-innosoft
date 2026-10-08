# Assessment App

A single-page quiz/assessment application built with React (JavaScript/JSX), Tailwind CSS, and `useReducer` for state management.

## Features

- **10 assessment questions** loaded from a local JSON data file
- **useReducer-based state management** handling questions, current question, user answers, timer, and quiz status in a single reducer
- **Start Screen** showing the number of questions, time limit, and a Start button
- **Quiz Screen** with current question, options, question number, countdown timer, Previous/Next navigation, and Submit button
- **10-minute countdown timer** that auto-submits when time runs out
- **localStorage persistence** — saves state on every change and restores it on page refresh so the user can continue from where they left off
- **Result Screen** showing score, total questions, and percentage
- **Review section** displaying each question, the user's selected answer, the correct answer, and a Correct/Incorrect badge
- **Restart Assessment** option to reset everything
- **Fully responsive** across mobile, tablet, laptop, desktop, and large screens

## Technologies Used

- **React 18** with JavaScript (JSX)
- **Vite** as the build tool and dev server
- **Tailwind CSS** for all styling
- **Lucide React** for icons
- **useReducer** for centralized state management
- **localStorage** for persistence across page refreshes

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd assessment-app

# Install dependencies
npm install
```

### Running the Project Locally

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
npm run preview
```

## Important Implementation Details

### State Management with useReducer

All quiz state is managed through a single `useReducer` in `src/quizReducer.js`:

- **Status**: `idle` → `active` → `submitted`
- **currentIndex**: tracks the currently displayed question
- **answers**: array storing the selected option index (or `null`) for each question
- **timeRemaining**: seconds left on the countdown
- **startTime**: timestamp when the quiz started (used to calculate remaining time after a page refresh)

Actions: `START`, `SELECT_ANSWER`, `NEXT`, `PREV`, `GO_TO`, `TICK`, `SUBMIT`, `RESTART`.

### Timer Implementation

A `setInterval` running every second dispatches a `TICK` action. When `timeRemaining` reaches 0, the reducer automatically transitions the quiz to the `submitted` status. The timer is cleaned up when the quiz is not active.

### localStorage Persistence

The app saves the entire quiz state to `localStorage` on every state change via a `useEffect`. On page load, the saved state is retrieved and the remaining time is recalculated based on the stored `startTime` and the current time, ensuring the timer stays accurate even after a refresh.

### Responsive Design

Tailwind CSS responsive utilities are used throughout (grid breakpoints, responsive text sizes, flexible layouts) to ensure the app works cleanly on all screen sizes with no horizontal overflow.
