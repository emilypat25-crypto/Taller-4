# 💸 FinanzApp — Control Financiero Personal

<p align="center">
  <img src="screenshot_home.png" alt="FinanzApp Home" width="800"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB_Atlas-Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

---

## 📋 Descripción

**FinanzApp** es una aplicación web de control financiero personal que permite a los usuarios registrar sus ingresos y gastos diarios, categorizar movimientos, gestionar presupuestos y alcanzar metas de ahorro, todo en un solo lugar y de forma intuitiva.

Además, incluye una sección de consumo de la **Rick & Morty API** como demostración de integración con APIs externas públicas.

---

## ✨ Características Principales

- 🔐 **Autenticación completa** — Registro de cuenta, inicio de sesión y recuperación de contraseña
- 📊 **Dashboard interactivo** — Resumen mensual de ingresos, gastos totales, saldo disponible y número de transacciones
- 💰 **Registro de gastos** — Registro rápido con fecha, categoría, valor, descripción y responsable
- 📅 **Filtro por mes/año** — Visualización de movimientos según el periodo seleccionado
- 👥 **Cuota por responsable** — División de gastos entre múltiples responsables
- 🎯 **Módulo de Ahorro** — Gestión de metas de ahorro personalizadas
- 📑 **Presupuesto** — Control y seguimiento del presupuesto mensual
- 🛸 **Rick & Morty API** — Explorador de personajes con búsqueda en tiempo real
- 📱 **Diseño responsivo** — Adaptable a dispositivos móviles y de escritorio

---

## 🖼️ Screenshots de la Interfaz

### 🏠 Página Principal

![Home](screenshot_home.png)

---

### 📝 Registro de Usuario

![Register](screenshot_register.png)

---

### 🔑 Inicio de Sesión

![Login](screenshot_login.png)

---

### 📊 Dashboard — Control de Gastos Diarios

![Dashboard](screenshot_dashboard.png)

---

### 🛸 Rick & Morty API

![APIs](screenshot_apis.png)

---

## 🚀 Instalación

### Prerrequisitos

- Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/finanzapp.git
cd myproyecto
```

### Variables de Entorno

**Frontend** (`.env` en la raíz):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend** (`Backend/.env`):
```env
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/<dbname>
PORT=5000
JWT_SECRET=tu_clave_secreta
```

## ▶️ Ejecución

### Backend (Node.js + Express)

```bash
cd Backend
npm run dev
# Servidor corriendo en: http://localhost:5000
# Confirmación: "MongoDB conectado" + "Servidor en puerto 5000"
```

### Frontend (React + Vite)

```bash
# Desde la raíz del proyecto
npm run dev
# Aplicación disponible en: http://localhost:5173
```

> ⚠️ Asegúrate de iniciar el **Backend primero**, luego el **Frontend**.

### Modo Producción

```bash
npm run build
npm run preview
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 18+ | Framework principal de UI |
| **Bootstrap** | 5.x | Estilos y componentes responsivos |
| **Vite** | 8.x | Bundler y servidor de desarrollo |
| **Node.js** | 18+ | Entorno de ejecución del servidor |
| **Express** | 4.x | Framework del servidor REST API |
| **Mongoose** | 8.x | ODM para conexión con MongoDB |
| **MongoDB Atlas** | Cloud | Base de datos NoSQL en la nube |
| **Nodemon** | 3.x | Reinicio automático del servidor en desarrollo |
| **React Router DOM** | 6.x | Enrutamiento del lado del cliente |
| **Axios** | 1.x | Peticiones HTTP y consumo de APIs |
| **Rick & Morty API** | Pública | API externa de demostración |

---

## 🗂️ Arquitectura y Estructura de Carpetas

```
myproyecto/
│
├── 📁 Frontend (React + Vite)
│   ├── app/                         # Configuración principal de la app
│   ├── dist/                        # Build de producción (generado por Vite)
│   ├── node_modules/                # Dependencias instaladas
│   ├── public/                      # Archivos estáticos públicos
│   │
│   └── src/
│       ├── assets/                  # Recursos estáticos
│       │   ├── hero.png
│       │   ├── react.svg
│       │   └── vite.svg
│       │
│       └── features/                # Módulos por funcionalidad (Feature-based)
│           ├── api/                 # Consumo de APIs externas (Rick & Morty)
│           ├── auth/                # Autenticación (Login, Registro)
│           ├── layout/              # Estructura base (Navbar, Sidebar)
│           ├── views/               # Vistas / Páginas principales
│           │
│           └── shared/              # Componentes y estilos compartidos
│               ├── App.css
│               ├── index.css
│               ├── App.jsx          # Componente raíz
│               ├── AppRouter.jsx    # Configuración de rutas
│               └── main.jsx         # Punto de entrada React
│
│   ├── .env                         # Variables de entorno frontend
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
└── 📁 Backend (Node.js + Express + Mongoose)
    ├── models/                      # Modelos de Mongoose (MongoDB)
    │   └── Users.js                 # Modelo de usuario
    ├── node_modules/                # Dependencias del servidor
    ├── routes/                      # Rutas del API REST
    ├── .env                         # Variables de entorno backend
    ├── index.js                     # Punto de entrada del servidor Express
    ├── package.json
    └── package-lock.json
```

---

## 🌐 Rutas de la Aplicación

| Ruta | Descripción |
|---|---|
| `/` | Página principal (Landing) |
| `/register` | Registro de nuevo usuario |
| `/login` | Inicio de sesión |
| `/dashboard` | Panel de control financiero |
| `/transacciones` | Historial de transacciones |
| `/presupuesto` | Gestión del presupuesto |
| `/ahorro` | Metas de ahorro |
| `/apis` | Explorador Rick & Morty API |

---

## ⚠️ Datos Importantes

- Las rutas `/dashboard`, `/transacciones`, `/presupuesto` y `/ahorro` requieren autenticación activa.
- La base de datos está alojada en **MongoDB Atlas** (nube). Asegúrate de tener tu IP en la lista blanca del cluster.
- El proyecto fue desarrollado con **Vite** como bundler. No uses `create-react-app`.
- La **Rick & Morty API** es completamente pública y no requiere autenticación: `https://rickandmortyapi.com/api`

---

## 👤 Datos del Autor

| Campo | Información |
|---|---|
| **Nombre** | Emily patiño sepulveda|
| **Correo** | emilypat25@gmail.com |
| **GitHub** | emilypat25-crypto |
| **Universidad** | centro de servicios y gestion empresarial |
| **Curso / Materia** | REACT |
| **Año** | 2026 |

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
