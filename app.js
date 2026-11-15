/*ENGINE-START*/
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const F = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const add = (x, y) => F(x.n * y.d + y.n * x.d, x.d * y.d);
const sub = (x, y) => F(x.n * y.d - y.n * x.d, x.d * y.d);
const mul = (x, y) => F(x.n * y.n, x.d * y.d);
const div = (x, y) => F(x.n * y.d, x.d * y.n);
const isZero = x => x.n === 0;
const isOne = x => x.n === 1 && x.d === 1;
const abs = x => F(Math.abs(x.n), x.d);
const MINUS = "−";
const fh = x => {
  const neg = x.n < 0 ? MINUS : "";
  if (x.d === 1) return neg + Math.abs(x.n);
  return `${neg}<span class="fr"><i>${Math.abs(x.n)}</i><i>${x.d}</i></span>`;
};
const ft = x => (x.n < 0 ? "-" : "") + Math.abs(x.n) + (x.d === 1 ? "" : "/" + x.d);
const coefTxt = k => k.d === 1 ? String(k.n) : `(${k.n}/${k.d})`;

/* Row-reduce [A | I] to [I | A^-1], recording each row operation. */
function reduce(a, b, c, d) {
  let R1 = [F(a), F(b), F(1), F(0)], R2 = [F(c), F(d), F(0), F(1)];
  const snap = () => [R1.slice(), R2.slice()];
  const steps = [{ op: "Start with [ A | I ]", rows: snap() }];
  const scaleBy = (row, idx, name) => {
    const s = div(F(1), row[idx]);
    return { out: row.map(v => mul(v, s)), txt: isOne(s) ? null : `${name} → ${s.n === -1 && s.d === 1 ? MINUS : coefTxt(s).replace("-", MINUS)}${name}` };
  };
  if (isZero(R1[0])) { [R1, R2] = [R2, R1]; steps.push({ op: "R1 ↔ R2", rows: snap() }); }
  const s1 = scaleBy(R1, 0, "R1");
  if (s1.txt) { R1 = s1.out; steps.push({ op: s1.txt, rows: snap() }); }
  const k = R2[0];
  if (!isZero(k)) {
    const ak = abs(k);
    R2 = R2.map((v, i) => sub(v, mul(k, R1[i])));
    steps.push({ op: `R2 → R2 ${k.n < 0 ? "+" : MINUS} ${isOne(ak) ? "" : coefTxt(ak)}R1`, rows: snap() });
  }
  const s2 = scaleBy(R2, 1, "R2");
  if (s2.txt) { R2 = s2.out; steps.push({ op: s2.txt, rows: snap() }); }
  const m = R1[1];
  if (!isZero(m)) {
    const am = abs(m);
    R1 = R1.map((v, i) => sub(v, mul(m, R2[i])));
    steps.push({ op: `R1 → R1 ${m.n < 0 ? "+" : MINUS} ${isOne(am) ? "" : coefTxt(am)}R2`, rows: snap() });
  }
  return { steps, inv: [[R1[2], R1[3]], [R2[2], R2[3]]] };
}
/*ENGINE-END*/

const $ = id => document.getElementById(id);
const cells = (arr, sepEvery) => arr.map((x, i) => `<div${sepEvery && i % 4 === 2 ? ' class="sep"' : ''}>${fh(x)}</div>`).join("");
const aug = rows => `<div class="scroll"><div class="aug">${cells([...rows[0], ...rows[1]], true)}</div></div>`;
const mat = m => `<div class="mat">${cells([m[0][0], m[0][1], m[1][0], m[1][1]])}</div>`;
const vec = v => `<div class="vec">${cells(v)}</div>`;
const readInt = id => { const el = $(id), v = el.value.trim(), ok = /^-?\d+$/.test(v); el.classList.toggle("bad", !ok); return ok ? parseInt(v, 10) : NaN; };

let limitSel = "23", last = null;

