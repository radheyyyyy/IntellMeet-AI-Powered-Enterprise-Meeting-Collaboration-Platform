import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import TeamsPage from "./pages/TeamsPage.jsx";
import MeetingsPage from "./pages/MeetingsPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import FilesPage from "./pages/FilesPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

function Protected() { const { user, loading } = useAuth(); if (loading) return <div className="app-loader">Loading IntellMeet…</div>; return user ? <AppLayout /> : <Navigate to="/login" replace />; }
export default function App(){return <Routes><Route path="/login" element={<AuthPage mode="login"/>}/><Route path="/signup" element={<AuthPage mode="signup"/>}/><Route element={<Protected/>}><Route path="/" element={<DashboardPage/>}/><Route path="/teams" element={<TeamsPage/>}/><Route path="/meetings" element={<MeetingsPage/>}/><Route path="/tasks" element={<TasksPage/>}/><Route path="/files" element={<FilesPage/>}/><Route path="/calendar" element={<CalendarPage/>}/><Route path="/settings" element={<SettingsPage/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
