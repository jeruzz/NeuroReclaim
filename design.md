# NeuroReclaim - Mobile App Design

## Visión General

NeuroReclaim es una aplicación móvil de recuperación de adicciones que combina el seguimiento de fitness con métricas clínicas de abstinencia. La aplicación está diseñada para motivar a usuarios en recuperación mediante gamificación, visualización de ahorros económicos y soporte emocional sin gatilladores negativos.

**Orientación:** Retrato (9:16)  
**Paradigma:** Una mano (accesibilidad prioritaria)  
**Estilo:** Siguiendo Apple Human Interface Guidelines (HIG) - diseño limpio, tipografía clara, espaciado generoso

---

## Paleta de Colores

| Token | Color | Uso |
|-------|-------|-----|
| **Primary** | `#10B981` (Verde esmeralda) | Recuperación, progreso positivo, botones principales |
| **Background** | `#FFFFFF` (Blanco) / `#0F172A` (Azul oscuro) | Fondo de pantalla |
| **Surface** | `#F3F4F6` (Gris claro) / `#1E293B` (Gris oscuro) | Tarjetas, superficies elevadas |
| **Foreground** | `#111827` (Negro) / `#F1F5F9` (Blanco) | Texto principal |
| **Muted** | `#6B7280` (Gris) / `#94A3B8` (Gris claro) | Texto secundario |
| **Success** | `#22C55E` (Verde) | Logros, check-ins completados |
| **Warning** | `#F59E0B` (Ámbar) | Alertas, cravings altos |
| **Error** | `#EF4444` (Rojo) | Recaídas, errores |

---

## Lista de Pantallas

### 1. **Onboarding & Autenticación**

#### Pantalla 1.1: Bienvenida (Welcome)
- **Contenido:** Logo, tagline "Tu camino hacia la recuperación", botones "Registrarse" / "Iniciar sesión"
- **Funcionalidad:** Navegación a registro o login
- **Notas:** Diseño limpio, sin distracciones

#### Pantalla 1.2: Registro (Sign Up)
- **Contenido:** Campos para email, contraseña, confirmación de contraseña
- **Funcionalidad:** Validación de inputs, creación de cuenta
- **Notas:** Formulario simple, sin campos innecesarios

#### Pantalla 1.3: Selección de Perfil (Profile Selection)
- **Contenido:** Dos opciones: "Atleta en Recuperación" vs "Usuario Clínico"
- **Funcionalidad:** Seleccionar perfil determina flujo posterior
- **Notas:** Tarjetas grandes, fácil selección con una mano

#### Pantalla 1.4: Configuración Inicial (Initial Setup)
- **Contenido:** Formulario para sustancia, fecha de inicio, costo/unidad, consumo previo
- **Funcionalidad:** Guardar configuración, calcular baseline de ahorro
- **Notas:** Campos progresivos (mostrar solo lo necesario)

---

### 2. **Home & Dashboard**

#### Pantalla 2.1: Home (Pestaña Principal)
- **Contenido:**
  - Tarjeta de streak (días de abstinencia con número grande)
  - Tarjeta de ahorros (dinero ahorrado, cantidad evitada, tiempo recuperado)
  - Botón "Panic Button" (emergencia)
  - Acceso rápido a check-in y workout
- **Funcionalidad:** Resumen diario, acciones principales
- **Notas:** Scroll vertical, información más importante arriba

#### Pantalla 2.2: Métricas de Recuperación (Recovery Metrics)
- **Contenido:**
  - Gráficos: dinero ahorrado (línea), cantidad evitada (barras), tiempo recuperado (indicador circular)
  - Selector de período (7/30/90/365 días)
  - Proyecciones futuras
- **Funcionalidad:** Visualizar progreso a largo plazo
- **Notas:** Gráficos responsive, sin sobrecarga visual

---

### 3. **Workouts & Fitness**

#### Pantalla 3.1: Log de Workout (Workout Entry)
- **Contenido:**
  - Selector de fecha
  - Lista de ejercicios (agregar/editar)
  - Campos: nombre, series, reps, RPE (1-10)
  - Botón "Calcular 1RM"
  - Guardar
- **Funcionalidad:** Registrar sesión de hipertrofia, calcular 1RM estimado
- **Notas:** Interfaz intuitiva para entrada rápida

#### Pantalla 3.2: Historial de Workouts (Workout History)
- **Contenido:**
  - Lista de workouts por fecha (más recientes primero)
  - Tarjetas con resumen: fecha, ejercicios, calorías
  - Swipe para editar/eliminar
- **Funcionalidad:** Ver historial, editar sesiones
- **Notas:** FlatList para rendimiento

---

### 4. **Check-ins & Monitoreo Clínico**

#### Pantalla 4.1: Check-in Diario (Daily Check-in)
- **Contenido:**
  - Escalas 1-10: Ánimo, Craving
  - Campo de notas (opcional)
  - Biometrics (si disponible): HR, pasos
  - Botón "Enviar"
- **Funcionalidad:** Registrar estado emocional, datos clínicos
- **Notas:** Interfaz simple, sin presión

#### Pantalla 4.2: Historial de Check-ins (Check-in History)
- **Contenido:**
  - Gráfico de tendencias (ánimo vs craving)
  - Lista de check-ins con fecha y valores
