import { Link } from "react-router-dom";

const features = [
    {
        icon: "bi-bar-chart-line-fill",
        color: "#7c3aed",
        bg: "rgba(124,58,237,0.12)",
        title: "Seguimiento",
        desc: "Visualiza todos tus ingresos y gastos en tiempo real con gráficas claras.",
    },
    {
        icon: "bi-credit-card-2-front-fill",
        color: "#06b6d4",
        bg: "rgba(6,182,212,0.12)",
        title: "Control total",
        desc: "Categoriza y administra cada movimiento de tu dinero fácilmente.",
    },
    {
        icon: "bi-piggy-bank-fill",
        color: "#22c55e",
        bg: "rgba(34,197,94,0.12)",
        title: "Metas de ahorro",
        desc: "Define objetivos y haz seguimiento de tu progreso mes a mes.",
    },
];

const stats = [
    { value: "100%", label: "Gratis" },
    { value: "3min", label: "Para empezar" },
    { value: "0€", label: "Sin tarjeta" },
];

export const Landing = () => {
    return (
        <div
            className="min-vh-100 d-flex flex-column"
            style={{
                background: "linear-gradient(135deg, #0f0c1a 0%, #12102b 100%)",
            }}
        >
            {/* ── NAVBAR ── */}
            <nav
                className="navbar px-4 px-md-5 py-3"
                style={{
                    borderBottom: "1px solid rgba(124,58,237,0.15)",
                    backdropFilter: "blur(10px)",
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "rgba(15,12,26,0.85)",
                }}
            >
                <div className="d-flex align-items-center gap-2">
                    <div className="auth-logo-box">
                        <i className="bi bi-currency-dollar fs-5 text-white" />
                    </div>
                    <span
                        className="fw-bold text-light"
                        style={{ fontSize: "15px", letterSpacing: "0.3px" }}
                    >
                        FinanzApp
                    </span>
                </div>

                {/* 🔥 BOTONES NAVBAR */}
                <div className="d-flex align-items-center gap-3">

                    {/* NUEVO BOTÓN APIs */}
                    <Link
                        to="/apis"
                        className="text-secondary small d-none d-md-inline"
                        style={{ textDecoration: "none", transition: "color .2s" }}
                        onMouseEnter={e => e.target.style.color = "#a78bfa"}
                        onMouseLeave={e => e.target.style.color = ""}
                    >
                        APIs
                    </Link>

                    {/* Crear cuenta */}
                    <Link
                        to="/register"
                        className="text-secondary small d-none d-md-inline"
                        style={{ textDecoration: "none", transition: "color .2s" }}
                        onMouseEnter={e => e.target.style.color = "#a78bfa"}
                        onMouseLeave={e => e.target.style.color = ""}
                    >
                        Crear cuenta
                    </Link>

                    {/* Login */}
                    <Link
                        to="/login"
                        className="btn btn-primary px-4 py-2 fw-semibold"
                        style={{ fontSize: "14px" }}
                    >
                        Iniciar sesión
                    </Link>
                </div>
            </nav>

            {/* ── HERO ── */}
            <div className="container flex-grow-1 d-flex align-items-center py-5">
                <div className="row w-100 align-items-center g-5">

                    {/* Texto */}
                    <div className="col-lg-6">
                        <div
                            className="d-inline-flex align-items-center gap-2 mb-4 px-3 py-2 rounded-pill"
                            style={{
                                background: "rgba(124,58,237,0.12)",
                                border: "1px solid rgba(124,58,237,0.25)",
                                fontSize: "12px",
                                color: "#a78bfa",
                            }}
                        >
                            <span
                                className="rounded-circle d-inline-block"
                                style={{ width: 7, height: 7, background: "#7c3aed" }}
                            />
                            Control financiero personal
                        </div>

                        <h1 className="fw-bold text-light lh-sm mb-3"
                            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
                            Toma el control <br />
                            <span
                                style={{
                                    background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                de tu dinero.
                            </span>
                        </h1>

                        <p style={{ color: "#94a3b8", maxWidth: "440px" }}>
                            Registra ingresos, categoriza gastos y alcanza tus metas de ahorro
                            — todo en un solo lugar, sin complicaciones.
                        </p>

                        <div className="d-flex gap-3 mb-5">
                            <Link to="/register" className="btn btn-primary px-4 py-2 fw-semibold">
                                Empezar gratis
                            </Link>

                            <Link to="/login" className="btn px-4 py-2 fw-semibold"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#e2e8f0",
                                }}>
                                Iniciar sesión
                            </Link>
                        </div>

                        <div className="d-flex gap-4">
                            {stats.map(({ value, label }) => (
                                <div key={label}>
                                    <div className="fw-bold text-light">{value}</div>
                                    <div style={{ color: "#64748b" }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Panel derecho */}
                    <div className="col-lg-6 d-flex justify-content-center">
                        <div className="p-4 rounded-4 text-center"
                            style={{
                                maxWidth: "380px",
                                background: "rgba(26,22,37,0.6)",
                                border: "1px solid rgba(124,58,237,0.2)",
                            }}>
                            <i className="bi bi-graph-up-arrow"
                                style={{ fontSize: "30px", color: "#a78bfa" }} />

                            <h4 className="text-light mt-3">Controla tus finanzas</h4>

                            <p style={{ color: "#64748b" }}>
                                Visualiza ingresos, gastos y ahorros de forma clara.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* FOOTER */}
            <div className="text-center py-4"
                style={{ borderTop: "1px solid rgba(124,58,237,0.1)" }}>
                © 2026 FinanzApp
            </div>
        </div>
    );
};