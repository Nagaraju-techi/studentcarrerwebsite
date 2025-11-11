// App.js - Complete version with all features
import React, { useState } from "react";
import LoginSignup from "./components/LoginSignup";
import CareerWellnessWebsite from "./components/CareerWellnessWebsite";
import CompanyPreparation from "./components/CompanyPreparation";
import StressReliever from "./components/StressReliever";
import ResumeBuilder from "./components/ResumeBuilder";
import ProgressTracking from "./components/ProgressTracking";
import MockInterviews from "./components/MockInterviews";
import CommunitySupport from "./components/CommunitySupport";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Root route - redirect based on login status */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Login page */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginSignup onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />

          {/* Protected route for main page */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <CareerWellnessWebsite onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Resume Builder Page */}
          <Route
            path="/resume-builder"
            element={
              isLoggedIn ? (
                <ResumeBuilder onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Company Preparation Page */}
          <Route
            path="/company-prep"
            element={
              isLoggedIn ? (
                <CompanyPreparation onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Stress Reliever Page */}
          <Route
            path="/stress-reliever"
            element={
              isLoggedIn ? (
                <StressReliever onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Progress Tracking Page */}
          <Route
            path="/progress-tracking"
            element={
              isLoggedIn ? (
                <ProgressTracking onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Mock Interviews Page */}
          <Route
            path="/mock-interviews"
            element={
              isLoggedIn ? (
                <MockInterviews onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Community Support Page */}
          <Route
            path="/community-support"
            element={
              isLoggedIn ? (
                <CommunitySupport onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Legacy routes for backward compatibility */}
          <Route path="/LoginSignup" element={<Navigate to="/login" replace />} />
          <Route
            path="/careerWellnessWebsite"
            element={<Navigate to="/dashboard" replace />}
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;