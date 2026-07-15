'use client';

import { useEffect, ReactNode, useState } from 'react';

const styles = `
  :root{
    --bg:#0E1117; --surface:#161B22; --surface2:#21262D; --line:#30363D;
    --text:#E9ECF1; --text-muted:#9AA0AA; --text-faint:#6E7681;
    --accent-action:#A855F7; --accent-info:#FF4D9D;
    --accent-soft:rgba(168, 85, 247, 0.14);
    --r:16px;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{
    background:var(--bg); color:var(--text);
    font-family:'Inter',system-ui,sans-serif; font-size:15px; line-height:1.6;
    -webkit-font-smoothing:antialiased; padding:0 0 80px;
  }
  .wrap{max-width:1060px; margin:0 auto; padding:0 28px}
  .mono{font-family:monospace}
  h1,h2,h3{font-family:'Fraunces',Georgia,serif; font-weight:700; line-height:1.1; letter-spacing:-0.5px}
  .eyebrow{font-family:'Inter',system-ui,sans-serif; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:var(--text-muted); font-weight:600}
  .mast{border-bottom:1px solid rgba(48, 54, 61, 0.5); padding:54px 0 40px; margin-bottom:0}
  .mast .tag{display:inline-block; border:1px solid var(--accent-action); color:var(--accent-action); font-family:'Inter',system-ui,sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; padding:6px 12px; border-radius:20px; margin-bottom:22px; font-weight:600}
  .mast h1{font-size:clamp(38px,6vw,66px); font-weight:700}
  .mast h1 .em{color:var(--accent-info); font-style:normal}
  .mast .sub{margin-top:16px; color:var(--text-muted); max-width:60ch; font-size:15px}
  .basis{margin-top:20px; font-family:'Inter',system-ui,sans-serif; font-size:12px; color:var(--text-muted); letter-spacing:0.02em}
  section{padding:48px 0; border-bottom:1px solid rgba(48, 54, 61, 0.3)}
  section:last-of-type{border-bottom:none}
  .sec-head{display:flex; align-items:baseline; gap:16px; margin-bottom:28px}
  .sec-head .n{font-family:'Inter',system-ui,sans-serif; font-size:12px; color:var(--accent-action); letter-spacing:0.1em; padding-top:6px; font-weight:600}
  .sec-head h2{font-size:clamp(24px,3.4vw,34px); letter-spacing:-0.4px}
  .sec-head .lead{color:var(--text-muted); font-size:15px; margin-top:6px; max-width:64ch}
  .legend{display:flex; flex-wrap:wrap; gap:10px; margin:0 0 6px}
  .chip{display:flex; align-items:center; gap:9px; background:transparent; border:1px solid rgba(48, 54, 61, 0.8); border-radius:24px; padding:8px 15px 8px 12px; font-size:13px}
  .dot{width:11px;height:11px;border-radius:50%;flex:none}
  .dot.matt{background:var(--accent-action)} .dot.edgar{background:#10B981} .dot.partner{background:var(--accent-info)}
  .chip b{font-weight:600} .chip span{color:var(--text-muted)}
  .panel{background:rgba(22, 27, 34, 0.5); border:1px solid rgba(48, 54, 61, 0.6); border-radius:var(--r); padding:28px}
  .controls{display:grid; grid-template-columns:1fr 1fr; gap:26px 40px; margin-bottom:8px}
  @media(max-width:720px){.controls{grid-template-columns:1fr}}
  .ctrl label{display:flex; justify-content:space-between; align-items:baseline; font-family:'Inter',system-ui,sans-serif; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-muted); margin-bottom:12px; font-weight:600}
  .ctrl label .val{font-size:16px; color:var(--text); letter-spacing:0; font-weight:600}
  input[type=text]{background:rgba(22, 27, 34, 0.8); border:1px solid rgba(48, 54, 61, 0.8); color:var(--text); border-radius:8px; padding:10px 12px; font-family:'Inter',system-ui,sans-serif}
  input[type=range]{-webkit-appearance:none; appearance:none; width:100%; height:4px; background:rgba(48, 54, 61, 0.8); border-radius:4px; outline:none}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:var(--accent-action); cursor:pointer; border:none; box-shadow:0 0 8px rgba(168, 85, 247, 0.3)}
  input[type=range]::-moz-range-thumb{width:18px; height:18px; border-radius:50%; background:var(--accent-action); cursor:pointer; border:none}
  input[type=range]:focus-visible::-webkit-slider-thumb{box-shadow:0 0 12px rgba(168, 85, 247, 0.5)}
  .splitbar{display:flex; height:52px; border-radius:12px; overflow:hidden; margin:26px 0 10px; border:1px solid rgba(48, 54, 61, 0.6)}
  .splitbar .seg{display:flex; align-items:center; justify-content:center; font-family:'Inter',system-ui,sans-serif; font-size:12.5px; color:#0E1117; font-weight:600; transition:width .35s cubic-bezier(.4,0,.2,1); min-width:0; overflow:hidden; white-space:nowrap}
  .seg.partner{background:var(--accent-info)} .seg.matt{background:var(--accent-action)}
  .readout{background:transparent; border:1px solid rgba(168, 85, 247, 0.3); border-left:3px solid var(--accent-action); border-radius:10px; padding:16px 18px; margin-top:20px; font-size:14.5px; color:var(--text-muted)}
  .readout b{color:var(--text); font-weight:600}
  .wf-bar{display:flex; height:44px; border-radius:10px; overflow:hidden; border:1px solid rgba(48, 54, 61, 0.6); margin:8px 0 4px}
  .wf-bar .t{display:flex;align-items:center;justify-content:center; font-family:'Inter',system-ui,sans-serif; font-size:11.5px; font-weight:600; transition:width .35s ease; overflow:hidden; white-space:nowrap; color:#0E1117}
  .t.roc{background:#666D77; color:#0E1117}
  .t.pref{background:#8E9BB0; color:#0E1117}
  .t.split{background:linear-gradient(90deg,var(--accent-action) 0 65%, #10B981 65% 80%, var(--accent-info) 80% 100%)}
  .wf-legend{display:flex; flex-wrap:wrap; gap:18px; margin:14px 0 22px; font-size:12.5px; color:var(--text-muted)}
  .wf-legend .k{display:flex;align-items:center;gap:7px}
  .wf-legend .b{width:12px;height:12px;border-radius:3px}
  .earn{display:grid; grid-template-columns:repeat(3,1fr); gap:14px}
  @media(max-width:640px){.earn{grid-template-columns:1fr}}
  .earn-card{background:transparent; border:1px solid rgba(48, 54, 61, 0.6); border-radius:14px; padding:20px; border-top:2px solid}
  .earn-card.matt{border-top-color:var(--accent-action)} .earn-card.edgar{border-top-color:#10B981} .earn-card.partner{border-top-color:var(--accent-info)}
  .earn-card .who{font-family:'Inter',system-ui,sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-muted); font-weight:600}
  .earn-card .amt{font-family:'Fraunces',Georgia,serif; font-size:32px; margin:8px 0 4px; font-weight:700; letter-spacing:-0.3px}
  .earn-card.matt .amt{color:var(--accent-action)} .earn-card.edgar .amt{color:#10B981} .earn-card.partner .amt{color:var(--accent-info)}
  .earn-card .note{font-size:12.5px; color:var(--text-faint)}
  .struct-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:20px}
  @media(max-width:720px){.struct-grid{grid-template-columns:1fr}}
  .struct-card{background:transparent; border:1px solid rgba(48, 54, 61, 0.6); border-radius:14px; padding:28px}
  .struct-card h3{font-size:20px; margin-bottom:12px; color:var(--text); font-weight:700; letter-spacing:-0.3px}
  .struct-card .role{font-family:'Inter',system-ui,sans-serif; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-faint); margin-bottom:12px; font-weight:600}
  .struct-card ul{list-style:none; display:flex; flex-direction:column; gap:10px}
  .struct-card li{font-size:14px; color:var(--text-muted); padding-left:18px; position:relative}
  .struct-card li::before{content:'—'; position:absolute; left:0; color:var(--text-faint)}
  .struct-card li b{color:var(--text); font-weight:600}
  .partner-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:20px}
  @media(max-width:640px){.partner-grid{grid-template-columns:1fr}}
  .partner-card{background:transparent; border:1px solid rgba(48, 54, 61, 0.6); border-radius:14px; padding:24px; border-top:3px solid}
  .partner-card.matt{border-top-color:var(--accent-action)} .partner-card.edgar{border-top-color:#10B981} .partner-card.partner{border-top-color:var(--accent-info)} .partner-card.principle{border-top-color:var(--accent-action)}
  .partner-card .name{font-family:'Fraunces',Georgia,serif; font-size:20px; font-weight:700; margin-bottom:8px; letter-spacing:-0.3px}
  .partner-card .title{font-family:'Inter',system-ui,sans-serif; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-faint); margin-bottom:12px; font-weight:600}
  .partner-card ul{list-style:none; display:flex; flex-direction:column; gap:9px}
  .partner-card li{font-size:14px; color:var(--text-muted); padding-left:16px; position:relative}
  .partner-card li::before{content:'•'; position:absolute; left:2px}
  .partner-card.matt li::before{color:var(--accent-action)} .partner-card.edgar li::before{color:#10B981} .partner-card.partner li::before{color:var(--accent-info)} .partner-card.principle li::before{color:var(--accent-action)}
  .own-grid{display:grid; grid-template-columns:280px 1fr; gap:44px; align-items:center}
  @media(max-width:720px){.own-grid{grid-template-columns:1fr; gap:28px}}
  .pie{width:260px; height:260px; border-radius:50%; margin:0 auto; position:relative; background:conic-gradient(var(--accent-action) 0 65%, #10B981 65% 80%, var(--accent-info) 80% 100%)}
  .pie::after{content:''; position:absolute; inset:64px; border-radius:50%; background:var(--bg)}
  .pie .ctr{position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:1}
  .pie .ctr .t{font-family:'Inter',system-ui,sans-serif; font-size:10.5px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-faint); font-weight:600}
  .pie .ctr .s{font-family:'Fraunces',Georgia,serif; font-size:22px; color:var(--text); font-weight:700}
  .own-rows{display:flex; flex-direction:column; gap:2px}
  .own-row{display:flex; align-items:center; gap:14px; padding:16px 0; border-bottom:1px solid rgba(48, 54, 61, 0.4)}
  .own-row:last-child{border-bottom:none}
  .own-row .bar{width:6px; align-self:stretch; border-radius:3px; flex:none}
  .own-row .pct{font-family:'Fraunces',Georgia,serif; font-size:32px; width:80px; flex:none; font-weight:700; letter-spacing:-0.3px}
  .own-row .info b{font-weight:600; display:block; color:var(--text)}
  .own-row .info span{color:var(--text-muted); font-size:13px}
  .m .bar,.m .pct{background:none} .m .pct{color:var(--accent-action)} .m .bar{background:var(--accent-action)}
  .e .pct{color:#10B981} .e .bar{background:#10B981}
  .p .pct{color:var(--accent-info)} .p .bar{background:var(--accent-info)}
  .promote-note{margin-top:20px; background:transparent; border:1px solid rgba(168, 85, 247, 0.2); border-left:3px solid var(--accent-action); border-radius:10px; padding:16px 18px; font-size:13.5px; color:var(--text-muted)}
  .promote-note b{color:var(--accent-action)}
  .cvl{display:grid; grid-template-columns:1fr 1fr; gap:18px}
  @media(max-width:640px){.cvl{grid-template-columns:1fr}}
  .cvl-col{background:transparent; border:1px solid rgba(48, 54, 61, 0.6); border-radius:var(--r); padding:28px; border-top:2px solid}
  .cvl-col.control{border-top-color:var(--accent-action)} .cvl-col.liability{border-top-color:var(--accent-info)}
  .cvl-col h3{font-size:20px; margin-bottom:8px; color:var(--text); font-weight:700; letter-spacing:-0.3px}
  .cvl-col .sub{font-family:'Inter',system-ui,sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:16px; font-weight:600}
  .cvl-col.control .sub{color:var(--accent-action)} .cvl-col.liability .sub{color:var(--accent-info)}
  .cvl-col ul{list-style:none; display:flex; flex-direction:column; gap:12px}
  .cvl-col li{font-size:14px; color:var(--text-muted); padding-left:20px; position:relative}
  .cvl-col li::before{content:'✓'; position:absolute; left:0}
  .cvl-col.control li::before{color:var(--accent-action)} .cvl-col.liability li::before{color:var(--accent-info)}
  .cvl-col li b{color:var(--text); font-weight:600}
  .calc-grid{display:grid; grid-template-columns:1fr 1fr; gap:28px; margin-top:20px}
  @media(max-width:640px){.calc-grid{grid-template-columns:1fr}}
  .calc-card{background:transparent; border:1px solid rgba(48, 54, 61, 0.6); border-radius:var(--r); padding:28px}
  .calc-card h3{font-size:20px; margin-bottom:12px; color:var(--text); font-weight:700; letter-spacing:-0.3px}
  .calc-card .label{font-family:'Inter',system-ui,sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--accent-action); margin-bottom:16px; display:block; font-weight:600}
  .calc-row{display:flex; justify-content:space-between; align-items:baseline; padding:14px 0; border-bottom:1px solid rgba(48, 54, 61, 0.4)}
  .calc-row:last-child{border-bottom:none}
  .calc-row .label{flex:1; color:var(--text-muted); font-size:14px}
  .calc-row .value{font-family:'Fraunces',Georgia,serif; font-size:24px; font-weight:700; color:var(--text); letter-spacing:-0.2px}
  .calc-row .multiple{font-size:18px; color:var(--accent-info)}
  .stack{display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:16px}
  @media(max-width:640px){.stack{grid-template-columns:1fr}}
  .stack-item{background:transparent; border:1px solid rgba(48, 54, 61, 0.6); border-top:2px solid var(--accent-action); border-radius:12px; padding:20px}
  .stack-item .pct{font-family:'Fraunces',Georgia,serif; font-size:40px; color:var(--accent-action); line-height:1; font-weight:700; letter-spacing:-0.4px}
  .stack-item .lbl{font-weight:600; margin-top:10px; color:var(--text)}
  .stack-item .desc{color:var(--text-muted); font-size:13px; margin-top:6px}
  .stack-note{background:rgba(168, 85, 247, 0.08); border:1px solid rgba(168, 85, 247, 0.2); border-radius:12px; padding:16px 20px; font-size:14px; color:var(--text-muted)}
  .stack-note .mono{color:var(--accent-action); font-weight:600}
  .devfee{margin-top:14px; color:var(--text-muted); font-size:13.5px}
  .devfee b{color:var(--text)}
  footer{padding:40px 0 0; color:var(--text-faint); font-size:12.5px; line-height:1.7}
  footer .mono{color:var(--text-muted)}
  button{background:var(--accent-action); color:white; border:none; padding:12px 20px; border-radius:10px; font-family:'Inter',system-ui,sans-serif; font-size:14px; font-weight:600; cursor:pointer; margin-top:16px; transition:opacity 0.2s}
  button:hover{opacity:0.85}
  button.secondary{background:transparent; color:var(--text); border:1px solid rgba(48, 54, 61, 0.8); transition:all 0.2s}
  button.secondary:hover{border-color:rgba(48, 54, 61, 1); background:rgba(48, 54, 61, 0.2)}
  @media(prefers-reduced-motion:reduce){*{transition:none!important}}
`;

