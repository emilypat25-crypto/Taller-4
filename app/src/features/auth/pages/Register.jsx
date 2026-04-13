import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../authApi";

const calcPasswordStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const STRENGTH_LABEL = ["", "Débil", "Regular", "Buena", "Fuerte"];
const STRENGTH_COLOR = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", lastName: "", email: "", password: "", confirm: "", terms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const strength = calcPasswordStrength(form.password);

  const validate = () => {
    const formErrors = {};
    if (!form.name.trim())
      formErrors.name = "El nombre es obligatorio.";
    else if (form.name.trim().length < 2)
      formErrors.name = "Mínimo 2 caracteres.";
    if (!form.lastName.trim())
      formErrors.lastName = "El apellido es obligatorio.";
    if (!form.email.trim())
      formErrors.email = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      formErrors.email = "Correo no válido.";
    if (!form.password)
      formErrors.password = "La contraseña es obligatoria.";
    else if (form.password.length < 8)
      formErrors.password = "Mínimo 8 caracteres.";
    else if (strength < 2)
      formErrors.password = "La contraseña es muy débil.";
    if (!form.confirm)
      formErrors.confirm = "Confirma tu contraseña.";
    else if (form.confirm !== form.password)
      formErrors.confirm = "Las contraseñas no coinciden.";
    if (!form.terms)
      formErrors.terms = "Debes aceptar los términos.";
    return formErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      await registerUser({
        fullName: `${form.name} ${form.lastName}`,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (error) {
      setApiError(error.response?.data?.message || "Error al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="auth-card p-4 p-md-5 mx-3" style={{ width: "100%", maxWidth: "460px" }}>

        {/* Encabezado */}
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <div className="auth-logo-box">
              <i className="bi bi-currency-dollar fs-5 text-white" />
            </div>
            <span className="fw-bold fs-6 text-light">FinanzApp</span>
          </div>
          <h1 className="fw-bold text-light fs-4 mb-1">Crea tu cuenta</h1>
          <p className="text-secondary mb-0 small">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="btn-link-purple">Inicia sesión</Link>
          </p>
        </div>

        {/* Error de API */}
        {apiError && (
          <div className="alert alert-danger py-2 text-center small mb-3">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* Nombre + Apellido */}
          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Emily"
                className={`form-control ${errors.name ? "is-invalid" : form.name.trim().length >= 2 ? "is-valid" : ""}`}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="col-6">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Patiño"
                className={`form-control ${errors.lastName ? "is-invalid" : form.lastName.trim().length >= 2 ? "is-valid" : ""}`}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope" style={{ color: "#7c3aed" }} />
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={`form-control ${errors.email ? "is-invalid" : form.email ? "is-valid" : ""}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-2">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock" style={{ color: "#7c3aed" }} />
              </span>
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              <button
                type="button"
                className="btn-eye"
                onClick={() => setShowPwd((prev) => !prev)}
              >
                <i className={`bi ${showPwd ? "bi-eye-slash" : "bi-eye"}`} />
              </button>
              {errors.password && (
                <div className="invalid-feedback d-block">{errors.password}</div>
              )}
            </div>
          </div>

          {/* Barra de fortaleza */}
          {form.password.length > 0 && (
            <div className="mb-3">
              <div className="d-flex gap-1 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="strength-bar"
                    style={{ background: i <= strength ? STRENGTH_COLOR[strength] : undefined }}
                  />
                ))}
              </div>
              <p className="mb-0 mt-1" style={{ fontSize: "11px", color: STRENGTH_COLOR[strength] }}>
                Contraseña {STRENGTH_LABEL[strength]}
              </p>
            </div>
          )}

          {/* Confirmar contraseña */}
          <div className="mb-3">
            <label className="form-label">Confirmar contraseña</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-shield-lock" style={{ color: "#7c3aed" }} />
              </span>
              <input
                type={showCfm ? "text" : "password"}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                className={`form-control ${errors.confirm
                  ? "is-invalid"
                  : form.confirm && form.confirm === form.password
                    ? "is-valid"
                    : ""
                  }`}
              />
              <button
                type="button"
                className="btn-eye"
                onClick={() => setShowCfm((prev) => !prev)}
              >
                <i className={`bi ${showCfm ? "bi-eye-slash" : "bi-eye"}`} />
              </button>
              {errors.confirm && (
                <div className="invalid-feedback d-block">{errors.confirm}</div>
              )}
            </div>
          </div>

          {/* Términos */}
          <div className="mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={form.terms}
                onChange={handleChange}
                className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
              />
              <label htmlFor="terms" className="form-check-label text-secondary small">
                Acepto los{" "}
                <span className="btn-link-purple" style={{ cursor: "pointer" }}>
                  términos y condiciones
                </span>
              </label>
              {errors.terms && (
                <div className="invalid-feedback d-block">{errors.terms}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2" />Creando cuenta...</>
            ) : (
              <><i className="bi bi-person-plus me-2" />Crear cuenta</>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};
