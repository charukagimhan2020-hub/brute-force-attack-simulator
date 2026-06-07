import { useState, useRef, useEffect, useCallback } from "react";

// ── Wordlists ──────────────────────────────────────────────────────────────
const WORDLISTS = {
  common: [
    "password","123456","12345678","qwerty","abc123","monkey","letmein",
    "trustno1","dragon","111111","baseball","iloveyou","master","sunshine",
    "ashley","passw0rd","shadow","123123","654321","superman","qazwsx",
    "michael","football","welcome","login",
  ],
  rockyou: [
    "123456","password","12345678","qwerty","123456789","12345","1234",
    "111111","1234567","dragon","123123","baseball","abc123","football",
    "monkey","letmein","696969","shadow","master","666666","qwertyuiop",
    "123321","mustang","1234567890","michael","654321","superman","1qaz2wsx",
    "7777777","121212","000000","qazwsx","123qwe","killer","trustno1",
    "jordan","jennifer","zxcvbnm","asdfgh","hunter","buster","soccer",
    "harley","batman","andrew","tigger","sunshine","iloveyou","2000",
    "charlie","robert","thomas","hockey","ranger","daniel","starwars",
    "klaster","112233","george","computer","michelle","jessica","pepper",
  ],
};

const SEQ_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>/?`~";

function seqPassword(index) {
  let result = "";
  let base = SEQ_CHARS.length;

  do {
    result = SEQ_CHARS[index % base] + result;
    index = Math.floor(index / base) - 1;
  } while (index >= 0);

  return result;
}

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Courier+Prime:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:      #ffffff;
    --bg2:     #f5f5f5;
    --bg3:     #ececec;
    --border:  #111111;
    --border2: #111111;
    --ink:     #111111;
    --accent:  #111111;
    --green:   #1a7a1a;
    --red:     #cc1111;
    --amber:   #b87a00;
    --text:    #111111;
    --muted:   #555555;
    --muted2:  #999999;
    --mono:    'Courier Prime', monospace;
    --display: 'Bangers', cursive;
    --outline: 3px solid #111111;
    --shadow:  4px 4px 0px #111111;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--mono);
    min-height: 100vh;
    background-image: radial-gradient(circle, #ccc 1px, transparent 1px);
    background-size: 20px 20px;
  }

  .scanline { display: none; }

  .app { max-width: 940px; margin: 0 auto; padding: 2rem 1.5rem; }

  /* Header */
  .header {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: var(--outline);
    padding-bottom: 1.5rem;
  }
  .header-icon { font-size: 2rem; }
  .header-title {
    font-family: var(--display); font-size: 2.2rem; font-weight: 400;
    letter-spacing: 0.04em; color: var(--ink);
    text-shadow: 3px 3px 0 #ccc;
  }
  .header-title span {
    -webkit-text-stroke: 2px #111;
    color: transparent;
    text-shadow: none;
  }
  .header-sub { font-size: 11px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px; font-weight: 700; }
  .badge {
    margin-left: auto; background: #111111; color: #fff;
    border: var(--outline); border-radius: 0;
    padding: 5px 12px; font-size: 10px; letter-spacing: 0.12em; font-weight: 700;
    box-shadow: var(--shadow);
    font-family: var(--mono);
  }

  /* Stats */
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 1rem; }
  .stat {
    background: var(--bg); border: var(--outline); border-radius: 0;
    padding: 10px 12px; box-shadow: var(--shadow);
  }
  .stat-val { font-size: 1.5rem; font-weight: 700; color: var(--ink); font-family: var(--display); line-height: 1; letter-spacing: 0.05em; }
  .stat-label { font-size: 10px; color: var(--muted); margin-top: 4px; letter-spacing: 0.08em; font-weight: 700; }

  /* Grid */
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }

  /* Panel */
  .panel {
    background: var(--bg); border: var(--outline); border-radius: 0;
    padding: 1.25rem; box-shadow: var(--shadow);
  }
  .panel-title {
    font-size: 11px; color: var(--ink); letter-spacing: 0.15em;
    text-transform: uppercase; margin-bottom: 1rem; font-weight: 700;
    display: flex; align-items: center; gap: 6px;
    font-family: var(--display); font-size: 1rem;
  }
  .panel-title::before {
    content: ''; width: 10px; height: 10px; background: var(--ink);
    display: inline-block; flex-shrink: 0;
  }

  /* Login box */
  .login-box {
    background: var(--bg2); border: var(--outline); border-radius: 0;
    padding: 1.25rem;
  }
  .login-box label { font-size: 11px; color: var(--muted); display: block; margin-bottom: 5px; margin-top: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
  .login-box label:first-child { margin-top: 0; }
  .login-box input {
    width: 100%; background: #fff; border: var(--outline);
    border-radius: 0; padding: 8px 10px; color: var(--text);
    font-family: var(--mono); font-size: 13px; outline: none;
  }
  .login-status {
    margin-top: 10px; padding: 8px 10px; border-radius: 0;
    font-size: 12px; text-align: center; border: 2px dashed var(--muted2);
    color: var(--muted); transition: all 0.2s; font-weight: 700;
  }
  .login-status.trying  { border: 3px solid var(--amber); color: var(--amber); background: #fff8e0; }
  .login-status.success { border: 3px solid var(--green); color: var(--green); background: #e6f5e6; }
  .login-status.fail    { border: 3px solid var(--red);   color: var(--red);   background: #fde8e8; }

  /* Config */
  .cfg-row { margin-bottom: 10px; }
  .cfg-row label { font-size: 10px; color: var(--muted); display: block; margin-bottom: 4px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
  .cfg-row input, .cfg-row select {
    width: 100%; background: #fff; border: var(--outline);
    border-radius: 0; padding: 7px 10px; color: var(--text);
    font-family: var(--mono); font-size: 12px; outline: none;
  }
  .cfg-row select option { background: #fff; color: #111; }

  /* Wordlist */
  .wl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: start; }
  .wl-textarea {
    width: 100%; background: #fff; border: var(--outline);
    border-radius: 0; padding: 7px 10px; color: var(--text);
    font-family: var(--mono); font-size: 12px; outline: none;
    resize: none; height: 80px; line-height: 1.6;
  }

  /* Delay */
  .delay-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
  .delay-row label { font-size: 11px; color: var(--muted); white-space: nowrap; font-weight: 700; text-transform: uppercase; }
  .delay-row input[type=range] { flex: 1; accent-color: var(--ink); }
  .delay-val { font-size: 12px; color: var(--ink); min-width: 42px; text-align: right; font-weight: 700; }

  /* Progress */
  .progress-wrap {
    background: var(--bg); border: var(--outline); border-radius: 0;
    padding: 1.25rem; margin-bottom: 1rem; box-shadow: var(--shadow);
  }
  .prog-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); font-weight: 700; }
  .prog-bg { background: var(--bg3); border: 2px solid var(--ink); border-radius: 0; height: 14px; margin: 8px 0 4px; overflow: hidden; }
  .prog-fill { height: 100%; border-radius: 0; background: var(--ink); transition: width 0.3s; }

  /* Found box */
  .found-box {
    background: #e6f5e6; border: 3px solid var(--green);
    border-radius: 0; padding: 12px 16px; display: flex; align-items: center;
    gap: 12px; margin-top: 10px; box-shadow: 3px 3px 0 var(--green);
  }
  .found-title { font-size: 11px; color: var(--green); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: var(--display); font-size: 1rem; }
  .found-cred { font-size: 13px; color: var(--text); margin-top: 2px; font-weight: 700; }
  .found-cred span { color: var(--green); }

  /* Buttons */
  .btn-row { display: flex; gap: 10px; margin-top: 12px; }
  .btn {
    padding: 9px 18px; border-radius: 0; font-family: var(--display);
    font-size: 1rem; font-weight: 400; letter-spacing: 0.06em;
    cursor: pointer; border: var(--outline); transition: all 0.1s;
  }
  .btn:active:not(:disabled) { transform: translate(2px, 2px); box-shadow: none !important; }
  .btn-primary { background: var(--ink); color: #fff; box-shadow: var(--shadow); }
  .btn-primary:hover:not(:disabled) { background: #333; }
  .btn-primary:disabled { background: var(--muted2); color: #fff; cursor: not-allowed; box-shadow: none; }
  .btn-stop { background: #fff; color: var(--red); border: 3px solid var(--red); box-shadow: 4px 4px 0 var(--red); }
  .btn-stop:hover:not(:disabled) { background: #fde8e8; }
  .btn-stop:disabled { opacity: 0.3; cursor: not-allowed; box-shadow: none; }
  .btn-clear { background: #fff; color: var(--muted); border: var(--outline); box-shadow: var(--shadow); }
  .btn-clear:hover { background: var(--bg3); }

  /* Log */
  .log-wrap {
    background: var(--bg); border: var(--outline); border-radius: 0;
    overflow: hidden; margin-bottom: 1rem; box-shadow: var(--shadow);
  }
  .log-header {
    padding: 10px 1.25rem; border-bottom: var(--outline);
    font-size: 1rem; color: var(--ink); letter-spacing: 0.1em;
    text-transform: uppercase; font-weight: 400; display: flex; align-items: center; gap: 8px;
    background: var(--ink); color: #fff;
    font-family: var(--display);
  }
  .log-header::before { content: ''; width: 8px; height: 8px; background: #fff; border-radius: 50%; }
  .log-body { height: 200px; overflow-y: auto; padding: 10px 1.25rem; font-size: 11.5px; line-height: 1.8; background: #fafafa; }
  .log-body::-webkit-scrollbar { width: 6px; }
  .log-body::-webkit-scrollbar-track { background: var(--bg3); border-left: 2px solid var(--ink); }
  .log-body::-webkit-scrollbar-thumb { background: var(--ink); border-radius: 0; }
  .log-line { display: flex; gap: 10px; }
  .log-time { color: var(--muted); flex-shrink: 0; font-weight: 700; }
  .log-success { color: var(--green); font-weight: 700; }
  .log-fail    { color: var(--muted); }
  .log-info    { color: var(--ink); }
  .log-warn    { color: var(--amber); font-weight: 700; }

  /* Disclaimer */
  .disclaimer {
    font-size: 10px; color: var(--muted); border-top: var(--outline);
    padding-top: 1rem; margin-top: 0.5rem; line-height: 1.7; text-align: center; font-weight: 700;
  }
  .disclaimer strong { color: var(--red); }
`;

