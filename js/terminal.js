/* ==========================================================================
   INTERACTIVE SYSTEM TERMINAL (DEVELOPER CONSOLE)
   Dynamic CLI Simulation with Rich Responses & Command History
   ========================================================================== */

(function () {
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const presetPills = document.querySelectorAll('.preset-pill-btn');

  if (!terminalInput || !terminalBody) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: `
Available commands:
  <span class="cmd-info">projects</span>       - Production systems & academic software builds
  <span class="cmd-info">skills</span>         - Technical repertoire (Java, Spring Boot, React, SQL)
  <span class="cmd-info">internship</span>     - Infosys Java Full Stack Internship details
  <span class="cmd-info">education</span>      - B.E. CSE (CGPA 9.56) & academic track record
  <span class="cmd-info">certs</span>          - NPTEL, Infosys, IBM, IIT Bombay certifications
  <span class="cmd-info">contact</span>        - Phone (+91 8248065740), Email & LinkedIn
  <span class="cmd-info">whoami</span>         - Developer profile & credentials
  <span class="cmd-info">matrix</span>         - Digital code stream
  <span class="cmd-info">sudo hire</span>      - Direct interview scheduling
  <span class="cmd-info">clear</span>          - Clear terminal window
`,
    projects: `
<span class="cmd-success">[01] Organisational Knowledge Gap Intelligence Platform</span>
  • React.js, Spring Boot, MySQL, REST APIs
  • Evaluates employee technical skill gaps & recommends tailored learning paths
  • Implements role-based management dashboards & dynamic assessment matrices

<span class="cmd-success">[02] Digital Subsidy &amp; Grant Administration Platform</span>
  • Infosys Virtual Internship Flagship // Java, Spring Boot, React.js, MySQL
  • Automated public subsidy processing, approval workflows, Postman API testing

<span class="cmd-success">[03] Bank Management System</span>
  • Java, JDBC, MySQL InnoDB Engine
  • ACID-compliant customer record isolation, account deposits, debit &amp; statements

<span class="cmd-success">[04] Mail Management System</span>
  • Java Standard Edition, Object-Oriented Programming (OOP)
  • Console-based modular mail routing, priority queuing, OOP inheritance`,
    internship: `
<span class="cmd-success">Java Full Stack Intern | Infosys (Virtual)</span>
  • Period: July 2026 – September 2026
  • Stack:  Java, Spring Boot, React.js, MySQL, REST APIs, Postman
  • Built Digital Subsidy &amp; Grant Administration Platform
  • Implemented REST APIs and database operations for application approvals
`,
    education: `
<span class="cmd-info">-- ACADEMIC FOUNDATION --</span>
  • <span class="cmd-success">Dr. Mahalingam College of Engineering and Technology (MCET)</span>
    Pollachi, Tamil Nadu | B.E. Computer Science and Engineering (2024–2028)
    CGPA: <span class="cmd-prompt">9.56 / 10</span> (till 4th semester)

  • <span class="cmd-success">Palaniammal Higher Secondary School</span> | Kaliyapuram, Tamil Nadu
    HSC (2023–2024): 568/600 | Percentage: <span class="cmd-prompt">94.66%</span>
    SSLC (2021–2022): 475/500 | Percentage: <span class="cmd-prompt">95.00%</span>
`,
    certs: `
<span class="cmd-info">-- CERTIFICATIONS &amp; CREDENTIALS --</span>
  1. NPTEL – Java Programming Certification (Apr 2026)
  2. Infosys – Java Foundation Certification (Apr 2026)
  3. Coursera (Johns Hopkins Univ) – Frontend Development (Jan 2025)
  4. EduPyramids &amp; IIT Bombay – Python 3.4.3 (Score: 95%) (Feb 2026)
  5. IBM – Python Data Science, AI &amp; Development (Aug 2026)
  6. Great Learning – Data Structures in C (Dec 2025)
  7. MongoDB – Certification of Completion (Jul 2025)
  8. Simplilearn – SQL for Data Science (Jun 2025)
  9. Simplilearn (Microsoft) – Intro to Excel (Apr 2025)
`,
    skills: `
<span class="cmd-info">-- PROGRAMMING LANGUAGES --</span>
  Java, Python, C, C++

<span class="cmd-info">-- BACKEND &amp; WEB --</span>
  Spring Boot, REST APIs, Node.js, Express.js, Hibernate, React.js, HTML5, CSS3, JS

<span class="cmd-info">-- DATABASES &amp; TOOLS --</span>
  MySQL, MongoDB, Git, GitHub, Postman, Docker, Firebase, Maven

<span class="cmd-info">-- CORE COMPUTER SCIENCE CONCEPTS --</span>
  DSA (200+ LeetCode), OOP, Multithreading, Exception Handling, JDBC, CRUD, OS, Networks, DBMS
`,
    contact: `
<span class="cmd-info">TRANSMISSION CHANNELS:</span>
  • Phone:    <span class="cmd-prompt">+91 8248065740</span>
  • Email:    <span class="cmd-prompt">sahanasrinivasan4@gmail.com</span>
  • LinkedIn: <a href="https://linkedin.com/in/sahanasrinivasan15" target="_blank" style="color:var(--accent-cyan);">linkedin.com/in/sahanasrinivasan15</a>
  • GitHub:   <a href="https://github.com/sahana-srinivasan-15" target="_blank" style="color:var(--accent-cyan);">github.com/sahana-srinivasan-15</a>
  • Location: Anaimalai / Pollachi, Tamil Nadu
`,
    whoami: `
Identity:  <span class="cmd-success">SAHANA T S</span>
Role:      Software Developer | Fresher
Degree:    B.E. Computer Science and Engineering (CGPA 9.56 / 10)
Status:    Eager to build scalable software solutions &amp; high-impact systems.
`,
    matrix: `
<div class="terminal-matrix-rain">
01000001 01001001 00100000 01010011 01011001 01010011 01010100 01000101 01001101<br>
λ ⋈ ⋉ ⋊ ⋈ 0.984 SYNTHETIC_DEVIATION_DETECTED :: REAL-TIME DEFENSE ACTIVE<br>
[OK] eBPF XDP KERNEL MODULE: PROFILING AT 10,480 PKTS/S<br>
[OK] SEBI REGULATORY GRAPH: 15,200 SCHEMES AUDITED<br>
[OK] SYSTEM STACK: PYTHON, PYTORCH, GO, FASTAPI, REACT, TS<br>
Wake up, engineer... The matrix of code is alive.
</div>
`,
    'sudo hire': `
<span class="cmd-success">[SUCCESS] Elevating privileges... Access granted!</span>
Thank you for reaching out! Sahana is actively discussing roles in AI Engineering, Full-Stack Architecture, and Systems Engineering for Summer/Fall 2026.
Email directly: <span class="cmd-prompt">sahanasrinivasan4@gmail.com</span> or fill the form below.
`
  };

  function executeCommand(inputCmd) {
    const trimmed = inputCmd.trim().toLowerCase();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Echo command
    const echoLine = document.createElement('div');
    echoLine.className = 'terminal-output-line cmd-prompt';
    echoLine.innerHTML = `sahana@portfolio:~$ ${escapeHtml(trimmed)}`;
    terminalBody.appendChild(echoLine);

    if (trimmed === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-output-line';

    if (commands[trimmed]) {
      outputLine.innerHTML = commands[trimmed];
    } else {
      outputLine.innerHTML = `<span style="color:#ef4444;">Command not found: "${escapeHtml(trimmed)}". Type <span class="cmd-info">help</span> for available commands.</span>`;
    }

    terminalBody.appendChild(outputLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
    if (window.SoundFX) window.SoundFX.playSuccess();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  terminalInput.addEventListener('input', () => {
    if (window.SoundFX && window.SoundFX.playKeyboard) {
      window.SoundFX.playKeyboard();
    }
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });

  // Preset pill click triggers
  presetPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
})();
