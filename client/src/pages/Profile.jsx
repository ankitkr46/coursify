import React, { useEffect, useState } from "react";
import API from "../utils/api";
import './profile.css';
import Heatmap from "../components/Profile/Heatmap";
import StreakTable from "../components/Profile/StreakTable";

const Profile = () => {
  const [user, setUser] = useState({ name: "User", email: "", avatar: "" });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      // Try to fetch authoritative profile from server when logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const resp = await API.get('/users/me');
          const serverUser = resp.data.user || {};
          const name = serverUser.name || localStorage.getItem('fullName') || 'User';
          const email = serverUser.username || localStorage.getItem('username') || '';
          const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&rounded=true`;
          setUser({ name, email, avatar });
          // fetch purchased courses
          try {
            const response = await API.get('/users/purchasedCourses');
            setCourses(response.data.purchasedCourses || []);
          } catch (err) {
            setCourses([]);
          }
        } catch (err) {
          // fallback to client-side stored values
          const storedName = localStorage.getItem('fullName') || '';
          const storedUsername = localStorage.getItem('username') || localStorage.getItem('email') || '';
          const name = storedName || storedUsername || 'User';
          const email = storedUsername || '';
          const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&rounded=true`;
          setUser({ name, email, avatar });
          setCourses([]);
        }
      } else {
        // not logged in: use localStorage values
        const storedName = localStorage.getItem('fullName') || '';
        const storedUsername = localStorage.getItem('username') || localStorage.getItem('email') || '';
        const name = storedName || storedUsername || 'User';
        const email = storedUsername || '';
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&rounded=true`;
        setUser({ name, email, avatar });
        setCourses([]);
      }
    }
    fetchProfile();
  }, []);

  // edit name state
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveName() {
    if (!newName || newName.trim().length === 0) return;
    setSaving(true);
    try {
      const resp = await API.put('/users/me', { name: newName.trim() });
      const updated = resp.data.user;
      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(updated.name)}&background=0D8ABC&color=fff&rounded=true`;
      setUser(prev => ({ ...prev, name: updated.name, avatar }));
      localStorage.setItem('fullName', updated.name);
      setIsEditing(false);
      setNewName('');
    } catch (err) {
      console.error('Failed to update name', err);
      alert('Failed to update name');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="avatar" className="profile-avatar" />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h2 style={{ margin: 0 }}>{user.name}</h2>
            {!isEditing && (
              <button onClick={() => { setIsEditing(true); setNewName(user.name); }} style={{ padding: '6px 10px', cursor: 'pointer' }}>Edit</button>
            )}
          </div>
          <p>{user.email}</p>
          {isEditing && (
            <div style={{ marginTop: 8 }}>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Enter full name" style={{ padding: 8, width: 220 }} />
              <button onClick={saveName} disabled={saving} style={{ marginLeft: 8 }}>{saving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => { setIsEditing(false); setNewName(''); }} style={{ marginLeft: 8 }}>Cancel</button>
            </div>
          )}
        </div>
      </div>
      <div className="profile-section">
        <h3>My Courses</h3>
        <ul className="profile-courses">
          {courses.length === 0 ? (
            <li>No courses purchased yet.</li>
          ) : (
            courses.map(course => (
              <li key={course._id || course.id}>
                <strong>{course.title}</strong> - ₹{course.price}
              </li>
            ))
          )}
        </ul>
      </div>
      <Heatmap />
      <StreakTable />
    </div>
  );
};

export default Profile;
