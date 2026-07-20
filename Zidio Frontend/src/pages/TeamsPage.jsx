import { useEffect, useState } from "react";
import { Plus, Users } from "lucide-react";
import api, { getApiError } from "../api/client.js";
import Modal from "../components/Modal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]); const [modal, setModal] = useState(false); const [form, setForm] = useState({ name: "", description: "" }); const [error, setError] = useState(""); const { user } = useAuth();
  const canManage = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);
  const load = async () => { const { data } = await api.get("/teams"); setTeams(data.teams || []); };
  useEffect(() => { load(); }, []);
  const create = async (e) => { e.preventDefault(); try { await api.post("/teams", form); setModal(false); setForm({ name: "", description: "" }); load(); } catch (err) { setError(getApiError(err)); } };
  return <><div className="page-heading"><div><h2>Teams</h2><p>Organize people, meetings, and work into shared workspaces.</p></div>{canManage && <button className="primary-button" onClick={() => setModal(true)}><Plus size={18} />Create team</button>}</div><div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><div className="team-icon"><Users size={21} /></div><h3>{team.name}</h3><p>{team.description || "No description added yet."}</p><div className="card-footer"><span>{team.members?.length || 0} members</span><span>Owner: {team.owner?.firstName || "—"}</span></div></article>)}{!teams.length && <div className="empty-state wide">No teams yet. {canManage ? "Create the first team to begin collaborating." : "Ask an administrator to add you to a team."}</div>}</div>{modal && <Modal title="Create a team" onClose={() => setModal(false)}><form className="modal-form" onSubmit={create}><label>Team name<input required minLength="3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit">Create team</button></form></Modal>}</>;
}
