const API_URL =
  "https://script.google.com/macros/s/AKfycbwaTjFVJhkfMukJXigVH_8N2j1F0_4Y7nEVJbsn4iJQt5KhtS5NNsKnNi7UpPuvIq3C-Q/exec";


const emailList =
  document.getElementById("emailList");

const emailCount =
  document.getElementById("emailCount");

const search =
  document.getElementById("search");


let emails = [];


async function loadEmails() {

  try {

    emailList.textContent =
      "กำลังโหลด...";


    const response =
      await fetch(API_URL);


    const result =
      await response.json();


    if (!result.success) {

      throw new Error(
        result.message
      );

    }


    emails = result.data || [];


    emailCount.textContent =
      emails.length;


    renderEmails();


  } catch (error) {

    emailList.innerHTML =
      "<p>ไม่สามารถโหลดข้อมูลได้</p>";

  }

}


function renderEmails() {

  const keyword =
    search.value
      .trim()
      .toLowerCase();


  const filtered =
    emails.filter(function(item) {

      return item.email
        .toLowerCase()
        .includes(keyword);

    });


  if (filtered.length === 0) {

    emailList.innerHTML =
      "<p>ไม่พบ Email</p>";

    return;

  }


  emailList.innerHTML =
    filtered.map(function(item) {

      const date =
        new Date(item.date)
          .toLocaleString("th-TH");


      return `
        <div class="email-item">

          <strong>
            ${item.email}
          </strong>

          <small>
            ${date}
          </small>

        </div>
      `;

    }).join("");

}


search.addEventListener(
  "input",
  renderEmails
);


loadEmails();
