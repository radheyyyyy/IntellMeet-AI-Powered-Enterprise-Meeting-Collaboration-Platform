import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Bell, CalendarDays, CheckSquare, FileText, LayoutDashboard, LogOut, Menu, Settings, Users, Video } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  ["/", "Overview", LayoutDashboard],
  ["/teams", "Teams", Users],
  ["/meetings", "Meetings", Video],
  ["/tasks", "Task board", CheckSquare],
  ["/files", "Files", FileText],
  ["/calendar", "Calendar", CalendarDays],
  ["/settings", "Settings", Settings],
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  const logout = async () => { await signOut(); navigate("/login"); };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "is-open" : ""}`}>
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">i</span><span>IntellMeet</span></NavLink>
        <nav>{links.map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}><Icon size={19} /><span>{label}</span></NavLink>)}</nav>
        <div className="sidebar-user"><span className="avatar">{initials}</span><div><strong>{user?.firstName} {user?.lastName}</strong><small>{user?.role?.replace("_", " ")}</small></div><button className="icon-button" title="Log out" onClick={logout}><LogOut size={18} /></button></div>
      </aside>
      {open && <button className="backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <main>
        <header className="topbar"><button className="mobile-menu icon-button" onClick={() => setOpen(true)}><Menu /></button><div><p className="eyebrow">WORKSPACE</p><h1>Welcome back, {user?.firstName}</h1></div><div className="top-actions"><button className="icon-button"><Bell size={20} /></button><span className="avatar">{initials}</span></div></header>
        <section className="page-content"><Outlet /></section>
      </main>
    </div>
  );
}
