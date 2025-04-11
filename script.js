let employes = [];

function loadEmployes() {
    fetch('employes.json')
        .then(response => response.json())
        .then(data => {
            employes = data;
            displayEmployes();
        });
}

function displayEmployes(filter = '') {
    const table = document.getElementById('employeTable');
    table.innerHTML = '';
    const filtres = employes.filter(e =>
        e.nom.toLowerCase().includes(filter.toLowerCase()) ||
        e.poste.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtres.length === 0) {
        table.innerHTML = '<tr><td colspan="3">Aucun résultat</td></tr>';
    } else {
        filtres.forEach(emp => {
            table.innerHTML += `
                <tr>
                    <td>${emp.nom}</td>
                    <td>${emp.poste}</td>
                    <td>${emp.telephone}</td>
                </tr>
            `;
        });
    }
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    displayEmployes(e.target.value);
});

document.getElementById('addForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nom = document.getElementById('nom').value.trim();
    const poste = document.getElementById('poste').value.trim();
    const telephone = document.getElementById('telephone').value.trim();

    if (!nom || !poste || !telephone) return;

    employes.push({ nom, poste, telephone });
    displayEmployes();
    document.getElementById('addForm').reset();
    document.getElementById('confirmationMessage').textContent = "Employé ajouté avec succès !";

    setTimeout(() => {
        document.getElementById('confirmationMessage').textContent = "";
    }, 3000);
});

loadEmployes();
