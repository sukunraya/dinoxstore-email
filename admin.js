const API_URL =
  "https://script.google.com/macros/s/AKfycbwaTjFVJhkfMukJXigVH_8N2j1F0_4Y7nEVJbsn4iJQt5KhtS5NNsKnNi7UpPuvIq3C-Q/exec";

const loginButton =
  document.getElementById("loginButton");

const loginMessage =
  document.getElementById("loginMessage");

const loginSection =
  document.getElementById("loginSection");

const adminSection =
  document.getElementById("adminSection");


loginButton.addEventListener(
  "click",
  async function () {

    const username =
      document.getElementById("username").value.trim();

    const password =
      document.getElementById("password").value;


    if (!username || !password) {

      loginMessage.textContent =
        "กรุณากรอก Username และ Password";

      return;
    }


    loginMessage.textContent =
      "กำลังเข้าสู่ระบบ...";

    loginButton.disabled = true;


    try {

      const response =
        await fetch(API_URL, {

          method: "POST",

          body: JSON.stringify({

            action: "login",

            username: username,

            password: password

          })

        });


      const result =
        await response.json();


      if (result.success) {

        sessionStorage.setItem(
          "adminToken",
          result.token
        );


        loginSection.style.display =
          "none";

        adminSection.style.display =
          "block";


        loginMessage.textContent =
          "";

      } else {

        loginMessage.textContent =
          result.message ||
          "Username หรือ Password ไม่ถูกต้อง";

      }


    } catch (error) {

      loginMessage.textContent =
        "ไม่สามารถเชื่อมต่อระบบได้";

    }


    loginButton.disabled = false;

  }
);
