import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const ChangePassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ current: "", newPwd: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState({ current: false, newPwd: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pwdStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const strengthLabel = ["", "Débil", "Regular", "Buena", "Fuerte"];
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];
  const strength = pwdStrength(form.newPwd);

  const requirements = [
    { label: "8+ chars", met: form.newPwd.length >= 8 },
    { label: "Mayúscula", met: /[A-Z]/.test(form.newPwd) },
    { label: "Número", met: /[0-9]/.test(form.newPwd) },
    { label: "Símbolo", met: /[^A-Za-z0-9]/.test(form.newPwd) },
  ];

  const validate = () => {
    const e = {};
    if (!form.current)
      e.current = "Ingresa tu contraseña actual.";
    if (!form.newPwd)
      e.newPwd = "La nueva contraseña es obligatoria.";
    else if (form.newPwd.length < 8)
      e.newPwd = "Mínimo 8 caracteres.";
    else if (strength < 2)
      e.newPwd = "Elige una contraseña más segura.";
    else if (form.newPwd === form.current)
      e.newPwd = "No puede ser igual a la contraseña actual.";
    if (!form.confirm)
      e.confirm = "Confirma tu nueva contraseña.";
    else if (form.confirm !== form.newPwd)
      e.confirm = "Las contraseñas no coinciden.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const toggleShow = (field) => setShow((p) => ({ ...p, [field]: !p[field] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    }, 1300);
  };

  /* Pantalla de éxito */
  if (success) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="auth-card p-5 text-center mx-3" style={{ maxWidth: "380px", width: "100%" }}>
          <div className="success-circle mb-4">
            <i className="bi bi-check-lg text-white fs-3" />
          </div>
          <h2 className="fw-bold text-light fs-5">¡Contraseña actualizada!</h2>
          <p className="text-secondary small mt-2">Redirigiendo al panel...</p>
          <div className="spinner-border spinner-border-sm mt-2" style={{ color: "#7c3aed" }} />
        </div>
      </div>
    );
  }

  const fields = [
    { name: "current", label: "Contraseña actual", placeholder: "Tu contraseña actual", icon: "bi-lock-fill" },
    { name: "newPwd", label: "Nueva contraseña", placeholder: "Mínimo 8 caracteres", icon: "bi-key-fill" },
    { name: "confirm", label: "Confirmar nueva contraseña", placeholder: "Repite la nueva contraseña", icon: "bi-shield-lock-fill" },
  ];

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="auth-card p-4 p-md-5 mx-3" style={{ width: "100%", maxWidth: "440px" }}>

        {/* Encabezado */}
        <Link to="/dashboard" className="btn-link-purple small d-inline-flex align-items-center gap-1 mb-4">
          <i className="bi bi-arrow-left" /> Volver al panel
        </Link>

        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="p-2 rounded-3 d-flex align-items-center justify-content-center"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)", width: "48px", height: "48px" }}>
            <i className="bi bi-shield-lock-fill fs-5" style={{ color: "#a78bfa" }} />
          </div>
          <div>
            <h1 className="fw-bold text-light fs-5 mb-0">Cambiar contraseña</h1>
            <p className="text-secondary mb-0 small">Actualiza tu contraseña de acceso</p>
          </div>
        </div>

        <div className="auth-info-banner d-flex align-items-center gap-2 p-3 mb-4">
          <i className="bi bi-info-circle" style={{ color: "#818cf8" }} />
          <span>Por seguridad, no compartas tu contraseña con nadie.</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {fields.map(({ name, label, placeholder, icon }) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className={`bi ${icon}`} style={{ color: "#7c3aed" }} />
                </span>
                <input
                  type={show[name] ? "text" : "password"}
                  name={name} value={form[name]}
                  onChange={handleChange} placeholder={placeholder}
                  className={`form-control ${errors[name]
                    ? "is-invalid"
                    : name === "confirm" && form[name] && form[name] === form.newPwd
                      ? "is-valid"
                      : form[name] && form[name].length >= 8 && !errors[name]
                        ? "is-valid"
                        : ""
                    }`}
                />
                <button type="button" className="btn-eye" onClick={() => toggleShow(name)}>
                  <i className={`bi ${show[name] ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
                {errors[name] && <div className="invalid-feedback d-block">{errors[name]}</div>}
              </div>

              {/* Barra + chips solo en nueva contraseña */}
              {name === "newPwd" && form.newPwd.length > 0 && (
                <div className="mt-2">
                  <div className="d-flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{ background: i <= strength ? strengthColor[strength] : undefined }}
                      />
                    ))}
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <span style={{ fontSize: "11px", color: strengthColor[strength] }}>
                      Contraseña {strengthLabel[strength]}
                    </span>
                    <span className="text-secondary" style={{ fontSize: "11px" }}>
                      {form.newPwd.length}/8 mín.
                    </span>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {requirements.map((r) => (
                      <span key={r.label} className={`strength-chip ${r.met ? "met" : "unmet"}`}>
                        {r.met ? "✓" : "○"} {r.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="d-flex gap-2 mt-4">
            <Link to="/dashboard" className="btn btn-outline-cancel flex-fill py-2 fw-semibold">
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary flex-fill py-2 fw-semibold" disabled={loading}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Guardando...</>
                : <><i className="bi bi-check-lg me-2" />Guardar cambios</>
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
