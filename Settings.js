import React, { useState, useEffect } from 'react';

const Settings = () => {
  const userId = localStorage.getItem('userId');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/profile/${userId}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
      });
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/auth/settings/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Account Settings</h2>
      <form onSubmit={handleUpdate}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
