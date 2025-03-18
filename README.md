# 📌 To-Do List App

🚀 **To-Do List App** es una aplicación desarrollada con **Ionic Angular** para gestionar tareas de manera eficiente. Permite agregar, editar y eliminar tareas con una interfaz intuitiva.

## 📂 Estructura del Proyecto

```
📦 src/
 ┣ 📂 app/
 ┃ ┣ 📂 core/         # Lógica central del proyecto
 ┃ ┃ ┣ 📂 models/    # Modelos de datos
 ┃ ┃ ┣ 📂 services/  # Servicios de negocio
 ┃ ┣ 📂 shared/       # Componentes reutilizables
 ┃ ┃ ┣ 📂 components/
 ┃ ┃ ┃ ┣ 📂 task-card/  # Componente para mostrar tareas
 ┃ ┃ ┃ ┣ 📂 task-form/  # Componente para agregar/editar tareas
 ┃ ┣ 📂 tasks/         # Módulo de tareas
 ┣ 📂 assets/          # Archivos estáticos
 ┣ 📂 environments/    # Configuraciones por entorno
 ┣ global.scss         # Estilos globales
 ┣ index.html          # Archivo principal HTML
 ┣ main.ts             # Punto de entrada de la app
 ┣ polyfills.ts        # Compatibilidad con navegadores
 ┗ test.ts            # Configuración de pruebas
```

## 🚀 Instalación y Configuración

### 📥 Clonar el repositorio
```sh
git clone <URL_DEL_REPOSITORIO>
cd To-Do-List
```

### 📦 Instalar dependencias
```sh
npm install
```

### ▶️ Ejecutar la aplicación en desarrollo
```sh
ionic serve
```

### 📱 Ejecutar en un dispositivo móvil
```sh
ionic capacitor run android  # Para Android
ionic capacitor run ios      # Para iOS (requiere macOS)
```

## 📌 Funcionalidades
✅ Agregar, editar y eliminar tareas.  
✅ Guardar tareas en Firebase (si está integrado).  
✅ Diseño responsivo con Ionic UI Components.  
✅ Modo oscuro habilitado con `theme.service.ts`.

## 🛠 Tecnologías Usadas
- **Ionic Angular**: Framework para aplicaciones móviles y web.
- **Firebase (opcional)**: Backend en la nube.
- **TypeScript**: Lenguaje principal para el desarrollo.
- **SCSS**: Estilos avanzados.

## 📝 Licencia
Este proyecto está bajo la licencia MIT. ¡Siéntete libre de contribuir! 🎉

