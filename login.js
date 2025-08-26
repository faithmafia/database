import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = "https://fgyybzoiyefylkiqjtre.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZneXliem9peWVmeWxraXFqdHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxODA1OTIsImV4cCI6MjA3MTc1NjU5Mn0._xUHt1uQ5tZHW5fzhhzznSyhhKn58XNTyU3i1ZanNn0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageEl = document.getElementById("message");

    messageEl.style.color = "red";
    messageEl.textContent = "Logging in...";

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        messageEl.textContent = "❌ " + error.message;
    } else {
        messageEl.style.color = "green";
        messageEl.textContent = "✅ Login successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "index.html"; // change to your dashboard/homepage
        }, 1000);
    }
});
