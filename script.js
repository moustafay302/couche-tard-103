if (!sessionStorage.getItem('loggedIn')) {
    window.location.href = 'login.html';
}
document.addEventListener('DOMContentLoaded', function () {
    fetch('employes.json')
        .then(response => response.json())
        .then(data => {
            displayEmployees(data);
        });

    document.getElementById('addForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const nom = document.getElementById('nom').value;
        const tel = document.getElementById('telephone').value;
        const row = document.createElement('tr');
        row.innerHTML = `<td>${nom}</td><td>${tel}</td>`;
        document.querySelector('#annuaireTable tbody').appendChild(row);
        document.getElementById('nom').value = '';
        document.getElementById('telephone').value = '';
    });

    document.getElementById('searchInput').addEventListener('input', function () {
        const search = this.value.toLowerCase();
        const rows = document.querySelectorAll('#annuaireTable tbody tr');
        rows.forEach(row => {
            const name = row.children[0].textContent.toLowerCase();
            row.style.display = name.includes(search) ? '' : 'none';
        });
    });

    document.getElementById('uploadForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert("Ce site ne peut pas stocker le fichier, mais l'option est prête pour usage futur.");
        document.getElementById('documentInput').value = "";
    });
});
function displayEmployees(data) {
    const tbody = document.querySelector('#annuaireTable tbody');
    data.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${emp.nom}</td><td>${emp.telephone}</td>`;
        tbody.appendChild(row);
    });
}
