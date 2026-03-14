const form = document.querySelector("#partnership-form");
const status = document.querySelector("#form-status");

if (form && status) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    submitButton.disabled = true;
    status.textContent = "전송 중입니다...";
    status.className = "form-status";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      status.textContent = "문의가 접수되었습니다. 빠르게 확인 후 연락드리겠습니다.";
      status.className = "form-status is-success";
    } catch (error) {
      status.textContent = "전송에 실패했습니다. 잠시 후 다시 시도해주세요.";
      status.className = "form-status is-error";
      console.error(error);
    } finally {
      submitButton.disabled = false;
    }
  });
}
