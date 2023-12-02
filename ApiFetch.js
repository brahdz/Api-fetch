// Función para obtener los datos de la API
async function fetchData() {
    try {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (storedData && Date.now() - storedData.timestamp < 60000) {
        displayData(storedData.data);
      } else {
        const response = await fetch('https://reqres.in/api/users?delay=3');
        const data = await response.json();
        localStorage.setItem('userData', JSON.stringify({ data, timestamp: Date.now() }));
        displayData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Función para mostrar los datos en la tabla
function displayData(data) {
    const userData = document.querySelector('#userData tbody');
    userData.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de mostrar los nuevos datos
    data.data.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td><img src="${user.avatar}" class="avatar"></td>
      `;
      userData.appendChild(row);
    });
  }
  
  // Llamar a la función para obtener y mostrar los datos al cargar la página
  fetchData();
  