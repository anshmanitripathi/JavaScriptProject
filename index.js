



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];


    const savedData = JSON.parse(localStorage.getItem('users') || '[]');
    savedData.forEach(user => addRowToTable(user));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;
        
        if (!validateAge(dob)) {
            alert('You must be between 18 and 55 years old.');
            return;
        }
        
        const user = { name, email, password, dob, terms };
        
    
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        addRowToTable(user);
        form.reset();
    });

    function addRowToTable(user) {
        const row = userTable.insertRow();
        row.insertCell().textContent = user.name;
        row.insertCell().textContent = user.email;
        row.insertCell().textContent = user.password;
        row.insertCell().textContent = user.dob;
        row.insertCell().textContent = user.terms ? 'Yes' : 'No';
    }

    function validateAge(dateOfBirth) {
        const today = new Date();
        const dob = new Date(dateOfBirth);
        const age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age >= 18 && age <= 55;
    }
});
