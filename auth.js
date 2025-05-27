const SUPABASE_URL = 'https://jxniwfvhiqtswurmzdat.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4bml3ZnZoaXF0c3d1cm16ZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMTc3NDUsImV4cCI6MjA2Mzc5Mzc0NX0.Kl5i2lYp27uGaQiEdgp5wjQ58Dvue-b0VXECe2yZyrw';

const {createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

//HANDLE SIGN-UP AND LOG-IN IN JAVASCRIPT

// Sign Up
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const { user, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert('Check your email to confirm your account.');
  }
});

// Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert('Login successful!');
    window.location.href = "main.html";
  }
});

//CHECK IF USER IS LOGGED-IN
supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    console.log('User is logged in:', session.user);
  } else {
    console.log('No user logged in');
  }
});

//LOGOUT FUNCTION
async function logout() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    alert('Error logging out:', error.message);
  } else {
    alert('Logged out successfully');
  }
}
