/* ==========================================================================
   SAHANA SRINIVASAN // CINEMATIC PORTFOLIO ORCHESTRATOR
   Preloader, Hero Typewriter, Interactive Playground & Modal Engine
   ========================================================================== */

(function () {
  // --- 1. CINEMATIC PRELOADER ---
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-progress-bar');
  const percentText = document.getElementById('preloader-percent');
  const skipBtn = document.getElementById('preloader-skip-btn');
  const preloaderSpans = document.querySelectorAll('.preloader-title span');

  let progress = 0;
  let isLoaded = false;

  function endPreloader() {
    if (isLoaded) return;
    isLoaded = true;
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none';
      setTimeout(() => {
        preloader.style.display = 'none';
        initHeroAnimations();
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 700);
    }
  }

  // Animate preloader title text
  setTimeout(() => {
    preloaderSpans.forEach((span, index) => {
      setTimeout(() => {
        span.style.transform = 'translateY(0%)';
      }, index * 120);
    });
  }, 200);

  // Smooth progress counter simulation
  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress > 100) progress = 100;

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentText) percentText.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(endPreloader, 400);
    }
  }, 45);

  if (skipBtn) {
    skipBtn.addEventListener('click', endPreloader);
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') endPreloader();
  });

  // --- 2. HERO ANIMATIONS & CYCLING ROLE ---
  function initHeroAnimations() {
    // Reveal hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50);
    });

    startRoleTypewriter();
  }

  // Cycling roles
  const roles = [
    'Software Developer',
    'Java Full Stack Developer',
    'Backend Engineer (Spring Boot & SQL)',
    'Full Stack Developer (React.js)'
  ];
  let currentRoleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const roleTarget = document.getElementById('cycling-role');

  function startRoleTypewriter() {
    if (!roleTarget) return;

    const currentRole = roles[currentRoleIdx];
    if (isDeleting) {
      roleTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      roleTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(startRoleTypewriter, typeSpeed);
  }

  // --- 3. SCROLL PROGRESS & NAVBAR HIDE/REVEAL ---
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollY > 150 && scrollY > lastScrollY) {
        navbar.classList.add('nav-hidden');
      } else {
        navbar.classList.remove('nav-hidden');
      }
    }
    lastScrollY = scrollY;
    updateActiveNavLink();
  }, { passive: true });

  // Update active nav link based on viewport
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentId = '';

    sections.forEach((sec) => {
      const top = sec.offsetTop - 200;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('is-active', isOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('is-active');
      });
    });
  }

  // --- 5. ARCHITECTURE CASE STUDY MODAL ---
  const modalOverlay = document.getElementById('case-study-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const inspectButtons = document.querySelectorAll('.btn-inspect-modal, [data-project]');

  const caseStudiesData = {
    knowledgegap: {
      title: 'Organisational Knowledge Gap Intelligence Platform',
      subtitle: 'React.js, Spring Boot, MySQL & Enterprise Skills Telemetry',
      problem: 'Enterprises struggle to identify emerging technical skill deficiencies among engineering teams, resulting in misallocated training budgets and deployment bottlenecks.',
      solution: 'Architected a centralized skill assessment platform in React and Spring Boot. Evaluates technical proficiencies across departments, generates automated gap analyses, and recommends curated personalized learning paths with role-based administrative dashboards.',
      github: 'https://github.com/sahana-srinivasan-15/Organizational-knowledge-gap-intelligence-platform',
      specs: [
        { label: 'BACKEND ARCHITECTURE', val: 'Java Spring Boot REST' },
        { label: 'FRONTEND CLIENT', val: 'React.js & Tailwind CSS' },
        { label: 'DATABASE & DATA', val: 'MySQL Relational Schema' },
        { label: 'KEY FEATURES', val: 'Role Dashboards & Learning Paths' }
      ]
    },
    digitalgrant: {
      title: 'Digital Subsidy & Grant Administration Platform',
      subtitle: 'Infosys Virtual Internship Flagship // Spring Boot & React.js',
      problem: 'Manual public subsidy processing leads to administrative delays, verification backlogs, and non-transparent beneficiary status tracking across state welfare schemes.',
      solution: 'Engineered an end-to-end digital administration portal during the Infosys Virtual Internship. Configured 5 distinct RBAC roles (Applicant/Citizen, Field Verifier, Sanctioning Authority, District Nodal Officer, and System Administrator). Implemented secure REST APIs for real-time application processing, document verification workflows, Direct Benefit Transfer (DBT) disbursement, immutable audit trails, and responsive React interfaces tested via Postman.',
      github: 'https://github.com/sahana-srinivasan-15/Digital-Subsidy-and-Grant-Administration-Platform',
      live: 'https://digital-subsidy-and-grant-administr.vercel.app/',
      specs: [
        { label: 'ORGANIZATION', val: 'Infosys (Virtual Internship)' },
        { label: 'VERIFIED ROLES', val: '5 Roles (Citizen, Verifier, Authority, District, Admin)' },
        { label: 'CORE ARCHITECTURE', val: 'Spring Boot REST & MySQL' },
        { label: 'LIVE FRONTEND', val: 'React.js, DBT Engine & Audit Trail' }
      ]
    },
    bankmanagement: {
      title: 'Bank Management System',
      subtitle: 'Core Banking Application // Java, JDBC & MySQL',
      problem: 'Demonstrating reliable transactional integrity, customer record isolation, and account operations in high-reliability financial systems.',
      solution: 'Built a Java and JDBC banking application with database connectivity. Engineered complete ACID-compliant CRUD operations for customer profiles, account creation, balance deposits, debit validation, and transaction statement logging.',
      github: 'https://github.com/sahana-srinivasan-15/BankSystemManagement',
      specs: [
        { label: 'LANGUAGE', val: 'Java & OOP Principles' },
        { label: 'CONNECTIVITY', val: 'JDBC Connection Management' },
        { label: 'DATABASE', val: 'MySQL Relational Database' },
        { label: 'OPERATIONS', val: 'Full Account CRUD & Statements' }
      ]
    },
    mailsystem: {
      title: 'Mail Management System',
      subtitle: 'Console-Based Architecture // Java & Object-Oriented Design',
      problem: 'Building robust modular communication systems with clean separation of concerns and object-oriented abstractions.',
      solution: 'Developed a console-based mail management application utilizing advanced OOP principles: encapsulation, polymorphism, and inheritance for inbox management, message routing, priority queues, and delivery status logging.',
      github: 'https://github.com/sahana-srinivasan-15/MailManagementSystem',
      specs: [
        { label: 'CORE LANGUAGE', val: 'Java Standard Edition' },
        { label: 'PARADIGM', val: 'Object-Oriented Programming (OOP)' },
        { label: 'ARCHITECTURE', val: 'Modular Console Application' },
        { label: 'CAPABILITIES', val: 'Message Routing & Inbox Queue' }
      ]
    }
  };

  // --- INTERACTIVE MODAL CONSOLE ENGINE (FOR BANK & MAIL SYSTEMS) ---
  const modalTerminalSection = document.getElementById('modal-terminal-section');
  const consoleScreen = document.getElementById('console-screen');
  const consoleTitle = document.getElementById('console-terminal-title');
  const consoleInputForm = document.getElementById('console-input-form');
  const consoleInput = document.getElementById('console-input');
  const consoleResetBtn = document.getElementById('console-reset-btn');
  const consoleQuickActions = document.getElementById('console-quick-actions');

  let activeTerminalProject = null;

  // In-memory Mock State for Bank Management System
  const bankSim = {
    accounts: [
      { accNo: 'ACC-10492', holder: 'Sahana T S', type: 'Savings', balance: 25000.00, status: 'ACTIVE' },
      { accNo: 'ACC-10493', holder: 'Arvind Kumar', type: 'Current', balance: 75400.00, status: 'ACTIVE' },
      { accNo: 'ACC-10494', holder: 'Priya Dharshini', type: 'Savings', balance: 14250.00, status: 'ACTIVE' }
    ],
    transactions: [
      { txnId: 'TXN-8921', accNo: 'ACC-10492', type: 'CREDIT', amount: 10000.00, status: 'SUCCESS', balanceAfter: 25000.00, time: '2026-11-25 10:14:22' },
      { txnId: 'TXN-8920', accNo: 'ACC-10493', type: 'DEBIT', amount: 5000.00, status: 'SUCCESS', balanceAfter: 75400.00, time: '2026-11-25 09:30:11' },
      { txnId: 'TXN-8919', accNo: 'ACC-10494', type: 'CREDIT', amount: 4250.00, status: 'SUCCESS', balanceAfter: 14250.00, time: '2026-11-24 16:45:00' }
    ],
    acidTestCounter: 0
  };

  // In-memory Mock State for Mail Management System
  const mailSim = {
    inbox: [
      { id: 101, priority: 'HIGH', sender: 'recruiter@infosys.com', subject: 'Interview Invitation - Java Software Developer', time: '10:45 AM', body: 'Dear Sahana, we were impressed by your 9.56 CGPA, LeetCode track record, and Spring Boot internship work. We invite you for a technical assessment round.' },
      { id: 102, priority: 'MEDIUM', sender: 'hod.cse@drmcet.ac.in', subject: 'Department Commendation & Academic Rank #1', time: 'Yesterday', body: 'Congratulations Sahana on securing top honors in Core Java, Relational Database Systems, and Object-Oriented Design.' },
      { id: 103, priority: 'NORMAL', sender: 'github-notifications@github.com', subject: 'Repository BankSystemManagement starred', time: '2 days ago', body: 'Your repository BankSystemManagement has received a new star from an open-source contributor.' }
    ],
    sent: [
      { id: 201, recipient: 'recruiter@infosys.com', subject: 'Re: Technical Assessment Confirmation', status: 'DELIVERED', time: 'Just now' }
    ]
  };

  function printConsole(html) {
    if (!consoleScreen) return;
    const line = document.createElement('div');
    line.style.marginBottom = '0.35rem';
    line.innerHTML = html;
    consoleScreen.appendChild(line);
    consoleScreen.scrollTop = consoleScreen.scrollHeight;
  }

  function renderTerminalBanner(projectId) {
    if (!consoleScreen) return;
    consoleScreen.innerHTML = '';

    if (projectId === 'bankmanagement') {
      if (consoleTitle) consoleTitle.textContent = 'sahana@dev: ~/BankSystemManagement (Java 17 JDBC)';
      printConsole(`<span style="color:#38bdf8; font-weight:700;">================================================================================</span>`);
      printConsole(`<span style="color:#38bdf8; font-weight:700;">  BANK MANAGEMENT SYSTEM &bull; CORE JAVA + JDBC + MYSQL INNODB</span>`);
      printConsole(`<span style="color:#94a3b8;">  Developed by Sahana T S | ACID Transactions &amp; CRUD Engine</span>`);
      printConsole(`<span style="color:#38bdf8; font-weight:700;">================================================================================</span>`);
      printConsole(`<span style="color:#10b981;">[JDBC CONNECT]</span> Connected to jdbc:mysql://localhost:3306/bank_db (Pool: 10)`);
      printConsole(`<span style="color:#10b981;">[STATUS]</span> Isolation: TRANSACTION_REPEATABLE_READ | Auto-Commit: ON\n`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">COMMAND MENU:</span>`);
      printConsole(`  <span style="color:#38bdf8;">[1]</span> Create Account         <span style="color:#64748b;">(INSERT INTO accounts)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[2]</span> Deposit Funds (Credit) <span style="color:#64748b;">(UPDATE accounts + ledger write)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[3]</span> Withdraw Funds (Debit) <span style="color:#64748b;">(Debit validation + Min balance check)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[4]</span> Check Account Balance  <span style="color:#64748b;">(SELECT * FROM accounts)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[5]</span> Audit Passbook         <span style="color:#64748b;">(SELECT * FROM transactions)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[6]</span> Run ACID Stress Test   <span style="color:#64748b;">(Network timeout &amp; rollback verification)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[7]</span> Help &bull; Clear Console\n`);
      printConsole(`<span style="color:#94a3b8;">Click any action pill below or type 1-6 in the prompt:</span>`);
      renderQuickActions([
        { label: '1. Create Account', cmd: '1' },
        { label: '2. Deposit ₹5,000', cmd: '2' },
        { label: '3. Withdraw ₹2,000', cmd: '3' },
        { label: '4. Check Balances', cmd: '4' },
        { label: '5. Audit Passbook', cmd: '5' },
        { label: '6. ACID Stress Test', cmd: '6' },
        { label: 'Clear', cmd: 'clear' }
      ]);
    } else if (projectId === 'mailsystem') {
      if (consoleTitle) consoleTitle.textContent = 'sahana@dev: ~/MailManagementSystem (Java SE 17 OOP)';
      printConsole(`<span style="color:#38bdf8; font-weight:700;">================================================================================</span>`);
      printConsole(`<span style="color:#38bdf8; font-weight:700;">  MAIL MANAGEMENT SYSTEM &bull; JAVA SE 17 OBJECT-ORIENTED ENGINE</span>`);
      printConsole(`<span style="color:#94a3b8;">  Developed by Sahana T S | Encapsulation, Polymorphism &amp; Priority Queue</span>`);
      printConsole(`<span style="color:#38bdf8; font-weight:700;">================================================================================</span>`);
      printConsole(`<span style="color:#10b981;">[JVM RUNTIME]</span> OpenJDK 17.0.9 LTS | Memory Footprint: 24.8 MB Heap`);
      printConsole(`<span style="color:#10b981;">[DISPATCHER]</span> PriorityQueue&lt;MailMessage&gt; Active In-Memory\n`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">COMMAND MENU:</span>`);
      printConsole(`  <span style="color:#38bdf8;">[1]</span> View Inbox Queue        <span style="color:#64748b;">(Priority order: HIGH &rarr; MEDIUM &rarr; NORMAL)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[2]</span> Read Message #101       <span style="color:#64748b;">(Polymorphic message payload extraction)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[3]</span> Compose &amp; Dispatch Mail <span style="color:#64748b;">(Encapsulated MailMessage instantiation)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[4]</span> OOP Architecture UML    <span style="color:#64748b;">(Class hierarchy &amp; OOP design patterns)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[5]</span> Sent Messages Outbox    <span style="color:#64748b;">(Delivery receipts &amp; dispatch logs)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[6]</span> System Telemetry &amp; GC  <span style="color:#64748b;">(Heap telemetry, thread pool &amp; collections)</span>`);
      printConsole(`  <span style="color:#38bdf8;">[7]</span> Help &bull; Clear Console\n`);
      printConsole(`<span style="color:#94a3b8;">Click any action pill below or type 1-6 in the prompt:</span>`);
      renderQuickActions([
        { label: '1. View Inbox', cmd: '1' },
        { label: '2. Read Mail #101', cmd: '2' },
        { label: '3. Compose Mail', cmd: '3' },
        { label: '4. OOP Architecture', cmd: '4' },
        { label: '5. Sent Outbox', cmd: '5' },
        { label: '6. System Telemetry', cmd: '6' },
        { label: 'Clear', cmd: 'clear' }
      ]);
    }
  }

  function renderQuickActions(actions) {
    if (!consoleQuickActions) return;
    consoleQuickActions.innerHTML = '';
    actions.forEach((act) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'console-action-pill';
      pill.textContent = act.label;
      pill.addEventListener('click', () => {
        executeConsoleCommand(act.cmd);
      });
      consoleQuickActions.appendChild(pill);
    });
  }

  function executeConsoleCommand(rawCmd) {
    const cmd = (rawCmd || '').trim().toLowerCase();
    if (!cmd) return;

    if (window.SoundFX && window.SoundFX.playKeypress) {
      window.SoundFX.playKeypress();
    }

    printConsole(`<span style="color:#38bdf8; font-weight:700;">&gt; ${escapeHtml(rawCmd)}</span>`);

    if (cmd === 'clear') {
      renderTerminalBanner(activeTerminalProject);
      return;
    }

    if (activeTerminalProject === 'bankmanagement') {
      handleBankCommand(cmd);
    } else if (activeTerminalProject === 'mailsystem') {
      handleMailCommand(cmd);
    } else {
      printConsole(`<span style="color:#ef4444;">[ERROR]</span> No active project terminal session.`);
    }
  }

  function handleBankCommand(cmd) {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (cmd === '1' || cmd === 'create' || cmd.includes('account')) {
      const newAccNum = `ACC-${Math.floor(10000 + Math.random() * 89999)}`;
      const newAccount = {
        accNo: newAccNum,
        holder: 'Interviewer / Recruiter',
        type: 'Savings',
        balance: 5000.00,
        status: 'ACTIVE'
      };
      bankSim.accounts.push(newAccount);
      bankSim.transactions.unshift({
        txnId: `TXN-${Math.floor(1000 + Math.random() * 8999)}`,
        accNo: newAccNum,
        type: 'INITIAL_DEP',
        amount: 5000.00,
        status: 'SUCCESS',
        balanceAfter: 5000.00,
        time: now
      });

      printConsole(`<span style="color:#60a5fa;">[SQL EXEC]</span> INSERT INTO accounts (acc_no, holder, type, balance, status) VALUES ('${newAccNum}', 'Interviewer / Recruiter', 'Savings', 5000.00, 'ACTIVE');`);
      printConsole(`<span style="color:#10b981;">[JDBC SUCCESS]</span> PreparedStatement executed in 3.4ms. Auto-commit SUCCESS.`);
      printConsole(`<span style="color:#ffffff; font-weight:700;">&check; New Account Created: ${newAccNum} | Holder: Interviewer / Recruiter | Opening Balance: ₹5,000.00</span>`);
    } else if (cmd === '2' || cmd === 'deposit' || cmd.includes('deposit') || cmd.includes('credit')) {
      const targetAcc = bankSim.accounts[0]; // ACC-10492 Sahana T S
      targetAcc.balance += 5000.00;
      const txnId = `TXN-${Math.floor(1000 + Math.random() * 8999)}`;
      bankSim.transactions.unshift({
        txnId,
        accNo: targetAcc.accNo,
        type: 'CREDIT',
        amount: 5000.00,
        status: 'SUCCESS',
        balanceAfter: targetAcc.balance,
        time: now
      });

      printConsole(`<span style="color:#60a5fa;">[SQL TXN]</span> BEGIN TRANSACTION;`);
      printConsole(`<span style="color:#60a5fa;">[SQL EXEC]</span> UPDATE accounts SET balance = balance + 5000.00 WHERE acc_no = '${targetAcc.accNo}';`);
      printConsole(`<span style="color:#60a5fa;">[SQL EXEC]</span> INSERT INTO transactions (txn_id, acc_no, type, amount, status) VALUES ('${txnId}', '${targetAcc.accNo}', 'CREDIT', 5000.00, 'SUCCESS');`);
      printConsole(`<span style="color:#10b981;">[SQL TXN]</span> COMMIT; (ACID Guaranteed &bull; Row lock released)`);
      printConsole(`<span style="color:#10b981; font-weight:700;">&check; CREDIT SUCCESS: ₹5,000.00 credited to ${targetAcc.accNo} (${targetAcc.holder}).</span>`);
      printConsole(`<span style="color:#ffffff;">Current Ledger Balance: <strong style="color:#38bdf8;">₹${targetAcc.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></span>`);
    } else if (cmd === '3' || cmd === 'withdraw' || cmd.includes('withdraw') || cmd.includes('debit')) {
      const targetAcc = bankSim.accounts[0];
      const minBalance = 1000.00;
      const debitAmount = 2000.00;

      printConsole(`<span style="color:#60a5fa;">[SQL TXN]</span> BEGIN TRANSACTION;`);
      printConsole(`<span style="color:#60a5fa;">[JDBC CHECK]</span> SELECT balance FROM accounts WHERE acc_no = '${targetAcc.accNo}' FOR UPDATE;`);

      if (targetAcc.balance - debitAmount >= minBalance) {
        targetAcc.balance -= debitAmount;
        const txnId = `TXN-${Math.floor(1000 + Math.random() * 8999)}`;
        bankSim.transactions.unshift({
          txnId,
          accNo: targetAcc.accNo,
          type: 'DEBIT',
          amount: debitAmount,
          status: 'SUCCESS',
          balanceAfter: targetAcc.balance,
          time: now
        });
        printConsole(`<span style="color:#60a5fa;">[SQL EXEC]</span> UPDATE accounts SET balance = balance - 2000.00 WHERE acc_no = '${targetAcc.accNo}';`);
        printConsole(`<span style="color:#10b981;">[SQL TXN]</span> COMMIT; Transaction finalized.`);
        printConsole(`<span style="color:#10b981; font-weight:700;">&check; DEBIT SUCCESS: ₹2,000.00 withdrawn from ${targetAcc.accNo}.</span>`);
        printConsole(`<span style="color:#ffffff;">Remaining Balance: <strong style="color:#38bdf8;">₹${targetAcc.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong> (Min reserve maintained: ₹1,000)</span>`);
      } else {
        printConsole(`<span style="color:#ef4444;">[ROLLBACK]</span> Insufficient Funds! Balance ₹${targetAcc.balance} violates minimum reserve.`);
        printConsole(`<span style="color:#ef4444;">[SQL TXN]</span> connection.rollback(); Zero funds deducted.`);
      }
    } else if (cmd === '4' || cmd === 'balance' || cmd === 'bal' || cmd.includes('check')) {
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">ACCOUNT NO    HOLDER               TYPE       BALANCE (INR)    STATUS</span>`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      bankSim.accounts.forEach((acc) => {
        const no = acc.accNo.padEnd(14, ' ');
        const holder = acc.holder.padEnd(21, ' ');
        const type = acc.type.padEnd(11, ' ');
        const bal = (`₹` + acc.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })).padEnd(17, ' ');
        printConsole(`<span style="color:#ffffff;">${no}${holder}${type}<span style="color:#38bdf8; font-weight:700;">${bal}</span><span style="color:#10b981;">${acc.status}</span></span>`);
      });
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      printConsole(`<span style="color:#94a3b8;">Total registered accounts: ${bankSim.accounts.length} | Database: MySQL 8.0 InnoDB</span>`);
    } else if (cmd === '5' || cmd === 'passbook' || cmd === 'statement' || cmd === 'audit' || cmd.includes('log')) {
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">TXN ID    ACC NUMBER   TYPE      AMOUNT (INR)   STATUS   BALANCE POST-TXN</span>`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      bankSim.transactions.slice(0, 6).forEach((tx) => {
        const id = tx.txnId.padEnd(10, ' ');
        const acc = tx.accNo.padEnd(13, ' ');
        const type = tx.type.padEnd(10, ' ');
        const amt = (`₹` + tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })).padEnd(15, ' ');
        const status = tx.status.padEnd(9, ' ');
        const balAfter = `₹` + tx.balanceAfter.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const typeColor = tx.type === 'CREDIT' ? '#10b981' : tx.type === 'DEBIT' ? '#f59e0b' : '#38bdf8';
        printConsole(`<span style="color:#94a3b8;">${id}${acc}</span><span style="color:${typeColor}; font-weight:700;">${type}</span><span style="color:#ffffff;">${amt}</span><span style="color:#10b981;">${status}</span><span style="color:#38bdf8;">${balAfter}</span>`);
      });
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      printConsole(`<span style="color:#94a3b8;">Immutable audit trail generated via PreparedStatement SELECT query.</span>`);
    } else if (cmd === '6' || cmd === 'acid' || cmd === 'stress' || cmd.includes('test')) {
      bankSim.acidTestCounter++;
      printConsole(`<span style="color:#f59e0b; font-weight:700;">[ACID FAULT INJECTION SIMULATION]</span> Initiating transfer: ACC-10492 &rarr; ACC-10493 (₹250,000.00)...`);
      printConsole(`<span style="color:#60a5fa;">[STEP 1]</span> Connection acquired: setAutoCommit(false). Transaction started.`);
      printConsole(`<span style="color:#60a5fa;">[STEP 2]</span> Row exclusive locks requested on ACC-10492, ACC-10493... OK.`);
      printConsole(`<span style="color:#ef4444;">[FAULT TRIGGERED]</span> Simulated Network Socket Timeout during foreign ledger RPC!`);
      printConsole(`<span style="color:#ef4444;">[EXCEPTION CAUGHT]</span> java.sql.SQLException: Gateway Connection Broken.`);
      printConsole(`<span style="color:#10b981; font-weight:700;">[RECOVERY]</span> Catch block invoked: connection.rollback();`);
      printConsole(`<span style="color:#10b981;">[RESULT]</span> Atomicity preserved. Database restored to pre-transaction state.`);
      printConsole(`<span style="color:#ffffff; font-weight:700;">&check; PASS: No money lost. Zero balance discrepancy. ACID contract validated!</span>`);
    } else if (cmd === '7' || cmd === 'help') {
      printConsole(`<span style="color:#fde68a; font-weight:700;">Available commands:</span> 1 (create), 2 (deposit), 3 (withdraw), 4 (balance), 5 (passbook), 6 (acid), 7 (help), clear.`);
    } else {
      printConsole(`<span style="color:#f59e0b;">[INPUT]</span> Command '${escapeHtml(cmd)}' not recognized. Type 1-6 or click a quick action pill above.`);
    }
  }

  function handleMailCommand(cmd) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (cmd === '1' || cmd === 'inbox' || cmd.includes('inbox') || cmd.includes('queue')) {
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">ID    PRIORITY   SENDER                      SUBJECT</span>`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      mailSim.inbox.forEach((mail) => {
        const id = `#${mail.id}`.padEnd(6, ' ');
        const pri = mail.priority.padEnd(11, ' ');
        const sender = mail.sender.padEnd(28, ' ');
        const priColor = mail.priority === 'HIGH' ? '#ef4444' : mail.priority === 'MEDIUM' ? '#f59e0b' : '#10b981';
        printConsole(`<span style="color:#94a3b8;">${id}</span><span style="color:${priColor}; font-weight:700;">${pri}</span><span style="color:#ffffff;">${sender}</span><span style="color:#38bdf8;">${mail.subject}</span>`);
      });
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      printConsole(`<span style="color:#94a3b8;">Sorted dynamically using PriorityQueue with custom PriorityComparator.</span>`);
    } else if (cmd === '2' || cmd === 'read' || cmd.includes('read') || cmd === '101') {
      const mail = mailSim.inbox.find((m) => m.id === 101) || mailSim.inbox[0];
      printConsole(`<span style="color:#38bdf8; font-weight:700;">==================== MESSAGE PAYLOAD: #${mail.id} ====================</span>`);
      printConsole(`<span style="color:#94a3b8;">From:</span>     <span style="color:#ffffff;">${mail.sender}</span>`);
      printConsole(`<span style="color:#94a3b8;">Time:</span>     <span style="color:#94a3b8;">${mail.time}</span>`);
      printConsole(`<span style="color:#94a3b8;">Priority:</span> <span style="color:#ef4444; font-weight:700;">${mail.priority} (Comparator Level 1)</span>`);
      printConsole(`<span style="color:#94a3b8;">Subject:</span>  <span style="color:#38bdf8; font-weight:700;">${mail.subject}</span>`);
      printConsole(`<span style="color:#64748b;">---------------------------------------------------------------------------------</span>`);
      printConsole(`<span style="color:#e2e8f0; line-height:1.5;">"${mail.body}"</span>`);
      printConsole(`<span style="color:#38bdf8; font-weight:700;">================================================================================</span>`);
    } else if (cmd === '3' || cmd === 'compose' || cmd.includes('send') || cmd.includes('compose')) {
      const newId = 200 + mailSim.sent.length + 1;
      const newMail = {
        id: newId,
        recipient: 'recruiter@techcorp.com',
        subject: 'Application & Technical Portfolio - Sahana T S',
        status: 'DELIVERED',
        time: now
      };
      mailSim.sent.unshift(newMail);

      printConsole(`<span style="color:#60a5fa;">[OOP INSTANTIATION]</span> MailMessage msg = new PriorityMailMessage("recruiter@techcorp.com", HIGH);`);
      printConsole(`<span style="color:#60a5fa;">[ENCAPSULATION]</span> Payload fields set via immutable setter methods.`);
      printConsole(`<span style="color:#10b981;">[POLYMORPHIC DISPATCH]</span> msg.dispatch(); called &rarr; OutboxQueue updated.`);
      printConsole(`<span style="color:#10b981; font-weight:700;">&check; MESSAGE SENT: Delivery status 200 OK. Enqueued in sent outbox.</span>`);
    } else if (cmd === '4' || cmd === 'oop' || cmd.includes('architecture') || cmd.includes('uml') || cmd.includes('class')) {
      printConsole(`<span style="color:#fde68a; font-weight:700;">OBJECT-ORIENTED CLASS HIERARCHY &amp; DESIGN PATTERNS:</span>`);
      printConsole(`<span style="color:#38bdf8;">abstract class Message</span>`);
      printConsole(`  &boxvr;&boxh;&boxh; <span style="color:#94a3b8;">Encapsulation: private id, sender, timestamp; public getters</span>`);
      printConsole(`  &boxur;&boxh;&boxh; <span style="color:#ffffff;">public abstract void dispatch();</span>`);
      printConsole(`       &boxvr;&boxh;&boxh; <span style="color:#10b981;">class StandardMailMessage extends Message</span> <span style="color:#64748b;">(Inheritance)</span>`);
      printConsole(`       &boxur;&boxh;&boxh; <span style="color:#10b981;">class PriorityMailMessage extends Message implements Comparable</span> <span style="color:#64748b;">(Polymorphism)</span>`);
      printConsole(`<span style="color:#38bdf8;">class MailBox&lt;T extends Message&gt;</span> <span style="color:#64748b;">(Generics &amp; Type-safe Queues)</span>`);
      printConsole(`<span style="color:#38bdf8;">class MailDispatcherService</span> <span style="color:#64748b;">(Single Responsibility Principle)</span>`);
      printConsole(`<span style="color:#10b981;">&check; Core OOP verified: Encapsulation, Polymorphic dispatch, clean abstractions.</span>`);
    } else if (cmd === '5' || cmd === 'sent' || cmd.includes('outbox')) {
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">ID    RECIPIENT                 STATUS      DISPATCH TIMESTAMP</span>`);
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
      mailSim.sent.forEach((m) => {
        const id = `#${m.id}`.padEnd(6, ' ');
        const rec = m.recipient.padEnd(26, ' ');
        const st = m.status.padEnd(12, ' ');
        printConsole(`<span style="color:#94a3b8;">${id}</span><span style="color:#ffffff;">${rec}</span><span style="color:#10b981; font-weight:700;">${st}</span><span style="color:#38bdf8;">${m.time}</span>`);
      });
      printConsole(`<span style="color:#fde68a; font-weight:700;">---------------------------------------------------------------------------------</span>`);
    } else if (cmd === '6' || cmd === 'gc' || cmd.includes('telemetry') || cmd.includes('diagnostics') || cmd.includes('memory')) {
      printConsole(`<span style="color:#60a5fa;">[JVM TELEMETRY]</span> Java SE 17 LTS (HotSpot 64-Bit Server VM)`);
      printConsole(`<span style="color:#ffffff;">Allocated Heap:  64.0 MB | Used Heap: 24.8 MB | Free Heap: 39.2 MB</span>`);
      printConsole(`<span style="color:#ffffff;">PriorityQueue:   ${mailSim.inbox.length} active elements | Sent Outbox: ${mailSim.sent.length} records</span>`);
      printConsole(`<span style="color:#10b981;">[GC EXECUTION]</span> System.gc() invoked. Garbage collector ran in 1.1ms. 0 memory leaks.`);
    } else if (cmd === '7' || cmd === 'help') {
      printConsole(`<span style="color:#fde68a; font-weight:700;">Available commands:</span> 1 (inbox), 2 (read #101), 3 (compose), 4 (oop), 5 (sent), 6 (telemetry), 7 (help), clear.`);
    } else {
      printConsole(`<span style="color:#f59e0b;">[INPUT]</span> Command '${escapeHtml(cmd)}' not recognized. Type 1-6 or click a quick action pill above.`);
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function initModalTerminal(projectId) {
    activeTerminalProject = projectId;
    renderTerminalBanner(projectId);
  }

  if (consoleInputForm) {
    consoleInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (consoleInput) {
        const val = consoleInput.value;
        consoleInput.value = '';
        executeConsoleCommand(val);
      }
    });
  }

  if (consoleResetBtn) {
    consoleResetBtn.addEventListener('click', () => {
      if (activeTerminalProject) {
        renderTerminalBanner(activeTerminalProject);
        if (window.SoundFX && window.SoundFX.playClick) window.SoundFX.playClick();
      }
    });
  }

  function openCaseStudy(projectId, openTerminalRequested = false) {
    const data = caseStudiesData[projectId];
    if (!data || !modalOverlay) return;

    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-project-subtitle').textContent = data.subtitle;
    document.getElementById('modal-problem-desc').textContent = data.problem;
    document.getElementById('modal-solution-desc').textContent = data.solution;

    const specsContainer = document.getElementById('modal-specs-container');
    if (specsContainer) {
      specsContainer.innerHTML = '';
      data.specs.forEach((spec) => {
        const item = document.createElement('div');
        item.className = 'modal-spec-item';
        item.innerHTML = `
          <div class="spec-label">${spec.label}</div>
          <div class="spec-val">${spec.val}</div>
        `;
        specsContainer.appendChild(item);
      });
    }

    const githubLink = document.getElementById('modal-github-link');
    if (githubLink) {
      githubLink.href = data.github || 'https://github.com/sahana-srinivasan-15';
    }
    const liveLink = document.getElementById('modal-live-link');
    if (liveLink) {
      if (data.live) {
        liveLink.href = data.live;
        liveLink.style.display = 'inline-flex';
      } else {
        liveLink.style.display = 'none';
      }
    }

    // Modal Interactive Terminal Simulator Section for Bank and Mail Management Systems
    if (modalTerminalSection) {
      if (projectId === 'bankmanagement' || projectId === 'mailsystem') {
        modalTerminalSection.style.display = 'block';
        initModalTerminal(projectId);
      } else {
        modalTerminalSection.style.display = 'none';
      }
    }

    modalOverlay.classList.add('open');
    modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Pause Lenis smooth scroll so inside modal wheel scrolling works completely
    if (window.lenis) {
      window.lenis.stop();
    }
    const modalPanel = modalOverlay.querySelector('.modal-panel');
    if (modalPanel) {
      modalPanel.scrollTop = 0;
    }

    if (openTerminalRequested && (projectId === 'bankmanagement' || projectId === 'mailsystem')) {
      setTimeout(() => {
        if (modalTerminalSection) {
          modalTerminalSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (consoleInput) consoleInput.focus();
        }
      }, 350);
    }

    if (window.SoundFX) window.SoundFX.playClick();
  }

  function closeCaseStudy() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';

    // Resume Lenis smooth scroll
    if (window.lenis) {
      window.lenis.start();
    }

    if (window.SoundFX) window.SoundFX.playClick();
  }

  window.openCaseStudy = openCaseStudy;
  window.closeCaseStudy = closeCaseStudy;

  inspectButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const pid = btn.getAttribute('data-project');
      const openTerminalRequested = btn.getAttribute('data-open-terminal') === 'true';
      if (pid) openCaseStudy(pid, openTerminalRequested);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCaseStudy);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeCaseStudy();
    });
  }

  // --- 6. SKILLS MATRIX FILTERING ---
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
        }
      });
      if (window.SoundFX) window.SoundFX.playClick();
    });
  });

  // --- 7. COPY EMAIL & FORM INTERACTION ---
  const copyEmailBtn = document.getElementById('btn-copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('sahanasrinivasan4@gmail.com').then(() => {
        const origText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'COPIED TO CLIPBOARD!';
        copyEmailBtn.style.background = '#10b981';
        copyEmailBtn.style.color = '#fff';
        if (window.SoundFX) window.SoundFX.playSuccess();

        setTimeout(() => {
          copyEmailBtn.textContent = origText;
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.color = '';
        }, 2500);
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING MESSAGE...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'MESSAGE TRANSMITTED';
        }
        if (formToast) {
          formToast.style.display = 'block';
          formToast.textContent = 'Transmission acknowledged! Sahana will reply to your inbox promptly.';
        }
        if (window.SoundFX) window.SoundFX.playSuccess();

        setTimeout(() => {
          if (submitBtn) submitBtn.innerHTML = 'TRANSMIT TRANSMISSION <span class="btn-icon-arrow">&#8599;</span>';
          if (formToast) formToast.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

  // --- 8. LIVE HUD CLOCK & REAL-TIME FPS MONITOR ---
  function initHudClock() {
    const clockEl = document.getElementById('hud-clock');
    const fpsEl = document.getElementById('hud-fps');
    if (clockEl) {
      function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', { hour12: false });
        clockEl.textContent = `${timeStr} IST`;
      }
      updateTime();
      setInterval(updateTime, 1000);
    }

    if (fpsEl) {
      let lastTime = performance.now();
      let frameCount = 0;
      function calcFps(now) {
        frameCount++;
        if (now >= lastTime + 1000) {
          const fps = Math.round((frameCount * 1000) / (now - lastTime));
          fpsEl.textContent = `${Math.min(60, fps)} FPS // 60HZ OPTIMAL`;
          frameCount = 0;
          lastTime = now;
        }
        requestAnimationFrame(calcFps);
      }
      requestAnimationFrame(calcFps);
    }
  }

  // Clean up any lingering theme attributes or storage
  document.documentElement.removeAttribute('data-theme');
  localStorage.removeItem('portfolio_theme');

  initHudClock();
})();
