import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../authApi";

export const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const validate = () => {
        const formErrors = {};
        if (!form.email.trim())
            formErrors.email = "El correo es obligatorio.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            formErrors.email = "Ingresa un correo válido.";
        if (!form.password)
            formErrors.password = "La contraseña es obligatoria.";
        else if (form.password.length < 6)
            formErrors.password = "Mínimo 6 caracteres.";
        return formErrors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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
            const res = await loginUser({
                email: form.email,
                password: form.password,
            });
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (error) {
            setApiError(error.response?.data?.message || "Credenciales incorrectas.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex">

            {/* Panel decorativo izquierdo */}
            <div className="auth-panel d-none d-lg-flex flex-column justify-content-between p-5" style={{ width: "400px" }}>
                <div>
                    <div className="d-flex align-items-center gap-2 mb-5">
                        <div className="auth-logo-box">
                            <i className="bi bi-currency-dollar fs-5 text-white" />
                        </div>
                        <span className="fw-bold fs-6 text-light">FinanzApp</span>
                    </div>
                    <h2 className="fw-bold text-light mb-3 lh-sm">
                        Toma el control<br />de tu dinero.
                    </h2>
                    <p className="text-secondary small">
                        Registra ingresos, gastos y metas de ahorro en un solo lugar.
                    </p>
                </div>

                <div className="d-flex flex-column gap-3">
                    {[
                        "Seguimiento en tiempo real",
                        "Metas de ahorro personalizadas",
                        "Reportes mensuales automáticos",
                    ].map((texto) => (
                        <div key={texto} className="d-flex align-items-center gap-2">
                            <i className="bi bi-check-circle-fill small" style={{ color: "#7c3aed" }} />
                            <span className="text-secondary small">{texto}</span>
                        </div>
                    ))}

                    {/* Botón GitHub */}
                    <a
                        href="https://github.com/emilypat25-crypto/Taller4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center justify-content-center gap-2 mt-3 py-2 px-3 rounded-3 text-decoration-none fw-semibold small"
                        style={{
                            backgroundColor: "#1a1a2e",
                            border: "1px solid #7c3aed",
                            color: "#c4b5fd",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = "#7c3aed";
                            e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = "#1a1a2e";
                            e.currentTarget.style.color = "#c4b5fd";
                        }}
                    >
                        <i className="bi bi-github fs-5" />
                        Ver repositorio en GitHub
                    </a>
                </div>
            </div>

            {/* Formulario */}
            <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4 p-md-5">
                <div className="w-100" style={{ maxWidth: "380px" }}>

                    <div className="mb-4">
                        <h1 className="fw-bold text-light mb-1 fs-4">Iniciar sesión</h1>
                        <p className="text-secondary mb-0 small">
                            ¿No tienes cuenta?{" "}
                            <Link to="/register" className="btn-link-purple">Regístrate gratis</Link>
                        </p>
                    </div>

                    {/* Error de API */}
                    {apiError && (
                        <div className="alert alert-danger py-2 text-center small mb-3">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>

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
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <label className="form-label mb-0">Contraseña</label>
                                <Link to="/change-password" className="btn-link-purple small">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <div className="input-group mt-1">
                                <span className="input-group-text">
                                    <i className="bi bi-lock" style={{ color: "#7c3aed" }} />
                                </span>
                                <input
                                    type={showPwd ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`form-control ${errors.password ? "is-invalid" : form.password ? "is-valid" : ""}`}
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

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fw-semibold"
                            disabled={loading}
                        >
                            {loading ? (
                                <><span className="spinner-border spinner-border-sm me-2" />Verificando...</>
                            ) : (
                                "Entrar a mi cuenta"
                            )}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};
