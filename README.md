# Glimpse OS ⚡️
### A Portfolio by Sachin Mehta

[![React][react-shield]][react-url]
[![Vite][vite-shield]][vite-url]
[![TypeScript][ts-shield]][ts-url]
[![Tailwind CSS][tailwind-shield]][tailwind-url]
[![Framer Motion][framer-shield]][framer-url]
[![Zustand][zustand-shield]][zustand-url]

Welcome to **Glimpse OS**, my personal portfolio reimagined as a fully interactive, web-based desktop operating system.

This isn't just a static website; it's a dynamic and immersive experience presented within a simulated laptop screen right in your browser.


<img src="src\assets\projectData\glimpseOS.png" height=250, width=250></img>

---

## 🚀 The Concept

Why build a standard, scrollable portfolio when you can demonstrate your skills by building an *entire operating system*?

Glimpse OS is designed to mimic the modern UI/UX of Windows 11, providing a familiar yet novel way to explore my work. You can open apps, manage windows, and discover my projects as if you were using a real computer. It's a testament to my passion for complex state management, fluid animations, and crafting delightful user experiences.

**[➡️ View the Live Demo Here](https://glimpse-os.vercel.app)**

---

## ✨ Features

* **Window Management:** Open multiple apps at once. Windows are fully draggable, resizable, and can be minimized, maximized, or closed.
* **Persistent State:** Uses `zustand` to manage the global state of open windows, active apps, and their positions (future-proofing for `localStorage`).
* **Functional Taskbar:** See running applications, launch new ones from "pinned" icons, and restore minimized windows.
* **Interactive Desktop:** Launch apps directly from desktop icons, just like in a real OS.
* **"Recycle Bin" for Ideas:** 🚮 The Recycle Bin isn't just for show! It contains a collection of my "discarded ideas" and prototypes, giving insight into my creative process.
* **Floating Windows:** All content (projects, about me, resume) is presented inside app windows, not on a static page.
* **Cinematic Animations:** Powered by **Framer Motion**, all window and UI interactions are designed to be fluid, responsive, and intuitive.
* **Custom Cursor:** A subtle custom cursor enhances the interactive "OS-within-an-OS" feel.

---

## 🛠 Tech Stack

This project is a showcase of modern frontend technologies working in harmony:

* **Framework:** **React** (with **Vite** for a blazing-fast dev experience)
* **Language:** **TypeScript** (for robust, scalable state and component definitions)
* **Styling:** **Tailwind CSS** (for rapidly building the Windows 11-inspired UI)
* **Animation:** **Framer Motion** (for all window open/close, minimize, and UI flourish animations)
* **State Management:** **Zustand** (for simple, powerful global state management of windows and apps)
* **Windowing:** **`react-resizable-and-movable`** (for the core window interaction logic)
* **Icons:** **`react-icons`**

---

## 🖥️ How to Run Locally

Want to explore the code or run your own instance?

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AEGON247/GlimpseOS.git](https://github.com/AEGON247/GlimpseOS.git)
    cd GlimpseOS
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The OS will launch at `http://localhost:5173` (or the next available port).

---

## 👨‍💻 Author

Crafted with passion by **Sachin Mehta**.

* **GitHub:** [@AEGON247](https://github.com/AEGON247)
* **LinkedIn:** [@sachin-mehta](https://www.linkedin.com/in/sachin-mehta-785704272/)

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[vite-shield]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[ts-shield]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[tailwind-shield]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[framer-shield]: https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white
[zustand-shield]: https://img.shields.io/badge/Zustand-7E7E7E?style=for-the-badge&logo=react&logoColor=white

[react-url]: https://reactjs.org/
[vite-url]: https://vitejs.dev/
[ts-url]: https://www.typescriptlang.org/
[tailwind-url]: https://tailwindcss.com/
[framer-url]: https://www.framer.com/motion/
[zustand-url]: https://github.com/pmndrs/zustand