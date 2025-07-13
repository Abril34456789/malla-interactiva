document.addEventListener("DOMContentLoaded", function () {
  const materias = document.querySelectorAll(".materia");

  // Cargar aprobadas desde localStorage
  const aprobadas = new Set(JSON.parse(localStorage.getItem("materiasAprobadas") || "[]"));

  // Marcar materias aprobadas desde storage
  materias.forEach(materia => {
    const id = materia.id;
    const input = materia.querySelector("input");

    if (aprobadas.has(id)) {
      input.checked = true;
    }
  });

  // Verifica si todas las correlativas de una materia están aprobadas
  function desbloquearMaterias() {
    const aprobadasAhora = new Set(
      Array.from(materias)
        .filter(m => m.querySelector("input").checked)
        .map(m => m.id)
    );

    materias.forEach(materia => {
      const input = materia.querySelector("input");

      // Si ya está desbloqueada, nada que hacer
      if (!input.disabled) return;

      // Buscar materias que desbloquean esta
      const correlativas = Array.from(materias).filter(m => {
        const unlocks = m.dataset.unlocks?.split(",") || [];
        return unlocks.includes(materia.id);
      });

      const todasCorrelativasAprobadas = correlativas.every(m => aprobadasAhora.has(m.id));

      if (todasCorrelativasAprobadas) {
        materia.classList.remove("bloqueada");
        input.disabled = false;
      }
    });
  }

  // Guardar en localStorage
  function guardarEstado() {
    const nuevasAprobadas = Array.from(materias)
      .filter(m => m.querySelector("input").checked)
      .map(m => m.id);
    localStorage.setItem("materiasAprobadas", JSON.stringify(nuevasAprobadas));
  }

  // Asignar evento a todos los checkboxes
  materias.forEach(materia => {
    const input = materia.querySelector("input");
    input.addEventListener("change", () => {
      guardarEstado();
      desbloquearMaterias();
    });
  });

  desbloquearMaterias();
});
