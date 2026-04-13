import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const routeTitles = {
  "/dashboard": { title: "Resumen", subtitle: "Vista general de tus finanzas", icon: "bi-grid-1x2-fill" },
  "/transacciones": { title: "Transacciones", subtitle: "Historial de movimientos", icon: "bi-arrow-left-right" },
  "/presupuesto": { title: "Presupuesto", subtitle: "Control de límites por categoría", icon: "bi-pie-chart-fill" },
  "/ahorro": { title: "Ahorro", subtitle: "Metas y progreso", icon: "bi-piggy-bank-fill" },
  "/configuracion": { title: "Configuración", subtitle: "Ajustes de la cuenta", icon: "bi-gear-fill" },
  "/cuenta": { title: "Mi Cuenta", subtitle: "Información personal", icon: "bi-person-fill" },
};

export const Header = () => {
  const location = useLocation();
  const current = routeTitles[location.pathname] || { title: "Panel", subtitle: "", icon: "bi-house-fill" };
  const [showNotif, setShowNotif] = useState(false);

  const today = new Date().toLocaleDateString("es-CO", {
    weekday: "long", day: "numeric", month: "long",
  });
  const todayLabel = today.charAt(0).toUpperCase() + today.slice(1);

  const notifications = [
    { icon: "bi-arrow-down-circle-fill", color: "#22c55e", bg: "rgba(34,197,94,0.12)", text: "Ingreso registrado:", time: "Hace 5 min" },
    { icon: "bi-exclamation-triangle-fill", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", text: "Presupuesto de ocio al 80%", time: "Hace 1h" },
    { icon: "bi-piggy-bank-fill", color: "#7c3aed", bg: "rgba(124,58,237,0.12)", text: "Meta de ahorro actualizada", time: "Ayer" },
  ]

  return (
    <header
      className="d-flex align-items-center justify-content-between px-4 py-3"
      style={{
        borderBottom: "1px solid rgba(124,58,237,0.12)",
        background: "rgba(15,12,26,0.7)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        minHeight: "68px",
      }}
    >
      {/* Título de la página */}
      <div className="d-flex align-items-center gap-3">
        <div
          className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
          style={{ width: 38, height: 38, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          <i className={`bi ${current.icon}`} style={{ color: "#a78bfa", fontSize: "15px" }} />
        </div>
        <div>
          <h1 className="mb-0 fw-bold text-light" style={{ fontSize: "18px", letterSpacing: "-0.2px" }}>
            {current.title}
          </h1>
          {current.subtitle && (
            <p className="mb-0" style={{ fontSize: "12px", color: "#64748b" }}>{current.subtitle}</p>
          )}
        </div>
      </div>

      {/* Lado derecho */}
      <div className="d-flex align-items-center gap-2">

        {/* Fecha — oculta en móvil */}
        <div
          className="d-none d-md-flex align-items-center gap-2 px-3 py-2 rounded-3 me-1"
          style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.12)", fontSize: "12px", color: "#94a3b8" }}
        >
          <i className="bi bi-calendar3" style={{ color: "#7c3aed" }} />
          {todayLabel}
        </div>

        {/* Búsqueda */}
        <button
          className="d-flex align-items-center justify-content-center rounded-3"
          style={iconBtnStyle}
          title="Buscar"
        >
          <i className="bi bi-search" style={{ fontSize: "14px", color: "#94a3b8" }} />
        </button>

        {/* Notificaciones */}
        <div className="position-relative">
          <button
            className="d-flex align-items-center justify-content-center rounded-3"
            style={iconBtnStyle}
            onClick={() => setShowNotif((p) => !p)}
            title="Notificaciones"
          >
            <i className="bi bi-bell" style={{ fontSize: "14px", color: "#94a3b8" }} />
            <span
              className="position-absolute rounded-circle"
              style={{ top: 7, right: 7, width: 7, height: 7, background: "#7c3aed", border: "1.5px solid #0f0c1a" }}
            />
          </button>

          {/* Dropdown notificaciones */}
          {showNotif && (
            <div
              className="position-absolute end-0 mt-2 rounded-4 py-2"
              style={{
                width: 300,
                background: "#1a1625",
                border: "1px solid rgba(124,58,237,0.2)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                zIndex: 200,
              }}
            >
              <div className="d-flex justify-content-between align-items-center px-3 pb-2"
                style={{ borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
                <span className="fw-semibold text-light" style={{ fontSize: "13px" }}>Notificaciones</span>
                <span className="rounded-pill px-2 py-1" style={{ fontSize: "10px", background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}>
                  {notifications.length} nuevas
                </span>
              </div>
              {notifications.map((n, i) => (
                <div key={i} className="d-flex align-items-start gap-3 px-3 py-2"
                  style={{ borderBottom: i < notifications.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div className="rounded-3 flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{ width: 32, height: 32, background: n.bg, marginTop: 2 }}>
                    <i className={`bi ${n.icon}`} style={{ color: n.color, fontSize: "13px" }} />
                  </div>
                  <div>
                    <p className="mb-0 text-light" style={{ fontSize: "12px", lineHeight: 1.4 }}>{n.text}</p>
                    <span style={{ fontSize: "11px", color: "#475569" }}>{n.time}</span>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <span style={{ fontSize: "12px", color: "#7c3aed", cursor: "pointer" }}>Ver todas</span>
              </div>
            </div>
          )}
        </div>

        {/* Avatar / perfil */}
        <Link
          to="/cuenta"
          className="d-flex align-items-center gap-2 rounded-3 px-2 py-1 text-decoration-none ms-1"
          style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(124,58,237,0.08)"}
        >
          <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{ width: 28, height: 28, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", fontSize: "12px", color: "#fff", flexShrink: 0 }}>
            U
          </div>
          <span className="d-none d-md-inline text-light" style={{ fontSize: "13px", fontWeight: 500 }}>Mi cuenta</span>
          <i className="bi bi-chevron-down d-none d-md-inline" style={{ fontSize: "10px", color: "#64748b" }} />
        </Link>

      </div>
    </header>
  );
};

const iconBtnStyle = {
  width: 36,
  height: 36,
  border: "1px solid rgba(124,58,237,0.18)",
  background: "rgba(124,58,237,0.07)",
  cursor: "pointer",
  position: "relative",
  transition: "all 0.2s",
};
