const results = [
    { name: 'Darshan', score: 95 },
    { name: 'Bhuri', score: 85 },
    { name: 'Charlie', score: 92 },
    { name: 'Prit', score: 22 },
    { name: 'Tushar', score: 99 }
  ];

  function toggleForm(formType) {
    document.getElementById('login-form').style.display =
      formType === 'signup' ? 'none' : 'block';
    document.getElementById('signup-form').style.display =
      formType === 'signup' ? 'block' : 'none';
  }

  function signup() {
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (!email || !password) {
      document.getElementById('signup-error').textContent =
        'Please fill all fields';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
      document.getElementById('signup-error').textContent =
        'User already exists';
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign-up successful! You can now log in.');
    toggleForm('login');
  }

  function login() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
      document.getElementById('login-error').textContent =
        'Please fill all fields';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      showResultPage();
    } else {
      document.getElementById('login-error').textContent =
        'Invalid credentials';
    }
  }

  function showResultPage() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<ul>';
    results.forEach(result => {
      resultsDiv.innerHTML += `<li><span>${result.name}</span>: ${result.score}</li>`;
    });
    resultsDiv.innerHTML += '</ul>';
  }

  function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
  }

  window.onload = function() {
    if (localStorage.getItem('currentUser')) {
      showResultPage();
    } else {
      document.getElementById('login-form').style.display = 'block';
    }
  };