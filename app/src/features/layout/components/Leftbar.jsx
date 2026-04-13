import { Link, useLocation, useNavigate } from "react-router-dom";

export const Leftbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        navigate("/");
    };

    const navItems = [
        { to: "/dashboard", icon: "bi-grid-1x2", label: "Resumen" },
        { to: "/transacciones", icon: "bi-arrow-left-right", label: "Transacciones" },
        { to: "/presupuesto", icon: "bi-wallet2", label: "Presupuesto" },
        { to: "/ahorro", icon: "bi-piggy-bank", label: "Ahorro" },
    ];

    const bottomItems = [
        { to: "/configuracion", icon: "bi-sliders", label: "Configuración" },
        { to: "/cuenta", icon: "bi-person-circle", label: "Mi Cuenta" },
    ];

    return (
        <aside style={styles.sidebar}>
            {/* Logo */}
            <div style={styles.logoArea}>
                <div style={styles.logoIcon}>
                    <i className="bi bi-currency-dollar" style={{ fontSize: "20px", color: "#a78bfa" }} />
                </div>
                <div>
                    <p style={styles.logoTitle}>FinanzApp</p>
                    <p style={styles.logoSub}>Control de gastos</p>
                </div>
            </div>

            <div style={styles.divider} />

            {/* Nav principal */}
            <nav style={{ flex: 1 }}>
                <p style={styles.sectionLabel}>MENÚ</p>
                <ul style={styles.navList}>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                style={{
                                    ...styles.navLink,
                                    ...(isActive(item.to) ? styles.navLinkActive : {}),
                                }}
                            >
                                {isActive(item.to) && <span style={styles.activeDot} />}
                                <i className={`bi ${item.icon}`} style={styles.navIcon} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div style={{ ...styles.divider, margin: "16px 0" }} />

                <p style={styles.sectionLabel}>CONFIGURACIÓN</p>
                <ul style={styles.navList}>
                    {bottomItems.map((item) => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                style={{
                                    ...styles.navLink,
                                    ...(isActive(item.to) ? styles.navLinkActive : {}),
                                }}
                            >
                                {isActive(item.to) && <span style={styles.activeDot} />}
                                <i className={`bi ${item.icon}`} style={styles.navIcon} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer sidebar */}
            <div style={styles.sidebarFooter}>
                <div style={styles.userBadge}>
                    <div style={styles.avatar}>EP</div>
                    <div>
                        <p style={styles.userName}>Emily.22</p>
                        <p style={styles.userEmail}>Emipat@email.com</p>
                    </div>
                </div>

                {/* Botón cerrar sesión */}
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: "12px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid rgba(220, 53, 69, 0.3)",
                        background: "transparent",
                        color: "#f87171",
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(220, 53, 69, 0.12)";
                        e.currentTarget.style.borderColor = "rgba(220, 53, 69, 0.6)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "rgba(220, 53, 69, 0.3)";
                    }}
                >
                    <i className="bi bi-box-arrow-left" style={{ fontSize: "15px" }} />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
};

const styles = {
    sidebar: {
        width: "240px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f0c1a 0%, #12102b 100%)",
        borderRight: "1px solid rgba(139, 92, 246, 0.15)",
        display: "flex",
        flexDirection: "column",
        padding: "0",
        flexShrink: 0,
    },
    logoArea: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "24px 20px 20px",
    },
    logoIcon: {
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    logoTitle: {
        margin: 0,
        fontSize: "15px",
        fontWeight: "700",
        color: "#f1f5f9",
        fontFamily: "'Segoe UI', sans-serif",
        letterSpacing: "0.5px",
    },
    logoSub: {
        margin: 0,
        fontSize: "11px",
        color: "#64748b",
    },
    divider: {
        borderTop: "1px solid rgba(139, 92, 246, 0.12)",
        margin: "0 20px",
    },
    sectionLabel: {
        margin: "16px 20px 6px",
        fontSize: "10px",
        fontWeight: "600",
        color: "#475569",
        letterSpacing: "1.2px",
    },
    navList: {
        listStyle: "none",
        padding: "0 12px",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "2px",
    },
    navLink: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "9px 12px",
        borderRadius: "8px",
        color: "#94a3b8",
        fontSize: "14px",
        fontWeight: "400",
        textDecoration: "none",
        transition: "all 0.2s ease",
        position: "relative",
    },
    navLinkActive: {
        background: "linear-gradient(90deg, rgba(124, 58, 237, 0.2), rgba(79, 70, 229, 0.1))",
        color: "#a78bfa",
        fontWeight: "500",
        borderLeft: "2px solid #7c3aed",
        paddingLeft: "10px",
    },
    activeDot: {
        display: "none",
    },
    navIcon: {
        fontSize: "16px",
        width: "18px",
        textAlign: "center",
    },
    sidebarFooter: {
        padding: "16px 20px",
        borderTop: "1px solid rgba(139, 92, 246, 0.12)",
    },
    userBadge: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    avatar: {
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "600",
        color: "white",
        flexShrink: 0,
    },
    userName: {
        margin: 0,
        fontSize: "13px",
        fontWeight: "500",
        color: "#e2e8f0",
    },
    userEmail: {
        margin: 0,
        fontSize: "11px",
        color: "#64748b",
    },
};
