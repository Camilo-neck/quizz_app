# Reto Bootcamp Dinara

Aplicación de exámentes donde los usuarios pueden presentar los mismos, y el administrador puede gestionar a los estudiantes y preguntas.

## Snapshots de la aplicación
### Login de la aplicación
En esta vista podemos encontrar un común formulario de inicio de sesión.
![Login](/resources/images/login.png)
### Dashboard de administrador
En esta vista podemos observar el dashboard del administrador, donde podemos encontrar las opciones de gestionar estudiantes, preguntas y exámenes.
![Dashboard](/resources/images/admin_dashboard.png)
### Gestión de estudiantes
En esta vista podemos observar una tabla con los estudiantes registrados en la aplicación, y un formulario para agregar nuevos estudiantes. Además de poder editar. Estas acciones presentan alertas de confirmación.
![Students](/resources/images/students_table.png)
![Students](/resources/images/create_update_form.png)
![Students](/resources/images/confirmation_alerts.png)

### Gestión de preguntas
En esta vista podemos observar una tabla con las preguntas registradas en la aplicación, y un formulario para agregar nuevas preguntas. Además de poder editar y eliminar. Estas acciones al igual que en la vista anterior, presentan alertas de confirmación.
![Questions](/resources/images/questions_table.png)
![Questions](/resources/images/question_details.png)
![Questions](/resources/images/create_update_question.png)

### Dashboard de estudiante
En esta vista podemos observar el dashboard del estudiante, donde se nos da la opción de presentar un examen.
![Student](/resources/images/student_dashboard.png)

### Presentación de examen
Podremos ver un formulario con las preguntas del exámen, además de un mensaje de error si no se seleccionan todas las respuestas, y uno de confirmación en caso de un envío exitoso.
![Exam](/resources/images/exam_form.png)
![Exam](/resources/images/exam_error_alert.png)
![Exam](/resources/images/exam_success_alert.png)

## Tecnologías

 - ReactJS <img align="center" alt="Rafa-Csharp" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
 - TypeScript <img align="center" alt="Rafa-Csharp" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg">
 - Tailwind CSS <img align="center" alt="Rafa-Csharp" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg">
 - Material Icons <img align="center" alt="Rafa-Csharp" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg">
 - React Redux <img align="center" alt="Rafa-Csharp" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg">
 - React Hook Form 

## ¿Cómo ejecutar el proyecto?

 - Clonar el repositorio
```bash
git clone https://github.com/Camilo-neck/quizz_app.git
cd quizz_app # Ingresar al proyecto
```
 - Instalar dependencias
```bash
npm i # npm install
```
 - Ejecutar el servidor y disfrutar 😄
```bash
npm start
```

> **Nota:** Tener en cuenta que el backend del proyecto fue modificado debido a que el original no funcionaba correctamente, ya que cierta información necesaria no la enviaba al cliente, por lo que se tuvo que modificar el código. Razón por la cual no se puede probar el proyecto con el backend original. 

**Autor 👋**

Camilo Andres Cuello Romero

Ingeniería de Sistemas y Computación

Universidad Nacional de Colombia Sede Bogotá

2022