- **Funcionalidad:** Ver tendencias, identificar patrones
- **Notas:** Visualización clara de progreso

---

### 5. **Recaídas & Crisis**

#### Pantalla 5.1: Panic Button (Emergencia)
- **Contenido:**
  - Botón grande y prominente (rojo)
  - Confirmación: "¿Necesitas ayuda?"
  - Opciones: Contactar terapeuta, recursos de crisis, compartir ubicación
- **Funcionalidad:** Enviar notificaciones, acceso a recursos
- **Notas:** Accesible rápidamente, sin pasos innecesarios

#### Pantalla 5.2: Log de Recaída (Relapse Log)
- **Contenido:**
  - Fecha y hora
  - Tags de triggers (estrés, social, etc.)
  - Contexto (notas)
  - Impacto económico (calculado automáticamente)
  - Opción: reinicio parcial de streak
- **Funcionalidad:** Registrar recaída sin penalizar, mantener historial
- **Notas:** Tono positivo, sin culpa

---

### 6. **Gamificación & Niveles**

#### Pantalla 6.1: Perfil & Niveles (Profile & Levels)
- **Contenido:**
  - Avatar/nombre del usuario
  - Nivel actual (ej: "Impulso Estable")
  - Barra de progreso hacia siguiente nivel
  - Puntos acumulados
  - Badges desbloqueados
  - Estadísticas: streak máximo, workouts totales, check-ins
- **Funcionalidad:** Mostrar progreso, motivar
- **Notas:** Celebrar logros, diseño inspirador

#### Pantalla 6.2: Badges & Logros (Achievements)
- **Contenido:**
  - Grid de badges (desbloqueados + bloqueados)
  - Descripción de cada badge
  - Progreso hacia badges futuros
- **Funcionalidad:** Visualizar logros
- **Notas:** Diseño gamificado, sin exceso

---

### 7. **Configuración & Privacidad**

#### Pantalla 7.1: Consentimiento Informado (Informed Consent)
- **Contenido:**
  - Texto GDPR-compliant
  - Checkbox: "Acepto compartir datos con terapeuta"
  - Checkbox: "Acepto contribuir a investigación anonimizada"
  - Botón "Aceptar"
- **Funcionalidad:** Obtener consentimiento, guardar flags
- **Notas:** Texto claro, no legal-ese

#### Pantalla 7.2: Configuración (Settings)
- **Contenido:**
  - Cambiar sustancia/configuración
  - Notificaciones (on/off)
  - Tema (claro/oscuro)
  - Privacidad (revocar consentimiento)
  - Cerrar sesión
- **Funcionalidad:** Personalizar app
- **Notas:** Opciones esenciales solo

#### Pantalla 7.3: Acceso de Terapeuta (Therapist Access)
- **Contenido:**
  - Código de invitación único (generar)
  - Lista de terapeutas con acceso
  - Botón para revocar acceso
- **Funcionalidad:** Compartir datos con clínico
- **Notas:** Solo para perfil "Usuario Clínico"

---

## Flujos de Usuario Principales

### Flujo 1: Onboarding Completo
1. Bienvenida → Registro → Selección de Perfil → Configuración Inicial → Home

### Flujo 2: Registro de Workout
1. Home → Botón "Workout" → Seleccionar fecha → Agregar ejercicios → Calcular 1RM → Guardar → Home

### Flujo 3: Check-in Diario
1. Home → Botón "Check-in" → Ingresar ánimo/craving → Notas (opcional) → Enviar → Home

### Flujo 4: Activar Panic Button
1. Home → Botón "Panic" → Confirmación → Seleccionar acción → Enviar → Confirmación de envío

### Flujo 5: Registrar Recaída
1. Home → Menú → "Log Recaída" → Ingresar triggers → Contexto → Guardar → Feedback positivo

### Flujo 6: Ver Métricas
1. Home → Tarjeta de ahorros → Pantalla de métricas → Seleccionar período → Ver gráficos

---

## Componentes Reutilizables

| Componente | Uso |
|------------|-----|
| **Card** | Tarjetas de información (ahorros, streak, etc.) |
| **Button** | Acciones primarias y secundarias |
| **ScaleInput** | Escalas 1-10 (ánimo, craving) |
| **Chart** | Gráficos de progreso |
| **Badge** | Logros, tags de triggers |
| **Modal** | Confirmaciones, alertas |
| **TabBar** | Navegación principal |

---

## Consideraciones de Accesibilidad

- **Tamaño de toque:** Mínimo 44x44 pts para botones
- **Contraste:** Ratio mínimo 4.5:1 para texto
- **Tipografía:** Sans-serif clara (SF Pro Display en iOS)
- **Una mano:** Elementos interactivos en mitad inferior de pantalla
- **Retroalimentación:** Haptics en acciones principales

---

## Notas de Implementación

- **Offline-first:** Sincronizar datos cuando haya conexión
- **Privacidad:** Encriptar notas clínicas (E2EE)
- **Performance:** Usar FlatList para listas largas
- **Tema:** Soporte automático para modo claro/oscuro
- **Notificaciones:** Push para check-ins pendientes y alertas de terapeuta
