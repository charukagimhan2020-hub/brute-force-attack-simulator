# 🔓 Brute Force Attack Simulator

> ⚠ Educational Use Only
>
> All simulations run entirely inside the browser. No real authentication systems, servers, or networks are targeted. Zero network requests, zero external dependencies.

A React-based cybersecurity education tool that demonstrates how brute force and dictionary attacks operate against login systems — in a safe, browser-only environment. Visualize attack progression, compare attack methods, and understand why strong passwords matter.

---

# 🌐 Live Demo link

https://brute-force-attack-simulator.vercel.app/

---

# 📖 Overview

Brute force and dictionary attacks remain among the most common techniques used to compromise accounts with weak or reused passwords.

This simulator lets users configure a target username and password, select an attack method, and observe in real time how different password-guessing strategies behave — including attempt speed, wordlist exhaustion, and sequential character generation.

The goal is to build intuition around password security and attack mechanics in a hands-on, visual format.

---

# ✨ Features

### ⚔️ Attack Modes

**Wordlist Attack**
- Common password presets
- RockYou-style password lists
- Fully custom user-defined wordlists

**Sequential Brute Force**
Systematically generates all possible combinations from a configurable character set:
- Uppercase `A–Z`
- Lowercase `a–z`
- Digits `0–9`
- Special characters: `! @ # $ % ^ & * ( ) - _ = + [ ] { } | ; : ' , . < > / ? \` ~`

### 📊 Real-Time Visualization
- Live attack log with every attempt
- Attempts-per-second counter
- Live progress bar and remaining attempts indicator
- Credential discovery animation on success
- Adjustable attack speed
- Wordlist size counter

### 🔒 Safety
- Browser-only execution
- No network requests
- No external APIs
- No data stored or transmitted

---

# 🎯 Learning Objectives

This project demonstrates:

- How brute force and dictionary attacks work mechanically
- Why short or common passwords are trivially crackable
- The difference between wordlist and sequential attack strategies
- How attack speed scales with character set size and password length
- The importance of strong, unique passwords and account lockout policies

---

# ⚙️ Technology Stack

- React.js
- JavaScript (ES6+)
- HTML5 / CSS3
- React Hooks
- Browser-Only Execution — no backend, no database, no API

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/brute-force-attack-simulator.git
cd brute-force-attack-simulator
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Create Production Build

```bash
npm run build
```

---

# 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Wordlist Attack in Progress
![Wordlist Attack](screenshots/attack.png)

### Credentials Found
![Credentials Found](screenshots/success.png)

---

# 🎓 Example Use Cases

- Demonstrating why `password123` gets cracked in milliseconds
- Comparing wordlist attacks vs. sequential brute force on the same target
- Visualizing how attack speed scales with character set size
- Showing the practical impact of password length on crack time
- Live demonstrations in cybersecurity awareness workshops or coursework

---

# 🔮 Planned Improvements

- Password strength estimator with crack-time prediction
- Configurable character set selection UI
- CSV wordlist import
- Exportable attack reports
- Hash cracking demonstrations (MD5, SHA-1, bcrypt comparison)
- Multi-target simulation

---

# 📂 Project Structure

```text
brute-force-attack-simulator/
│
├── public/
│
├── src/
│   ├── App.js
│   ├── index.js
│   └── BruteForceSimulator.jsx
│
├── screenshots/
│   ├── dashboard.png
│   ├── attack.png
│   └── success.png
│
├── .gitignore
├── LICENSE
├── README.md
├── package.json
└── package-lock.json
```

---

# ⚠ Disclaimer

This project is intended strictly for educational purposes and cybersecurity awareness training.

No real authentication systems, servers, websites, or networks are attacked. All simulations occur entirely within the browser using locally generated data.

The author assumes no responsibility for misuse of this software.

---

# 👨‍💻 Author

**Charuka Weerasinghe**
Cybersecurity Student | Information Security Enthusiast

---

# 📄 License

Licensed under the MIT License.
Free to use for educational, academic, and cybersecurity awareness purposes.