function calc() {
  const a = readInt("a"), b = readInt("b"), c = readInt("c"), d = readInt("d"), r1 = readInt("r1"), r2 = readInt("r2");
  $("customRow").hidden = limitSel !== "custom";
  const limitN = limitSel === "custom" ? readInt("custom") : parseInt(limitSel, 10);
  const R = $("result"), W = $("work");
  last = null;

  if ([a, b, c, d, r1, r2, limitN].some(Number.isNaN)) {
    R.innerHTML = `<div class="err">Use whole numbers only, such as 3 or −2. No decimal points.</div>`;
    W.innerHTML = ""; return;
  }
  const det = a * d - b * c;
  let html = `<div class="step"><h3>Step 1<small>A · (x, y) = readings</small></h3>
    <div class="scroll"><div class="eq">${mat([[F(a), F(b)], [F(c), F(d)]])}<span class="op">·</span><div class="vec"><div class="vx">x</div><div class="vy">y</div></div><span class="op">=</span>${vec([F(r1), F(r2)])}</div></div>
    <p class="note">det(A) = ${a}·${d} ${MINUS} ${b}·${c} = <code>${det}</code></p></div>`;

  if (det === 0) {
    R.innerHTML = `<div class="err">The determinant is 0, so this matrix has no inverse. Both sensors measure the same mix of loads and cannot be told apart. Change the coefficients.</div>`;
    W.innerHTML = html; return;
  }
  const { steps, inv } = reduce(a, b, c, d);
  html += `<div class="step"><h3>Step 2<small>Row-reduce [ A | I ] until the left side is I</small></h3><div class="ops">` +
    steps.map(s => `<div class="opline"><code>${s.op}</code>${aug(s.rows)}</div>`).join("") + `</div><p class="note">The right side is A⁻¹.</p></div>`;
  const x = add(mul(inv[0][0], F(r1)), mul(inv[0][1], F(r2)));
  const y = add(mul(inv[1][0], F(r1)), mul(inv[1][1], F(r2)));
  html += `<div class="step"><h3>Step 3<small>Corrected loads = A⁻¹ · readings</small></h3>
    <div class="scroll"><div class="eq">${mat(inv)}<span class="op">·</span>${vec([F(r1), F(r2)])}<span class="op">=</span>${vec([x, y])}</div></div></div>`;
  const k1 = add(mul(F(a), x), mul(F(b), y)), k2 = add(mul(F(c), x), mul(F(d), y));
  html += `<div class="step"><h3>Check<small>Put x and y back in</small></h3>
    <div class="eq"><span class="op">${a}x + ${b}y = <code>${fh(k1)}</code></span><span class="op">${c}x + ${d}y = <code>${fh(k2)}</code></span></div></div>`;
  W.innerHTML = html;

  const total = add(x, y), limit = F(limitN), diff = sub(total, limit);
  let cls, status, msg;
  if (x.n < 0 || y.n < 0) { cls = "warn"; status = "Check input"; msg = "A corrected load is negative. Check the equations and readings."; }
  else if (diff.n > 0) { cls = "bad"; status = "Overweight"; msg = `Over by ${fh(diff)} kg. Remove items or pay the excess fee.`; }
  else if (total.n * 10 * limit.d >= limit.n * 9 * total.d) { cls = "warn"; status = "Near limit"; msg = `Within allowance, ${fh(abs(diff))} kg to spare.`; }
  else { cls = ""; status = "Within allowance"; msg = `${fh(abs(diff))} kg to spare.`; }

  const tv = total.n / total.d, max = Math.max(limitN * 1.25, tv, 1);
  const pct = Math.max(0, Math.min(tv / max, 1)) * 100, tickAt = limitN / max * 100;
  last = { sys: `${a}x${b < 0 ? "" : "+"}${b}y=${r1}, ${c}x${d < 0 ? "" : "+"}${d}y=${r2}`, total, limitN, cls, status };

  R.innerHTML = `<section class="tag ${cls}"><div class="tag-in">
    <div class="tag-top"><span class="label">Total baggage weight</span><span class="status">${status}</span></div>
    <div class="tag-main">
      <div class="num"><span class="gold">${fh(total)}</span><small>KG</small></div>
      <div class="msg">${msg}</div>
      <div class="gauge" role="img" aria-label="Weight against limit"><div class="fill" style="width:${pct}%"></div><div class="tick" style="left:${tickAt}%"></div></div>
      <div class="ticklabel"><span style="left:${Math.min(Math.max(tickAt, 8), 92)}%">limit ${limitN} kg</span></div>
    </div>
    <div class="perf"></div>
    <div class="stubs">
      <div class="stub sx"><span class="label">Platform 1 · <span class="vx">x</span></span><b>${fh(x)} kg</b></div>
      <div class="stub sy"><span class="label">Platform 2 · <span class="vy">y</span></span><b>${fh(y)} kg</b></div>
      <div class="stub sa"><span class="label">Allowance</span><b>${limitN} kg</b></div>
      <div class="stub ss"><span class="label">${diff.n > 0 ? "Excess" : "Spare"}</span><b>${fh(abs(diff))} kg</b></div>
    </div>
    <div class="tag-actions"><button class="btn" type="button" id="save">Save weighing</button></div>
  </div></section>`;
}

/* Weigh log, kept in this browser only */
const KEY = "bms-log";
const loadLog = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
const saveLog = l => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} };
let log = loadLog();
function renderLog() {
  $("log").innerHTML = log.map((e, i) => `<li>
    <span class="w">${fh(e.total)} kg</span>
    <span class="pill ${e.cls}">${e.status}</span>
    <span class="meta">limit ${e.limitN} kg · ${e.sys} · ${e.time}</span>
    <button class="x" type="button" data-del="${i}" aria-label="Remove weighing">Remove</button></li>`).join("");
  $("logEmpty").hidden = log.length > 0;
  $("clearLog").hidden = log.length === 0;
}
$("result").addEventListener("click", ev => {
  if (ev.target.id !== "save" || !last) return;
  const t = new Date();
  log = [{ ...last, time: t.toLocaleDateString([], { day: "numeric", month: "short" }) + " " + t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...log].slice(0, 20);
  saveLog(log); renderLog();
  ev.target.textContent = "Saved"; setTimeout(() => { if (ev.target.isConnected) ev.target.textContent = "Save weighing"; }, 1200);
});
$("log").addEventListener("click", ev => {
  const i = ev.target.dataset.del; if (i === undefined) return;
  log.splice(+i, 1); saveLog(log); renderLog();
});
$("clearLog").onclick = () => { log = []; saveLog(log); renderLog(); };

$("samples").addEventListener("click", ev => {
  const btn = ev.target.closest("[data-s]"); if (!btn) return;
  ["a", "b", "r1", "c", "d", "r2"].forEach((id, i) => $(id).value = btn.dataset.s.split(",")[i]);
  calc();
});
$("limits").addEventListener("click", ev => {
  const l = ev.target.dataset.l; if (!l) return;
  limitSel = l;
  document.querySelectorAll("#limits .chip").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.l === l)));
  calc();
});
document.querySelectorAll("input").forEach(el => el.addEventListener("input", calc));
renderLog(); calc();
