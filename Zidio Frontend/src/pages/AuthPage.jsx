import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, LockKeyhole, UsersRound, Video } from "lucide-react";
import { getApiError } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage({ mode = "login" }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  if (user) return <Navigate to="/" replace />;

  const submit = async (event) => {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      if (isLogin) await signIn({ email: form.email, password: form.password });
      else { await signUp(form); await signIn({ email: form.email, password: form.password }); }
      navigate("/");
    } catch (err) { setError(getApiError(err)); } finally { setBusy(false); }
  };

  return <div className="auth-page"><section className="auth-pitch"><div className="brand"><span className="brand-mark">i</span>IntellMeet</div><div><p className="eyebrow">ONE WORKSPACE. EVERY CONVERSATION.</p><h1>Meet, decide, and move work forward.</h1><p>Bring video meetings, team tasks, decisions, and shared files together in one focused workspace.</p></div><ul><li><Video /> Secure team meetings</li><li><CheckCircle2 /> Shared action and task tracking</li><li><UsersRound /> Connected workspaces</li></ul></section><section className="auth-form-area"><form className="auth-card" onSubmit={submit}><p className="eyebrow">{isLogin ? "WELCOME BACK" : "CREATE YOUR ACCOUNT"}</p><h2>{isLogin ? "Sign in to IntellMeet" : "Start collaborating"}</h2><p className="muted">{isLogin ? "Enter your account details to continue." : "Set up your workspace account in a moment."}</p>{!isLogin && <div className="two-col"><label>First name<input required minLength="2" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></label><label>Last name<input required minLength="2" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></label></div>}<label>Email<input required type="email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Password<input required type="password" minLength="8" placeholder="At least 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button full" disabled={busy}>{busy ? "Please wait…" : isLogin ? "Sign in" : "Create account"}<ArrowRight size={18} /></button><p className="switch-copy">{isLogin ? "New to IntellMeet?" : "Already have an account?"}<button type="button" className="text-button" onClick={() => { setIsLogin(!isLogin); setError(""); }}>{isLogin ? "Create an account" : "Sign in"}</button></p><p className="secure-note"><LockKeyhole size={14} /> Your workspace stays private and secure.</p></form></section></div>;
}
