# Morel Swap - Visión del Producto

## 📋 Problema Actual

Los moteles pequeños enfrentan múltiples desafíos:

- ❌ No tienen página web
- ❌ Gestionan reservas manualmente por WhatsApp
- ❌ No tienen estadísticas ni analítica
- ❌ No usan precios dinámicos
- ❌ No conocen ocupación real
- ❌ No tienen automatización
- ❌ Dependen 100% de Instagram y Facebook

## 🎯 Propuesta de Valor

**"Digitalizamos y automatizamos moteles pequeños sin necesidad de conocimientos técnicos."**

## ✨ Diferenciadores

1. **Especialización en reservas por horas**
2. **Recepcionista digital 24/7**
3. **IA enfocada en optimización de ingresos**
4. **Tours virtuales 360°**
5. **Integración con WhatsApp e Instagram**
6. **Automatización inteligente interna**

---

## 🧠 Rol de OpenClaw (MUY IMPORTANTE)

### ⚠️ OpenClaw NO es el producto principal

OpenClaw debe funcionar como:
- **Agente interno invisible de automatización**

### 🏗️ Arquitectura del Sistema

```
Frontend (React)
     ↓
Backend (API)
     ↓
Base de datos
     ↓
OpenClaw (servicio separado que escucha eventos)
```

### ✅ OpenClaw DEBE:

- ✔️ Reaccionar a eventos del sistema
- ✔️ Automatizar tareas
- ✔️ Ejecutar acciones externas
- ✔️ Analizar datos
- ✔️ Generar decisiones operativas

### ❌ OpenClaw NO DEBE:

- ✖️ Manejar directamente la base de datos principal
- ✖️ Estar en el frontend
- ✖️ Ser el motor principal de reservas

---

## 🤖 Casos de Uso para OpenClaw

### 1. Automatización de Instagram

- Leer DMs
- Detectar intención de reserva
- Consultar disponibilidad
- Responder automáticamente
- Ofrecer upgrades

### 2. Automatización WhatsApp

- Confirmar reservas
- Enviar ubicación
- Enviar fotos 360
- Confirmar pagos

### 3. Publicación Automática

- Detectar baja ocupación
- Generar promociones
- Publicar automáticamente

### 4. Monitoreo de Competencia

- Revisar Instagram de moteles cercanos
- Detectar promociones
- Sugerir ajustes de precio

### 5. Gestión Interna

- Notificar limpieza
- Marcar habitaciones
- Generar reportes automáticos

### 6. Motor Estratégico para el Dueño

- Analizar ingresos
- Detectar patrones
- Predecir fines de semana fuertes

---

## 📦 Módulos del Sistema

1. **Web pública del motel**
   - Presentación del negocio
   - Información de contacto
   - Galería de fotos

2. **Sistema de reservas por hora**
   - Reserva en tiempo real
   - Selección de habitaciones
   - Gestión de horarios

3. **Calendario en tiempo real**
   - Vista de disponibilidad
   - Ocupación actual
   - Reservas futuras

4. **Dashboard analítico**
   - Métricas de ocupación
   - Ingresos
   - Tendencias

5. **Gestión de limpieza**
   - Estado de habitaciones
   - Asignación de tareas
   - Control de tiempos

6. **Chatbot / Recepcionista IA**
   - Atención 24/7
   - Respuestas automáticas
   - Gestión de consultas

7. **Gestión de promociones**
   - Creación de ofertas
   - Publicación automática
   - Estrategias de precios

8. **Sistema de roles**
   - Administrador
   - Recepcionista
   - Personal de limpieza
   - Visualizador

9. **Visualizador 360°**
   - Tours virtuales de habitaciones
   - Experiencia inmersiva
   - Integración con reservas

---

## 🎨 Stack Tecnológico Actual

- **Frontend:** React + TypeScript + Vite
- **Estilos:** Tailwind CSS (inferido por estructura)
- **Estado:** (Por definir - stores/)
- **Autenticación:** Sistema propio (auth features)

## 📝 Próximos Pasos

1. Definir arquitectura completa del backend
2. Diseñar sistema de eventos para OpenClaw
3. Establecer integraciones con WhatsApp e Instagram
4. Implementar motor de precios dinámicos
5. Desarrollar analytics y reportería
6. Crear sistema de tours 360°
