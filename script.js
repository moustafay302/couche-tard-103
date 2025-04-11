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
    employes
        .filter(e => e.nom.toLowerCase().includes(filter.toLowerCase()))
        .forEach(emp => {
            table.innerHTML += `
                <tr>
                    <td>${emp.nom}</td>
                    <td>${emp.poste}</td>
                    <td>${emp.telephone}</td>
                </tr>
            `;
        });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    displayEmployes(e.target.value);
});

document.getElementById('addForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nom = document.getElementById('nom').value;
    const poste = document.getElementById('poste').value;
    const telephone = document.getElementById('telephone').value;
    employes.push({ nom, poste, telephone });
    displayEmployes();
    this.reset();
});

loadEmployes();
