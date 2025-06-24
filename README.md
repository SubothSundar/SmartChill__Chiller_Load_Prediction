# SmartChill: AI-Powered Chiller Optimization

"SmartChill" is a web application that leverages a machine learning model to predict and optimize chiller plant load and efficiency. The project uses a modern web stack with a Next.js frontend and a FastAPI backend.

## Project Structure

-   `/frontend`: Contains the Next.js (React) user interface.
-   `/main.py`: The FastAPI backend server that serves the prediction model.
-   `/model.pkl`: The pre-trained machine learning model for predictions.

## Technology Stack

-   **Frontend**: [Next.js](https://nextjs.org/) (React Framework) with [Tailwind CSS](https://tailwindcss.com/)
-   **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python Web Framework)
-   **Machine Learning**: [Scikit-learn](https://scikit-learn.org/)

## Setup and Installation

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Python](https://www.python.org/) (v3.8 or later)
-   `pip` and `venv`

### 1. Clone the Repository

```bash
git clone https://github.com/SubothSundar/SmartChill-TEAM-HULL-.git
cd SmartChill-TEAM-HULL-
```

### 2. Setup the Backend

Create and activate a Python virtual environment, then install the required packages.

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\\Scripts\\activate
# On macOS/Linux
source venv/bin/activate

# Install Python packages
pip install -r requirements.txt
```

*(Note: If a `requirements.txt` does not exist, you can install packages manually: `pip install fastapi uvicorn scikit-learn numpy`)*

### 3. Setup the Frontend

Navigate to the `frontend` directory and install the Node.js dependencies.

```bash
cd frontend
npm install
```

## Running the Application

You need to run the backend and frontend servers in separate terminals.

### 1. Run the Backend Server

From the project's root directory:

```bash
uvicorn main:app --reload
```

The backend API will be available at `http://127.0.0.1:8000`.

### 2. Run the Frontend Server

From the `frontend` directory:

```bash
npm run dev
```

The website will be available at `http://localhost:3000`.
