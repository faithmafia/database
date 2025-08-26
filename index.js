import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabaseUrl = "https://fgyybzoiyefylkiqjtre.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZneXliem9peWVmeWxraXFqdHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxODA1OTIsImV4cCI6MjA3MTc1NjU5Mn0._xUHt1uQ5tZHW5fzhhzznSyhhKn58XNTyU3i1ZanNn0"; // replace with your anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const logoutBtn = document.getElementById("logoutBtn");
const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("addModal");
const closeBtn = modal.querySelector(".close");
const saveBtn = document.getElementById("savePerson");

// Show modal
addBtn.onclick = () => modal.style.display = "block";
// Close modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// Logout
logoutBtn.onclick = async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
};

// Load table
async function loadPeople() {
    const { data, error } = await supabase.from('people').select('*');
    const table = document.getElementById("people-table");
    if (error) { console.error(error); return; }

    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Relation</th>
            <th>Birthday</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Notes</th>
        </tr>
    `;
    data.forEach(person => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${person.id}</td>
            <td>${person.full_name || ""}</td>
            <td>${person.relation || ""}</td>
            <td>${person.birthday || ""}</td>
            <td>${person.email || ""}</td>
            <td>${person.phone || ""}</td>
            <td>${person.notes || ""}</td>
        `;
        table.appendChild(row);
    });
}

// Add new person
saveBtn.onclick = async () => {
    const person = {
        full_name: document.getElementById("full_name").value,
        relation: document.getElementById("relation").value,
        birthday: document.getElementById("birthday").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        notes: document.getElementById("notes").value
    };

    const { data, error } = await supabase.from('people').insert([person]);
    if (error) {
        alert("Error adding person: " + error.message);
    } else {
        modal.style.display = "none"; // close modal
        // Clear form
        Object.keys(person).forEach(key => document.getElementById(key).value = "");
        loadPeople(); // refresh table
    }
};

// Initial load
loadPeople();