// ── Component ──────────────────────────────────────────────────────────────
export default function BruteForceSimulator() {
  // Config state
  const [targetUser, setTargetUser]     = useState("admin");
  const [targetPass, setTargetPass]     = useState("letmein");
  const [mode, setMode]                 = useState("wordlist");
  const [preset, setPreset]             = useState("common");
const [customList, setCustomList]       = useState(
`password
123456
admin
letmein
welcome`
);
  const [delay, setDelay]               = useState(0);

  // Runtime state
  const [running, setRunning]           = useState(false);
  const [attempts, setAttempts]         = useState(0);
  const [speed, setSpeed]               = useState(0);
  const [remaining, setRemaining]       = useState("—");
  const [statusLabel, setStatusLabel]   = useState("—");
  const [statusColor, setStatusColor]   = useState("var(--ink)");
  const [progress, setProgress]         = useState(0);
  const [progLabel, setProgLabel]       = useState("Ready");
  const [displayUser, setDisplayUser]   = useState("");
  const [displayPass, setDisplayPass]   = useState("");
  const [loginState, setLoginState]     = useState("");   // "", "trying", "success", "fail"
  const [loginMsg, setLoginMsg]         = useState("Waiting for attack...");
  const [found, setFound]               = useState(null); // { user, pass } | null
  const [logs, setLogs]                 = useState([]);

  // Refs for mutable state inside timer callbacks
  const runRef        = useRef(false);
  const attemptsRef   = useRef(0);
  const startTimeRef  = useRef(null);
  const wordIndexRef  = useRef(0);
  const seqIndexRef   = useRef(0);
  const wordlistRef   = useRef([]);
  const timerRef      = useRef(null);
  const logBodyRef    = useRef(null);

  // Inject global styles once
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = styles;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  // Auto-scroll log
  useEffect(() => {
    if (logBodyRef.current) logBodyRef.current.scrollTop = logBodyRef.current.scrollHeight;
  }, [logs]);

  const addLog = useCallback((msg, type = "info") => {
    const now = new Date();
    const t = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
    setLogs(prev => [...prev, { t, msg, type }]);
  }, []);

  const buildWordlist = useCallback(() => {
    if (preset === "custom") return customList.split("\n").map(s => s.trim()).filter(Boolean);
    return [...WORDLISTS[preset]];
  }, [preset, customList]);

  const doAttempt = useCallback(() => {
    if (!runRef.current) return;

    const currentMode = wordlistRef.current._mode;
    const correct     = wordlistRef.current._correct;
    const user        = wordlistRef.current._user;

    let guess;
    if (currentMode === "wordlist") {
      if (wordIndexRef.current >= wordlistRef.current.length) { endAttack(false); return; }
      guess = wordlistRef.current[wordIndexRef.current];
      wordIndexRef.current++;
      const pct = Math.min(100, Math.round((wordIndexRef.current / wordlistRef.current.length) * 100));
      setProgress(pct);
      setProgLabel(`Trying: ${guess}`);
      setRemaining(wordlistRef.current.length - wordIndexRef.current);
    } else {
      if (seqIndexRef.current > 2000000000000000000) { endAttack(false); return; }
      guess = seqPassword(seqIndexRef.current);
      seqIndexRef.current++;
      setProgress(0);
      setProgLabel(`Trying: ${guess}`);
      setRemaining("∞");
    }

    setDisplayUser(user);
    setDisplayPass(guess);

    attemptsRef.current++;
    setAttempts(attemptsRef.current);

    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    setSpeed(elapsed > 0 ? Math.round(attemptsRef.current / elapsed) : 0);

    if (guess === correct) {
      setLoginState("success");
      setLoginMsg("✓ Login Successful");
      addLog(`✓ MATCH FOUND → ${user}:${guess}`, "success");
      setFound({ user, pass: guess });
      setStatusLabel("CRACKED");
      setStatusColor("var(--green)"); // keep green for cracked
      endAttack(true);
    } else {
      setLoginState("fail");
      setLoginMsg(`✗ Failed — ${guess}`);
      if (attemptsRef.current <= 12 || attemptsRef.current % 5 === 0) {
        addLog(`✗ ${user}:${guess} — access denied`, "fail");
      }
      timerRef.current = setTimeout(doAttempt, wordlistRef.current._delay);
    }
  }, [addLog]); // eslint-disable-line

  function endAttack(succeeded) {
    runRef.current = false;
    clearTimeout(timerRef.current);
    setRunning(false);
    if (!succeeded) {
      addLog("■ Attack finished — no match found", "warn");
      setLoginMsg("Attack complete — no match");
      setLoginState("");
      setStatusLabel("NO MATCH");
      setStatusColor("var(--red)");
    }
  }

  function startAttack() {
    if (running) return;
    const wl = buildWordlist();
    if (mode === "wordlist" && wl.length === 0) {
      alert("Please add at least one password to the wordlist.");
      return;
    }
    wl._mode    = mode;
    wl._correct = targetPass;
    wl._user    = targetUser || "admin";
    wl._delay   = delay;
    wordlistRef.current  = wl;
    wordIndexRef.current = 0;
    seqIndexRef.current  = 0;
    attemptsRef.current  = 0;
    startTimeRef.current = Date.now();
    runRef.current       = true;

    setRunning(true);
    setAttempts(0);
    setSpeed(0);
    setFound(null);
    setProgress(0);
    setProgLabel("Starting...");
    setStatusLabel("RUNNING");
    setStatusColor("var(--amber)"); // keep amber for running
    setLoginState("trying");
    setLoginMsg("Attacking...");

    addLog(`► Attack started | mode: ${mode} | target: ${targetUser || "admin"}`, "info");
    if (mode === "wordlist") addLog(`► Loaded ${wl.length} passwords`, "info");

    timerRef.current = setTimeout(doAttempt, delay);
  }

  function stopAttack() {
    runRef.current = false;
    clearTimeout(timerRef.current);
    setRunning(false);
    setStatusLabel("STOPPED");
    setStatusColor("var(--muted)");
    setLoginMsg("Stopped");
    setLoginState("");
    addLog("■ Attack manually stopped", "warn");
  }

  function clearAll() {
    stopAttack();
    setLogs([]);
    setAttempts(0);
    setSpeed(0);
    setRemaining("—");
    setStatusLabel("—");
    setStatusColor("var(--ink)");
    setProgress(0);
    setProgLabel("Ready");
    setDisplayUser("");
    setDisplayPass("");
    setLoginState("");
    setLoginMsg("Waiting for attack...");
    setFound(null);
    addLog("System ready. Configure attack and press START.", "info");
  }

  return (
    <>
      <div className="scanline" />
      <div className="app">

        {/* Header */}
        <div className="header">
          <div className="header-icon">⚡</div>
          <div>
            <div className="header-title">Brute<span>Force</span> Simulator</div>
            <div className="header-sub">Local · Educational Demo · Credential Attack Simulation</div>
          </div>
          <div className="badge">⚠ LOCAL ONLY</div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <div className="stat-val">{attempts}</div>
            <div className="stat-label">TOTAL ATTEMPTS</div>
          </div>
          <div className="stat">
            <div className="stat-val" style={{ color: statusColor }}>{statusLabel}</div>
            <div className="stat-label">STATUS</div>
          </div>
          <div className="stat">
            <div className="stat-val" style={{ color: "var(--amber)" }}>{speed}</div>
            <div className="stat-label">ATTEMPTS/SEC</div>
          </div>
          <div className="stat">
            <div className="stat-val" style={{ color: "var(--red)" }}>{remaining}</div>
            <div className="stat-label">REMAINING</div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid2">
          {/* Target login form */}
          <div className="panel">
            <div className="panel-title">Target Login Form</div>
            <div className="login-box">
              <label>Username</label>
              <input readOnly value={displayUser} placeholder="— waiting —" />
              <label>Password</label>
              <input readOnly value={displayPass} placeholder="— waiting —" />
              <div className={`login-status ${loginState}`}>{loginMsg}</div>
            </div>
          </div>

          {/* Config */}
          <div className="panel">
            <div className="panel-title">Attack Configuration</div>
            <div className="cfg-row">
              <label>Target Username</label>
              <input value={targetUser} onChange={e => setTargetUser(e.target.value)} placeholder="admin" />
            </div>
            <div className="cfg-row">
              <label>Correct Password (secret)</label>
              <input value={targetPass} onChange={e => setTargetPass(e.target.value)} placeholder="hidden in real attack" />
            </div>
            <div className="cfg-row">
              <label>Attack Mode</label>
              <select value={mode} onChange={e => setMode(e.target.value)}>
                <option value="wordlist">Wordlist Attack</option>
                <option value="sequential">Sequential (A-Z, a-z, 0-9, !-~)</option>
              </select>
            </div>
            <div className="delay-row">
              <label>Delay (ms):</label>
              <input type="range" min="0" max="400" step="10" value={delay} onChange={e => setDelay(Number(e.target.value))} />
              <span className="delay-val">{delay}ms</span>
            </div>
          </div>
        </div>

        {/* Wordlist config */}
        {mode === "wordlist" && (
          <div className="panel" style={{ marginBottom: "1rem" }}>
            <div className="panel-title">Wordlist</div>
            <p style={{ marginBottom: "10px", fontSize: "12px" }}>
              Loaded passwords: {
                preset === "custom"
                  ? customList.split("\n").filter(Boolean).length
                  : WORDLISTS[preset].length
              }
            </p>
            <div className="wl-grid">
              <div className="cfg-row" style={{ margin: 0 }}>
                <label>Preset</label>
                <select value={preset} onChange={e => setPreset(e.target.value)}>
                  <option value="common">Common Passwords (25)</option>
                  <option value="rockyou">RockYou-style (60)</option>
                  <option value="custom">Custom (edit →)</option>
                </select>
              </div>
              <div className="cfg-row" style={{ margin: 0 }}>
                <label>Custom Wordlist (one per line)</label>
                <textarea
                  className="wl-textarea"
                  value={customList}
                  onChange={e => setCustomList(e.target.value)}
                  placeholder={"password\n123456\nadmin\nletmein"}
                />
              </div>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="progress-wrap">
          <div className="prog-labels">
            <span>{progLabel}</span>
            <span>{progress}%</span>
          </div>
          <div className="prog-bg">
            <div className="prog-fill" style={{ width: `${progress}%` }} />
          </div>

          {found && (
            <div className="found-box">
              <span style={{ fontSize: "1.3rem" }}>🔑</span>
              <div>
                <div className="found-title">Credentials Found!</div>
                <div className="found-cred">
                  Username: <span>{found.user}</span> &nbsp;|&nbsp; Password: <span>{found.pass}</span>
                </div>
              </div>
            </div>
          )}

          <div className="btn-row">
            <button className="btn btn-primary" onClick={startAttack} disabled={running}>
              ▶ START ATTACK
            </button>
            <button className="btn btn-stop" onClick={stopAttack} disabled={!running}>
              ■ STOP
            </button>
            <button className="btn btn-clear" onClick={clearAll}>
              ✕ CLEAR
            </button>
          </div>
        </div>

        {/* Log */}
        <div className="log-wrap">
          <div className="log-header">Attack Log</div>
          <div className="log-body" ref={logBodyRef}>
            {logs.map((l, i) => (
              <div className="log-line" key={i}>
                <span className="log-time">[{l.t}]</span>
                <span className={`log-${l.type}`}>{l.msg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="disclaimer">
          <strong>⚠ EDUCATIONAL USE ONLY.</strong> This simulator runs entirely in the browser.
          No real network requests are made. Built to demonstrate brute force attack mechanics for cybersecurity learning.
        </div>
      </div>
    </>
  );
}
