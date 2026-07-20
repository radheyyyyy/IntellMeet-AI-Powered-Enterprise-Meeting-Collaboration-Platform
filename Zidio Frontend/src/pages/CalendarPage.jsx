import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import api from "../api/client.js";

export default function CalendarPage(){const[meetings,setMeetings]=useState([]);useEffect(()=>{api.get("/meetings").then(({data})=>setMeetings(data.meetings||[]))},[]);return <><div className="page-heading"><div><h2>Calendar</h2><p>Your scheduled meetings in one simple timeline.</p></div></div><section className="panel"><div className="timeline">{meetings.sort((a,b)=>new Date(a.scheduledAt)-new Date(b.scheduledAt)).map(m=><div className="timeline-item" key={m._id}><span className="timeline-icon"><CalendarDays size={17}/></span><div><strong>{m.title}</strong><p>{new Date(m.scheduledAt).toLocaleString()} · {m.team?.name||"Team"}</p></div><span className={`tag ${m.status?.toLowerCase()}`}>{m.status}</span></div>)}{!meetings.length&&<div className="empty-state">Nothing scheduled yet.</div>}</div></section></>}
