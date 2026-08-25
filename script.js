const form = document.getElementById("emailForm");

const emailInput = document.getElementById("email");

const submitButton = document.getElementById("submitButton");

const message = document.getElementById("message");


form.addEventListener("submit", async function(event) {

  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    showMessage("กรุณากรอก Email", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "กำลังบันทึก...";


  try {

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwaTjFVJhkfMukJXigVH_8N2j1F0_4Y7nEVJbsn4iJQt5KhtS5NNsKnNi7UpPuvIq3C-Q/exec",
      {
        method: "POST",

        body: JSON.stringify({
          email: email
        })
      }
    );


    const result = await response.json();


    if (result.success) {

      showMessage(
        "เพิ่ม Email สำเร็จ ✅",
        "success"
      );

      emailInput.value = "";

    } else {

      showMessage(
        result.message || "เกิดข้อผิดพลาด",
        "error"
      );

    }


  } catch (error) {

    showMessage(
      "ไม่สามารถเชื่อมต่อระบบได้",
      "error"
    );

  }


  submitButton.disabled = false;
  submitButton.textContent = "เพิ่ม Email";

});


function showMessage(text, type) {

  message.textContent = text;

  message.className = type;

}