interface CapitalEngineCoreProps {
  token?: string;
  isPublic?: boolean;
  investorEmail?: string;
  scenarioName?: string;
  onScenarioChange?: (scenario: any) => void;
}

export default function CapitalEngineCore({
  token,
  isPublic = false,
  investorEmail,
  scenarioName,
  onScenarioChange,
}: CapitalEngineCoreProps): ReactNode {
  const [showReturns, setShowReturns] = useState(false);
  const [returns, setReturns] = useState<any>({ pathA: null, pathB: null });
  const [locAmount, setLocAmount] = useState(500000);
  const [investAmount, setInvestAmount] = useState(500000);
  const [cpReturns, setCpReturns] = useState<any>(null);

  useEffect(() => {
    const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
    const el = (id: string) => document.getElementById(id) as HTMLInputElement | HTMLElement | null;
    const totalCap = el('totalCap') as HTMLInputElement;
    const partnerPct = el('partnerPct') as HTMLInputElement;
    const prefRate = el('prefRate') as HTMLInputElement;
    const horizon = el('horizon') as HTMLInputElement;
    const exitMultiple = el('exitMultiple') as HTMLInputElement;
    const distCash = el('distCash') as HTMLInputElement;
    const SPLIT = { matt: 0.65, edgar: 0.15, partner: 0.2 };

    function updateCapitalPartnerReturns() {
      if (!horizon || !totalCap || !exitMultiple) return;

      const hz = +horizon.value;
      const total = +totalCap.value;
      const exitMult = +exitMultiple.value;
      const businessValue = total * exitMult;

      const calcLPSecurity = (amount: number) => {
        return 5 + ((amount - 350000) / 150000) * 15;
      };

      const locSec = calcLPSecurity(locAmount);
      const pathAIntAccrual = locAmount * 0.20;
      const pathATotalInt = pathAIntAccrual * hz;
      const pathATotalRet = locAmount + pathATotalInt;
      const pathAMult = pathATotalRet / locAmount;

      const investSec = calcLPSecurity(investAmount);
      const pathBPrefAccr = investAmount * 0.10;
      const pathBTotalPref = pathBPrefAccr * hz;
      const pathBEquityVal = (businessValue - total) * (investSec / 100);
      const pathBTotalRet = investAmount + pathBTotalPref + pathBEquityVal;

      setCpReturns({
        hz,
        pathA: {
          amount: locAmount,
          security: locSec.toFixed(1),
          interest: Math.round(pathATotalInt),
          total: Math.round(pathATotalRet),
          multiple: pathAMult.toFixed(2),
        },
        pathB: {
          amount: investAmount,
          equity: investSec.toFixed(1),
          pref: Math.round(pathBTotalPref),
          equityValue: Math.round(pathBEquityVal),
          total: Math.round(pathBTotalRet),
        },
      });
    }

    function render() {
      const total = +totalCap.value;
      const pPct = +partnerPct.value / 100;
      const pr = +prefRate.value / 100;
      const hz = +horizon.value;
      const dc = +distCash.value;
      const exitMult = exitMultiple ? +exitMultiple.value : 2.5;
      const pCap = total * pPct;
      const mCap = total * (1 - pPct);

      updateCapitalPartnerReturns();

      const tcv = el('tcVal');
      const ppv = el('ppVal');
      const prv = el('prVal');
      const hzv = el('hzVal');
      const exmv = el('exitMultVal');
      const pa = el('partnerAmt');
      const ma = el('mattAmt');

      if (tcv) tcv.textContent = fmt(total);
      if (ppv) ppv.textContent = (pPct * 100).toFixed(0) + '%';
      if (prv) prv.textContent = (pr * 100).toFixed(0) + '%';
      if (hzv) hzv.textContent = hz + ' years';
      if (exmv) exmv.textContent = exitMult.toFixed(1) + 'x';
      if (pa) pa.textContent = fmt(pCap);
      if (ma) ma.textContent = fmt(mCap);

      // Update Section 04: Credit Line + Roy Model
      const totalCapSlider = el('totalCapSlider') as HTMLInputElement;
      const locSlider = el('locSlider') as HTMLInputElement;
      if (totalCapSlider && locSlider) {
        const totalDealSize = +totalCapSlider.value;
        const locAmount = Math.min(+locSlider.value, totalDealSize);
        const royContrib = totalDealSize - locAmount;
        const calcLPSec = (amt: number) => 5 + ((amt - 350000) / 150000) * 15;
        const lpSec = calcLPSec(locAmount);

        const tcv = el('totalCapVal');
        const lv = el('locVal');
        const la = el('locAmt');
        const ls = el('locSec');
        const ra = el('royAmt');
        const ta = el('totalAmt');
        const csr = el('capStackReadout');

        if (tcv) tcv.textContent = fmt(totalDealSize);
        if (lv) lv.textContent = fmt(locAmount);
        if (la) la.textContent = fmt(locAmount);
        if (ls) ls.textContent = lpSec.toFixed(1) + '% LP security';
        if (ra) ra.textContent = fmt(royContrib);
        if (ta) ta.textContent = fmt(totalDealSize);

        if (csr) {
          let stackText = `Capital Partner secures $${(locAmount / 1000).toFixed(0)}k LOC (backed by ${lpSec.toFixed(1)}% LP equity). Roy contributes $${(royContrib / 1000).toFixed(0)}k: $${(royContrib / 2 / 1000).toFixed(0)}k to LP, $${(royContrib / 2 / 1000).toFixed(0)}k to GP (funds the GP).`;
          csr.innerHTML = stackText;
        }

        // Update equity release readout
        const err = el('equityReleaseReadout');
        if (err) {
          const mattGain = lpSec / 2;
          const edgarGain = lpSec / 2;
          err.innerHTML = `When the Capital Partner's $${(locAmount / 1000).toFixed(0)}k loan is fully repaid with interest, the <b>${lpSec.toFixed(1)}% LP equity</b> that secured the debt converts to GP equity. This equity distributes 50-50: <b>${mattGain.toFixed(1)}% to Matt Roy</b> and <b>${edgarGain.toFixed(1)}% to Edgar Delgado</b> as GP members.`;
        }
      }


      const roc = Math.min(dc, total);
      const afterRoc = Math.max(0, dc - total);
      const annualPref = pCap * pr;
      const totalPrefAccrual = annualPref * hz;
      const cappedPref = Math.min(totalPrefAccrual, pCap * 1.75);
      const prefPayable = Math.min(afterRoc, cappedPref);
      const split = Math.max(0, afterRoc - prefPayable);

      const dcVal = el('dcVal');
      if (dcVal) dcVal.textContent = fmt(dc);

      const pctOf = (x: number) => (dc > 0 ? (x / dc) * 100 : 0);

      const wfRoc = el('wfRoc');
      const wfPref = el('wfPref');
      const wfSplit = el('wfSplit');

      if (wfRoc) {
        wfRoc.style.width = pctOf(roc) + '%';
        wfRoc.textContent = pctOf(roc) > 12 ? 'Capital ' + fmt(roc) : '';
      }
      if (wfPref) {
        wfPref.style.width = pctOf(prefPayable) + '%';
        wfPref.textContent = pctOf(prefPayable) > 12 ? 'Pref ' + fmt(prefPayable) : '';
      }
      if (wfSplit) wfSplit.style.width = pctOf(split) + '%';

      const mattTot = roc * (1 - pPct) + prefPayable * (1 - pPct) + split * SPLIT.matt;
      const partnerTot = roc * pPct + prefPayable * pPct + split * SPLIT.partner;
      const edgarTot = split * SPLIT.edgar;

      const earnMatt = el('earnMatt');
      const earnEdgar = el('earnEdgar');
      const earnPartner = el('earnPartner');

      if (earnMatt) earnMatt.textContent = fmt(mattTot);
      if (earnEdgar) earnEdgar.textContent = fmt(edgarTot);
      if (earnPartner) earnPartner.textContent = fmt(partnerTot);

      let w = '';
      if (dc <= 0) {
        w = `Nothing distributed yet.`;
      } else if (afterRoc <= 0) {
        w = `Everyone's still getting their <b>capital back</b> — no one's made a profit yet. The partner's downside is protected first.`;
      } else if (split <= 0) {
        w = `Capital's returned; now the <b>${(pr * 100).toFixed(0)}% preferred return</b> is being paid (capped at ${fmt(cappedPref)} over the ${hz}-year horizon). Still no equity split until pref is satisfied.`;
      } else {
        w = `Capital and pref are covered. Everything above is real profit, split <b>65/15/20</b>. Your operating partner's ${fmt(edgarTot)} is <b>pure equity upside</b> — they put in no cash, so 100% of their return rides on operational excellence. That's the alignment.`;
      }
      const wfReadout = el('wfReadout');
      if (wfReadout) wfReadout.innerHTML = w;
    }

    const totalCapSlider = el('totalCapSlider') as HTMLInputElement;
    const locSlider = el('locSlider') as HTMLInputElement;

    [totalCap, totalCapSlider, locSlider, partnerPct, prefRate, horizon, exitMultiple, distCash].forEach((s) => {
      if (s) s.addEventListener('input', render);
    });
    render();
  }, [locAmount, investAmount]);

  const calculateReturns = () => {
    const totalCapEl = document.getElementById('totalCap') as HTMLInputElement;
    const horizonEl = document.getElementById('horizon') as HTMLInputElement;
    const exitMultEl = document.getElementById('exitMultiple') as HTMLInputElement;

    const total = +totalCapEl.value;
    const hz = +horizonEl.value;
    const exitMult = +exitMultEl.value;
    const businessValue = total * exitMult;

    // Path A: 20% return + full exit (0% residual equity)
    const pathACapitalReturned = total;
    const pathAPref = total * 0.20 * hz; // 20% per year
    const pathATotalReturn = pathACapitalReturned + pathAPref;
    const pathAMultiple = pathATotalReturn / total;

    // Path B: 8% return + equity stake
    const pathBCapitalReturned = total;
    const pathBPref = total * 0.08 * hz; // 8% per year
    const pathBEquityPct = 12;
    const pathBEquityValue = (businessValue - total) * (pathBEquityPct / 100);
    const pathBTotalReturn = pathBCapitalReturned + pathBPref + pathBEquityValue;

    setReturns({
      pathA: {
        capital: pathACapitalReturned,
        pref: Math.round(pathAPref),
        total: Math.round(pathATotalReturn),
        multiple: pathAMultiple.toFixed(2),
        residualEquity: 0,
      },
      pathB: {
        capital: pathBCapitalReturned,
        pref: Math.round(pathBPref),
        equity: pathBEquityPct,
        total: Math.round(pathBTotalReturn),
      },
    });
    setShowReturns(true);
  };

  const calculateCapitalPartnerReturns = () => {
    const horizonEl = document.getElementById('horizon') as HTMLInputElement;
    const totalCapEl = document.getElementById('totalCap') as HTMLInputElement;
    const exitMultEl = document.getElementById('exitMultiple') as HTMLInputElement;

    const hz = +horizonEl.value;
    const totalCap = +totalCapEl.value;
    const exitMult = +(exitMultEl?.value || 2.5);
    const businessValue = totalCap * exitMult;

    // LP Security % calculation: 5% at $350k, 20% at $500k
    const calcLPSecurity = (amount: number) => {
      return 5 + ((amount - 350000) / 150000) * 15;
    };

    // Path A: Line of Credit (20% ROI, LP equity security)
    const locSecurity = calcLPSecurity(locAmount);
    const pathAIntAccrual = locAmount * 0.20; // Annual 20% simple interest
    const pathATotalInterest = pathAIntAccrual * hz;
    const pathATotalReturn = locAmount + pathATotalInterest;
    const pathAMultiple = pathATotalReturn / locAmount;

    // Path B: Direct Investment (10% pref, LP equity)
    const investSecurity = calcLPSecurity(investAmount);
    const pathBPrefAccrual = investAmount * 0.10; // Annual 10% pref
    const pathBTotalPref = pathBPrefAccrual * hz;
    const pathBEquityValue = (businessValue - totalCap) * (investSecurity / 100);
    const pathBTotalReturn = investAmount + pathBTotalPref + pathBEquityValue;

    return {
      pathA: {
        amount: locAmount,
        security: locSecurity.toFixed(1),
        interest: Math.round(pathATotalInterest),
        total: Math.round(pathATotalReturn),
        multiple: pathAMultiple.toFixed(2),
      },
      pathB: {
        amount: investAmount,
        equity: investSecurity.toFixed(1),
        pref: Math.round(pathBTotalPref),
        equityValue: Math.round(pathBEquityValue),
        total: Math.round(pathBTotalReturn),
      },
    };
  };

  return (
    <>
      <style>{styles}</style>
      <div className="mast">
        <div className="wrap">
          <span className="tag">Illustrative · discussion draft</span>
          <h1>Capital Modeling <span className="em">Engine</span></h1>
          <p className="sub">One master model for entity structure, equity splits, investor returns, and instrument design. Move a slider anywhere, everything recalculates.</p>
          <p className="basis">ALL SLIDERS SHARE ONE STATE · FIGURES ARE STRUCTURAL, NOT COMMITTED · SCENARIOS ARE SHAREABLE VIA URL</p>
        </div>
      </div>

      <div className="wrap">
        {/* LEGEND */}
        <section id="legend" style={{paddingTop: '36px'}}>
          <div className="legend">
            <div className="chip"><span className="dot matt"></span><b>Principle / You</b>&nbsp;<span>— IP licensing & brand control</span></div>
            <div className="chip"><span className="dot matt"></span><b>Roy Partner</b>&nbsp;<span>— control + senior economics</span></div>
            <div className="chip"><span className="dot edgar"></span><b>Operating Partner</b>&nbsp;<span>— operations + liability + earned equity</span></div>
            <div className="chip"><span className="dot partner"></span><b>Capital Partner</b>&nbsp;<span>— secured credit line, economics only</span></div>
          </div>
        </section>

        {/* ENTITY ARCHITECTURE - THREE ENTITIES */}
        <section id="structure">
          <div className="sec-head">
            <span className="n">01</span>
            <div>
              <h2>The three-entity structure</h2>
              <p className="lead">IP licensing in Texas · Capital pooling in Mexico · Operations in Mexico. Ownership and control separated from operational liability.</p>
            </div>
          </div>
          <div className="struct-grid">
            <div className="struct-card">
              <div className="role">Texas · LLC</div>
              <h3>Principle</h3>
              <ul>
                <li><b>Brand & Systems IP Licensing</b></li>
                <li>Owns the name, playbook, recipes, tech</li>
                <li>Licenses to HoldCo</li>
                <li>Isolated from operational risk</li>
              </ul>
            </div>
            <div className="struct-card">
              <div className="role">Mexico · SA de CV</div>
              <h3>HoldCo</h3>
              <ul>
                <li><b>Capital pooling & distributions</b></li>
                <li>Cap table, owns OpCo ~99.99%</li>
                <li><b>Manager:</b> You (reserved matters + board)</li>
                <li>Receives IP licensing from Principle</li>
              </ul>
            </div>
            <div className="struct-card">
              <div className="role">Mexico · SA de CV</div>
              <h3>OpCo</h3>
              <ul>
                <li><b>Restaurant operations</b></li>
                <li>Staff, permits, leases, suppliers</li>
                <li><b>Principal:</b> Operating Partner</li>
                <li>Tax, labor, regulatory liability</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CAPITAL FLOW DIAGRAMS - TWO SCENARIOS */}
        <section id="capital-flow">
          <div className="sec-head">
            <span className="n">02</span>
            <div>
              <h2>Capital flow: two return structures</h2>
              <p className="lead">Two capital structures with different distribution waterfalls. Choose Path A (10% equity investment) or Path B (20% LOC with converted equity).</p>
            </div>
          </div>

          {/* PATH A: 10% PREF + PROMOTE */}
          <div style={{marginBottom: '48px'}}>
            <h3 style={{fontSize: '18px', marginBottom: '16px', color: 'var(--text)'}}>Path A: Equity Investment (10% Pref + 66% Promote to Operators)</h3>
            <div style={{background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '14px', padding: '24px', color: 'var(--text-muted)'}}>
              <p><strong>Capital Flow:</strong> Matt and Capital Partner both invest capital through HoldCo. Capital returns pro-rata, then 10% preferred return (capped at 1.75x). Remaining upside: 66% to operators (GP), 34% split pro-rata to capital investors.</p>
              <p style={{marginTop: '12px', fontSize: '13px', color: 'var(--text-faint)'}}>Distribution Waterfall: Return of Capital → Preferred Return → Promote Split → Final Distributions. Capital Partner retains equity but at reduced stake due to 66% promote to operators (Edgar gets 100% of operator equity).</p>
            </div>
          </div>

          {/* PATH B: 20% LOC - COMING SOON */}
          <div>
            <h3 style={{fontSize: '18px', marginBottom: '16px', color: 'var(--text)'}}>Path B: Line of Credit (20% Interest → Equity Conversion)</h3>
            <div style={{background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '14px', padding: '24px', color: 'var(--text-muted)'}}>
              <p>Capital Partner provides $400-500k LOC @ 20% interest. After capital return and interest payments, the LP equity security backing the loan converts to GP equity, split 50-50 between Matt Roy and Edgar Delgado.</p>
              <p style={{marginTop: '12px', fontSize: '13px', color: 'var(--text-faint)'}}>Interactive diagram coming soon.</p>
            </div>
          </div>
        </section>

        {/* SCENARIO BUILDER */}

        {/* SCENARIO BUILDER */}
        <section id="scenario">
          <div className="sec-head">
            <span className="n">03</span>
            <div>
              <h2>Scenario configuration</h2>
              <p className="lead">Configure capital raise, returns, and horizon. Calculate Path A vs Path B scenarios to see how capital partner economics differ.</p>
            </div>
          </div>
          <div className="panel">
            <div className="controls">
              <div className="ctrl">
                <label>Deal Name</label>
                <input type="text" id="dealName" placeholder="e.g., Dinosaur Pizza" defaultValue="Dinosaur Pizza" style={{width: '100%', padding: '10px 12px', background: 'var(--surface2)', border: '1px solid var(--line)', color: 'var(--bone)', borderRadius: '8px'}} />
              </div>
              <div className="ctrl">
                <label>Capital Partner Name</label>
                <input type="text" id="partnerNameInput" placeholder="e.g., Fortress Capital" defaultValue="Capital Partner" style={{width: '100%', padding: '10px 12px', background: 'var(--surface2)', border: '1px solid var(--line)', color: 'var(--bone)', borderRadius: '8px'}} />
              </div>
            </div>
            <div className="controls">
              <div className="ctrl">
                <label>Total Capital Raise ($M) <span className="val mono" id="tcVal">$300,000</span></label>
                <input type="range" id="totalCap" min="50000" max="1000000" step="50000" defaultValue="300000" />
              </div>
              <div className="ctrl">
                <label>Capital Partner's Share <span className="val mono" id="ppVal">50%</span></label>
                <input type="range" id="partnerPct" min="0" max="100" step="5" defaultValue="50" />
              </div>
              <div className="ctrl">
                <label>Preferred Return (%/yr) <span className="val mono" id="prVal">12%</span></label>
                <input type="range" id="prefRate" min="8" max="20" step="1" defaultValue="12" />
              </div>
              <div className="ctrl">
                <label>Investment Horizon (Years) <span className="val mono" id="hzVal">5 years</span></label>
                <input type="range" id="horizon" min="2" max="10" step="1" defaultValue="5" />
              </div>
              <div className="ctrl">
                <label>Hard Cap Multiple <span className="val mono">1.75x</span></label>
                <input type="range" min="1.5" max="2.5" step="0.25" defaultValue="1.75" disabled style={{opacity: 0.5}} />
              </div>
              <div className="ctrl">
                <label>Exit Multiple (Business Value) <span className="val mono" id="exitMultVal">2.5x</span></label>
                <input type="range" id="exitMultiple" min="1.5" max="5" step="0.5" defaultValue="2.5" />
              </div>
            </div>
            <button onClick={calculateReturns}>Calculate Returns</button>
            <button className="secondary" onClick={() => {
              const dataStr = JSON.stringify({
                deal: (document.getElementById('dealName') as HTMLInputElement)?.value,
                partner: (document.getElementById('partnerNameInput') as HTMLInputElement)?.value,
                totalCap: (document.getElementById('totalCap') as HTMLInputElement)?.value,
                partnerPct: (document.getElementById('partnerPct') as HTMLInputElement)?.value,
                prefRate: (document.getElementById('prefRate') as HTMLInputElement)?.value,
                horizon: (document.getElementById('horizon') as HTMLInputElement)?.value,
              }, null, 2);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `scenario-${Date.now()}.json`;
              a.click();
            }}>Export JSON</button>
          </div>
        </section>

        {/* SCENARIO BUILDER */}
        <section id="scenario">
          <div className="sec-head">
            <span className="n">03</span>
            <div>
              <h2>Scenario configuration</h2>
              <p className="lead">Configure capital raise, returns, and horizon. Calculate Path A vs Path B scenarios to see how capital partner economics differ.</p>
            </div>
          </div>
          <div className="panel">
            <div className="controls">
              <div className="ctrl">
                <label>Deal Name</label>
                <input type="text" id="dealName" placeholder="e.g., Dinosaur Pizza" defaultValue="Dinosaur Pizza" style={{width: '100%', padding: '10px 12px', background: 'var(--surface2)', border: '1px solid var(--line)', color: 'var(--bone)', borderRadius: '8px'}} />
              </div>
              <div className="ctrl">
                <label>Capital Partner Name</label>
                <input type="text" id="partnerNameInput" placeholder="e.g., Fortress Capital" defaultValue="Capital Partner" style={{width: '100%', padding: '10px 12px', background: 'var(--surface2)', border: '1px solid var(--line)', color: 'var(--bone)', borderRadius: '8px'}} />
              </div>
            </div>
            <div className="controls">
              <div className="ctrl">
                <label>Total Capital Raise ($M) <span className="val mono" id="tcVal">$300,000</span></label>
                <input type="range" id="totalCap" min="50000" max="1000000" step="50000" defaultValue="300000" />
              </div>
              <div className="ctrl">
                <label>Capital Partner's Share <span className="val mono" id="ppVal">50%</span></label>
                <input type="range" id="partnerPct" min="0" max="100" step="5" defaultValue="50" />
              </div>
              <div className="ctrl">
                <label>Preferred Return (%/yr) <span className="val mono" id="prVal">12%</span></label>
                <input type="range" id="prefRate" min="8" max="20" step="1" defaultValue="12" />
              </div>
              <div className="ctrl">
                <label>Investment Horizon (Years) <span className="val mono" id="hzVal">5 years</span></label>
                <input type="range" id="horizon" min="2" max="10" step="1" defaultValue="5" />
              </div>
              <div className="ctrl">
                <label>Hard Cap Multiple <span className="val mono">1.75x</span></label>
                <input type="range" min="1.5" max="2.5" step="0.25" defaultValue="1.75" disabled style={{opacity: 0.5}} />
              </div>
              <div className="ctrl">
                <label>Exit Multiple (Business Value) <span className="val mono" id="exitMultVal">2.5x</span></label>
                <input type="range" id="exitMultiple" min="1.5" max="5" step="0.5" defaultValue="2.5" />
              </div>
            </div>
            <button onClick={calculateReturns}>Calculate Returns</button>
            <button className="secondary" onClick={() => {
              const dataStr = JSON.stringify({
                deal: (document.getElementById('dealName') as HTMLInputElement)?.value,
                partner: (document.getElementById('partnerNameInput') as HTMLInputElement)?.value,
                totalCap: (document.getElementById('totalCap') as HTMLInputElement)?.value,
                partnerPct: (document.getElementById('partnerPct') as HTMLInputElement)?.value,
                prefRate: (document.getElementById('prefRate') as HTMLInputElement)?.value,
                horizon: (document.getElementById('horizon') as HTMLInputElement)?.value,
              }, null, 2);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `scenario-${Date.now()}.json`;
              a.click();
            }}>Save to Airtable</button>
          </div>
        </section>

        {/* PATH A vs PATH B CALCULATOR - SHOW WHEN CALCULATED */}
        {showReturns && returns.pathA && returns.pathB && (
          <section id="returns">
            <div className="sec-head">
              <span className="n">04</span>
              <div>
                <h2>Path A vs Path B</h2>
                <p className="lead">Capital partner return scenarios: full return protection with no equity, or moderate return with significant equity upside.</p>
              </div>
            </div>
            <div className="calc-grid">
              <div className="calc-card">
                <span className="label">Path A: 20% Return + Full Exit</span>
                <h3>Return-Protected</h3>
                <div className="calc-row">
                  <div className="label">Capital Returned</div>
                  <div className="value">${(returns.pathA.capital / 1000).toFixed(0)}k</div>
                </div>
                <div className="calc-row">
                  <div className="label">Preferred Return</div>
                  <div className="value">${(returns.pathA.pref / 1000).toFixed(0)}k</div>
                </div>
                <div className="calc-row">
                  <div className="label">Total Return</div>
                  <div className="value">${(returns.pathA.total / 1000).toFixed(0)}k</div>
                </div>
                <div className="calc-row">
                  <div className="label">Multiple</div>
                  <div className="multiple">{returns.pathA.multiple}x</div>
                </div>
                <div className="calc-row">
                  <div className="label">Residual Equity</div>
                  <div className="value">{returns.pathA.residualEquity}%</div>
                </div>
              </div>

              <div className="calc-card">
                <span className="label">Path B: 8% Return + Equity Stake</span>
                <h3>Growth + Upside</h3>
                <div className="calc-row">
                  <div className="label">Capital Returned</div>
                  <div className="value">${(returns.pathB.capital / 1000).toFixed(0)}k</div>
                </div>
                <div className="calc-row">
                  <div className="label">Preferred Return</div>
                  <div className="value">${(returns.pathB.pref / 1000).toFixed(0)}k</div>
                </div>
                <div className="calc-row">
                  <div className="label">Capital Partner Equity</div>
                  <div className="value">{returns.pathB.equity}%</div>
                </div>
                <div className="calc-row">
                  <div className="label">Total Return (at exit)</div>
                  <div className="value">${(returns.pathB.total / 1000).toFixed(0)}k+</div>
                </div>
                <div className="calc-row">
                  <div className="label">Upside Potential</div>
                  <div style={{color: 'var(--partner)'}}>Plus equity growth</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CAPITAL SPLIT - CREDIT LINE + ROY MODEL */}
        <section id="capital">
          <div className="sec-head">
            <span className="n">05</span>
            <div>
              <h2>Whose money is in the deal</h2>
              <p className="lead">Capital Partner secures a line of credit (backed by LP equity). Roy contributes the remaining capital, split 50/50 between LP and GP.</p>
            </div>
          </div>
          <div className="panel">
            <div className="controls">
              <div className="ctrl">
                <label>Total Capital Raise <span className="val mono" id="totalCapVal">$500,000</span></label>
                <input type="range" id="totalCapSlider" min="300000" max="1000000" step="25000" defaultValue="500000" />
              </div>
              <div className="ctrl">
                <label>Credit Line Amount (secured LOC) <span className="val mono" id="locVal">$500,000</span></label>
                <input type="range" id="locSlider" min="350000" max="500000" step="10000" defaultValue="500000" />
              </div>
            </div>

            <div style={{ marginTop: '26px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '18px' }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', fontFamily: "'IBM Plex Mono',monospace", textTransform: 'uppercase', color: 'var(--bone-faint)', letterSpacing: '0.08em', marginBottom: '8px' }}>Capital Partner LOC</div>
                  <div style={{ fontSize: '22px', fontFamily: "'Fraunces',serif", color: 'var(--partner)', fontWeight: 600 }} id="locAmt">$500,000</div>
                  <div style={{ fontSize: '12px', color: 'var(--bone-faint)', marginTop: '6px' }} id="locSec">20% LP security</div>
                </div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', fontFamily: "'IBM Plex Mono',monospace", textTransform: 'uppercase', color: 'var(--bone-faint)', letterSpacing: '0.08em', marginBottom: '8px' }}>Roy Contribution</div>
                  <div style={{ fontSize: '22px', fontFamily: "'Fraunces',serif", color: 'var(--matt)', fontWeight: 600 }} id="royAmt">$0</div>
                  <div style={{ fontSize: '12px', color: 'var(--bone-faint)', marginTop: '6px' }} id="roySplit">50% LP / 50% GP</div>
                </div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', fontFamily: "'IBM Plex Mono',monospace", textTransform: 'uppercase', color: 'var(--bone-faint)', letterSpacing: '0.08em', marginBottom: '8px' }}>Total Deal Size</div>
                  <div style={{ fontSize: '22px', fontFamily: "'Fraunces',serif", color: 'var(--bone)', fontWeight: 600 }} id="totalAmt">$500,000</div>
                  <div style={{ fontSize: '12px', color: 'var(--bone-faint)', marginTop: '6px' }}>100% capitalized</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: 'var(--surface2)', border: '1px solid var(--line)', borderLeft: '3px solid var(--matt)', borderRadius: '8px', fontSize: '14px', color: 'var(--bone-dim)' }}>
              <b style={{ color: 'var(--bone)', display: 'block', marginBottom: '8px' }}>Capital Stack:</b>
              <div id="capStackReadout" style={{ lineHeight: 1.6 }}>Capital Partner provides $500k secured LOC (backed by 20% LP equity). Roy closes the gap with remaining capital, split 50% LP / 50% GP. The 50% GP contribution funds the General Partner.</div>
            </div>
          </div>
        </section>

        {/* SEMI STACK */}
        <section id="stack">
          <div className="sec-head">
            <span className="n">06</span>
            <div>
              <h2>What SEMI earns off the top</h2>
              <p className="lead">These are paid off revenue, before any profit is split — your senior, low-risk economics flowing whether the store distributes a dollar.</p>
            </div>
          </div>
          <div className="stack">
            <div className="stack-item"><div className="pct">5%</div><div className="lbl">Brand royalty</div><div className="desc">License of the Dinosaur Pizza name & brand system.</div></div>
            <div className="stack-item"><div className="pct">3%</div><div className="lbl">Operating-system license</div><div className="desc">The playbook, recipes, tech & systems you build and maintain.</div></div>
            <div className="stack-item"><div className="pct">2%</div><div className="lbl">Marketing fund</div><div className="desc">SEMI-administered; you control the spend and the brand.</div></div>
          </div>
          <div className="stack-note"><span className="mono">10% of revenue → SEMI, off the top.</span> Rule of thumb: on every <b>$1,000,000</b> of sales, that's <b>~$100,000/yr</b> to SEMI before profit is calculated.</div>
          <p className="devfee"><b>Plus a one-time development fee</b> — SEMI's fee for designing and building the operation, paid at launch (market rate). Not shown in annual distributions below.</p>
        </section>

        {/* WATERFALL - TWO SCENARIOS */}
        <section id="waterfall">
          <div className="sec-head">
            <span className="n">07</span>
            <div>
              <h2>How profit gets distributed</h2>
              <p className="lead">Two capital structures: Equity Investment (10% pref + 66% promote to operators) vs Line of Credit (20% interest, then equity converts to GP). Move the slider to see how distributions change.</p>
            </div>
          </div>
          <div className="panel">
            <div className="ctrl" style={{ maxWidth: '100%', marginBottom: '24px' }}>
              <label>Distributable Cash to Date <span className="val mono" id="dcVal">$100,000</span></label>
              <input type="range" id="distCash" min="0" max="1000000" step="10000" defaultValue="100000" />
            </div>
            <div className="wf-bar">
              <div className="t roc" id="wfRoc">Return of capital</div>
              <div className="t pref" id="wfPref">Pref</div>
              <div className="t split" id="wfSplit"></div>
            </div>
            <div className="wf-legend">
              <div className="k"><span className="b" style={{ background: '#8a8172' }}></span> 1. Return of capital <span style={{ color: 'var(--bone-faint)' }}>— all capital back first, pro-rata</span></div>
              <div className="k"><span className="b" style={{ background: '#b9924a' }}></span> 2. Preferred return <span style={{ color: 'var(--bone-faint)' }}>— dynamic %, capped at 1.75×</span></div>
              <div className="k"><span className="b" style={{ background: 'linear-gradient(90deg,var(--matt),var(--edgar),var(--partner))' }}></span> 3. Split by equity <span style={{ color: 'var(--bone-faint)' }}>— 65 / 15 / 20</span></div>
            </div>
            <div className="earn">
              <div className="earn-card matt"><div className="who">You / SEMI</div><div className="amt mono" id="earnMatt">$0</div><div className="note">capital + pref + 65% of the split</div></div>
              <div className="earn-card edgar"><div className="who">Operating Partner</div><div className="amt mono" id="earnEdgar">$0</div><div className="note">15% of the split — pure equity upside</div></div>
              <div className="earn-card partner"><div className="who">Capital Partner</div><div className="amt mono" id="earnPartner">$0</div><div className="note">capital + pref + 20% of the split</div></div>
            </div>
            <div className="readout" id="wfReadout" style={{ marginTop: '22px' }}></div>
          </div>
        </section>

        {/* CAPITAL PARTNER RETURNS COMPARISON */}
        {cpReturns && (
          <section id="partner-returns">
            <div className="sec-head">
              <span className="n">08</span>
              <div>
                <h2>Capital partner returns comparison</h2>
                <p className="lead">Compare two structures: secured line of credit (20% ROI) vs. direct equity investment (10% pref + equity stake).</p>
              </div>
            </div>
            {(() => {
              const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
              return (
                <div className="calc-grid">
                  <div className="calc-card">
                    <span className="label">Path A: Secured Line of Credit</span>
                    <h3>20% ROI + Security</h3>
                    <div style={{marginBottom: '18px'}}>
                      <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--bone-dim)', marginBottom: '10px'}}>
                        LOC Amount <span style={{fontSize: '15px', color: 'var(--bone)', letterSpacing: 0}}>{fmt(locAmount)}</span>
                      </label>
                      <input type="range" min="350000" max="500000" step="10000" value={locAmount} onChange={(e) => setLocAmount(+e.target.value)} style={{width: '100%'}} />
                    </div>
                    <div className="calc-row">
                      <div className="label">LP Equity Security</div>
                      <div className="value">{cpReturns.pathA.security}%</div>
                    </div>
                    <div className="calc-row">
                      <div className="label">Annual 20% Interest</div>
                      <div className="value">{fmt(locAmount * 0.20)}</div>
                    </div>
                    <div className="calc-row">
                      <div className="label">Total Interest ({cpReturns.hz} yrs)</div>
                      <div className="value">{fmt(cpReturns.pathA.interest)}</div>
                    </div>
                    <div className="calc-row">
                      <div className="label">Total Return</div>
                      <div className="value" style={{color: 'var(--partner)'}}>{fmt(cpReturns.pathA.total)}</div>
                    </div>
                    <div className="calc-row">
                      <div className="label">Multiple</div>
                      <div className="multiple">{cpReturns.pathA.multiple}x</div>
                    </div>
                  </div>

                  <div className="calc-card">
                    <span className="label">Path B: Direct Investment</span>
                    <h3>10% Pref + Equity</h3>
                    <div style={{marginBottom: '18px'}}>
                      <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--bone-dim)', marginBottom: '10px'}}>
                        Investment Amount <span style={{fontSize: '15px', color: 'var(--bone)', letterSpacing: 0}}>{fmt(investAmount)}</span>
                      </label>
                      <input type="range" min="350000" max="500000" step="10000" value={investAmount} onChange={(e) => setInvestAmount(+e.target.value)} style={{width: '100%'}} />
                    </div>
                    <div className="calc-row">
                      <div className="label">LP Equity Stake</div>
                      <div className="value">{cpReturns.pathB.equity}%</div>
                    </div>
                    <div className="calc-row">
                      <div className="label">Annual 10% Pref</div>
                      <div className="value">{fmt(investAmount * 0.10)}</div>
                    </div>
                    <div className="calc-row">
                      <div className="label">Total Pref ({cpReturns.hz} yrs)</div>
                      <div className="value">{fmt(cpReturns.pathB.pref)}</div>
                    </div>
                    <div className="calc-row">
                      <div className="label">Equity Upside Value</div>
                      <div className="value" style={{color: 'var(--partner)'}}>{fmt(cpReturns.pathB.equityValue)}</div>
                    </div>
                    <div className="calc-row">
                      <div className="label">Total Return (at exit)</div>
                      <div className="value" style={{color: 'var(--partner)'}}>{fmt(cpReturns.pathB.total)}+</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>
        )}

        {/* EQUITY RELEASE UPON DEBT REPAYMENT */}
        <section id="equity-release">
          <div className="sec-head">
            <span className="n">09</span>
            <div>
              <h2>Equity release upon debt repayment</h2>
              <p className="lead">When the Capital Partner's LOC + 20% interest is fully repaid, the LP equity security backing the loan converts to GP equity and splits 50-50 between Matt Roy and Edgar Delgado.</p>
            </div>
          </div>
          {(() => {
            if (typeof document === 'undefined') return null;
            const locSlider = document.getElementById('locSlider') as HTMLInputElement;
            const locAmt = locSlider ? +locSlider.value : 500000;
            const releasedLPPct = 5 + ((locAmt - 350000) / 150000) * 15;
            const mattGPGain = releasedLPPct / 2;
            const edgarGPGain = releasedLPPct / 2;

            return (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginTop: '20px' }}>
                {/* PRE-PAYBACK */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r)', padding: '24px' }}>
                  <div style={{ fontSize: '14px', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, color: 'var(--ember)', letterSpacing: '0.1em', marginBottom: '16px' }}>PRE-PAYBACK STATE</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'var(--surface2)', borderRadius: '8px', borderLeft: '3px solid var(--partner)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--bone-faint)', marginBottom: '4px' }}>Capital Partner</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--partner)' }}>$500k LOC</div>
                      <div style={{ fontSize: '11px', color: 'var(--bone-dim)', marginTop: '4px' }}>Backed by {releasedLPPct.toFixed(1)}% LP equity security</div>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--surface2)', borderRadius: '8px', borderLeft: '3px solid var(--matt)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--bone-faint)', marginBottom: '4px' }}>Matt Roy (GP stake)</div>
                      <div style={{ fontSize: '14px', color: 'var(--bone)' }}>Base GP contribution</div>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--surface2)', borderRadius: '8px', borderLeft: '3px solid var(--edgar)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--bone-faint)', marginBottom: '4px' }}>Edgar (Operating Partner)</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--edgar)' }}>15% GP</div>
                      <div style={{ fontSize: '11px', color: 'var(--bone-dim)', marginTop: '4px' }}>Earned through operations</div>
                    </div>
                  </div>
                </div>

                {/* POST-PAYBACK */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r)', padding: '24px' }}>
                  <div style={{ fontSize: '14px', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, color: 'var(--ok)', letterSpacing: '0.1em', marginBottom: '16px' }}>POST-PAYBACK (Debt + Interest Repaid)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'var(--surface2)', borderRadius: '8px', borderLeft: '3px solid var(--bone-dim)', opacity: 0.6 }}>
                      <div style={{ fontSize: '12px', color: 'var(--bone-faint)', marginBottom: '4px' }}>Capital Partner</div>
                      <div style={{ fontSize: '14px', color: 'var(--bone-dim)' }}>Debt repaid • LP security released</div>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--surface2)', borderRadius: '8px', borderLeft: '3px solid var(--matt)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--bone-faint)', marginBottom: '4px' }}>Matt Roy (GP stake increased)</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--matt)' }}>+{mattGPGain.toFixed(1)}% GP</div>
                      <div style={{ fontSize: '11px', color: 'var(--bone-dim)', marginTop: '4px' }}>50% of released {releasedLPPct.toFixed(1)}% equity</div>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--surface2)', borderRadius: '8px', borderLeft: '3px solid var(--edgar)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--bone-faint)', marginBottom: '4px' }}>Edgar (GP stake increased)</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--edgar)' }}>+{edgarGPGain.toFixed(1)}% GP</div>
                      <div style={{ fontSize: '11px', color: 'var(--bone-dim)', marginTop: '4px' }}>50% of released {releasedLPPct.toFixed(1)}% equity</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--surface2)', border: '1px solid var(--line)', borderLeft: '3px solid var(--ok)', borderRadius: '8px', fontSize: '14px', color: 'var(--bone-dim)' }}>
            <b style={{ color: 'var(--bone)', display: 'block', marginBottom: '8px' }}>The Conversion Mechanics:</b>
            <div style={{ lineHeight: 1.6 }} id="equityReleaseReadout">When the Capital Partner's $500k loan is fully repaid with interest, the released LP equity that secured the debt converts to GP equity and distributes 50-50 to Matt Roy and Edgar Delgado as GP members.</div>
          </div>
        </section>

        {/* OWNERSHIP */}
        <section id="ownership">
          <div className="sec-head">
            <span className="n">10</span>
            <div>
              <h2>Who owns the enterprise</h2>
              <p className="lead">Equity ownership of the HoldCo — the residual value after capital and pref are paid.</p>
            </div>
          </div>
          <div className="own-grid">
            <div className="pie"><div className="ctr"><div className="t">Fully vested</div><div className="s">100%</div></div></div>
            <div className="own-rows">
              <div className="own-row m"><div className="bar"></div><div className="pct">65%</div><div className="info"><b>Principle / You</b><span>Majority + control. Your sponsor reward is embedded here.</span></div></div>
              <div className="own-row e"><div className="bar"></div><div className="pct">15%</div><div className="info"><b>Operating Partner</b><span>Earned through operational excellence and vesting. Plus selecting mx capital partner.</span></div></div>
              <div className="own-row p"><div className="bar"></div><div className="pct">20%</div><div className="info"><b>Capital Partner</b><span>Equity payback premium or token carried interest. (Preference: move to line of credit with capital partner)</span></div></div>
            </div>
          </div>
          <div className="promote-note"><b>Sponsor economics:</b> with a 65% majority, your sponsor promote is <b>already baked into the equity</b>. Layering a separate carried-interest promote on top of majority equity is a double-dip. Take it embedded here, or drop your equity and add an explicit promote — one or the other, not both.</div>
        </section>

        {/* POWER WITHOUT LIABILITY */}
        <section id="cvl">
          <div className="sec-head">
            <span className="n">11</span>
            <div>
              <h2>Power without the liability</h2>
              <p className="lead">You sit upstream and decide; the operating partner sits at the company and carries the exposure.</p>
            </div>
          </div>
          <div className="cvl">
            <div className="cvl-col control">
              <h3>You / SEMI</h3>
              <div className="sub">Holds the power</div>
              <ul>
                <li><b>Manager of the HoldCo</b> — the single decision seat upstream.</li>
                <li><b>Reserved matters</b> — veto over budget, debt, sale, expansion.</li>
                <li><b>Board seat</b> at the holding company.</li>
                <li>Insulated from operating liability by the corporate veil.</li>
              </ul>
            </div>
            <div className="cvl-col liability">
              <h3>Operating Partner</h3>
              <div className="sub">Carries the risk</div>
              <ul>
                <li><b>Chief Operating Officer / Principal</b> — the legal principal on the ground.</li>
                <li>Personally on the hook for <b>operational, regulatory, and labor obligations.</b></li>
                <li>Signs the leases, contracts, and permits.</li>
                <li>This is why their equity is real — they're taking real exposure, not just a paycheck.</li>
              </ul>
            </div>
          </div>
        </section>

        <footer>
          <p className="mono">SEMI UNIFIED CAPITAL ENGINE · capital structure · illustrative discussion draft</p>
          <p>All figures are structural and illustrative — proportions and mechanics, not a committed cap table or a promise of returns. The model is flexible to any raise size, any rate, any horizon. Not legal, tax, or investment advice — final structure requires counsel, tax review, and partner agreement before anything is committed.</p>
        </footer>
      </div>
    </>
  );
}
