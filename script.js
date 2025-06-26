const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgpc98lJvsD9C73_K3X04OXw66tyTebtbKV8PUWS56KBl-9SpMQ94PcPoZ977pYKTD_3seaal2EOM2lnaWpo39biexfSoiEaenHszWuTBYrjWiw6TOmkZzIBKtJQURlGztwR4-Zcq2zRbnZGBtxxWcn_8lINJ2CQJoEnzZdLSmAgWPvn7tCr2cGRgrCTt-qHbBZVJAYtepor1iMknocFnSUy34vKL5iI6Xu7XebukzTgPm8EVMOPPwfBGHOHZ-TQZ0B8pwJT7-1U50UKP0L4TcPi8aq3g&lib=MrUgg17jdAZNbGe7L5clEGz5758Vn_UuI"; // Replace with your live Apps Script API URL

let tools = [];

window.onload = function () {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      tools = data;
      renderTools(tools);
    })
    .catch(error => {
      console.error("Failed to load tools:", error);
      document.getElementById("toolList").innerHTML = "<p>Failed to load tools.</p>";
    });

  document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = tools.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      tool.type.toLowerCase().includes(query)
    );
    renderTools(filtered);
  });
};


function renderTools(tools) {
  const container = document.getElementById("toolList");
  container.innerHTML = "";
  tools.forEach(tool => {
    container.innerHTML += `
      <div class="tool-card">
        <h2>${tool.name}</h2>
        <p><strong>Category:</strong> ${tool.category}</p>
        <p><strong>Type:</strong> ${tool.type}</p>
        <p>${tool.description}</p>
        <a href="${tool.link}" target="_blank">Visit Tool →</a>
      </div>
    `;
  });
}
