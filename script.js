document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");

  materias.forEach((materia) => {
    const checkbox = materia.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        materia.classList.remove("bloqueada");
        const ids = materia.dataset.unlocks?.split(",") || [];

        ids.forEach((id) => {
          const desbloquear = document.getElementById(id.trim());
          if (desbloquear) {
            const inputs = desbloquear.querySelectorAll("input[type='checkbox']");
            desbloquear.classList.remove("bloqueada");
            inputs.forEach(input => input.disabled = false);
          }
        });
      }
    });
  });
});
