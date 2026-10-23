const n=`<svg class="cg-man" viewBox="0 0 60 90" width="48" height="72" focusable="false">
  <g class="leg-l"><rect class="o" x="23" y="60" width="7" height="24" rx="3.5" fill="var(--cg-trouser)"/><rect class="o" x="18.5" y="81" width="11.5" height="6" rx="3" fill="var(--cg-ink)"/></g>
  <g class="leg-r"><rect class="o" x="30" y="60" width="7" height="24" rx="3.5" fill="var(--cg-trouser)"/><rect class="o" x="30" y="81" width="11.5" height="6" rx="3" fill="var(--cg-ink)"/></g>
  <path class="o" d="M19 33 Q30 29 41 33 L44 66 Q30 70 16 66 Z" fill="var(--cg-coat)"/>
  <path d="M27 32 L30 35.5 L33 32 Z" fill="var(--cg-outline)"/>
  <path d="M25.5 32.5 L30 45 L34.5 32.5" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="30" cy="50" r="1.6" fill="var(--amber)"/><circle cx="30" cy="57" r="1.6" fill="var(--amber)"/>
  <g class="arm-l"><rect class="o" x="14" y="35" width="7" height="23" rx="3.5" fill="var(--cg-coat)"/><rect x="14.4" y="52.5" width="6.2" height="2.6" rx="1.2" fill="var(--amber)"/><circle class="o" cx="17.5" cy="59" r="3.4" fill="var(--cg-skin)"/></g>
  <g class="arm-r"><rect class="o" x="39" y="35" width="7" height="23" rx="3.5" fill="var(--cg-coat)"/><circle class="o" cx="42.5" cy="59" r="3.4" fill="var(--cg-skin)"/></g>
  <circle class="o" cx="30" cy="21.5" r="9.5" fill="var(--cg-skin)"/>
  <circle cx="24.6" cy="24.4" r="1.7" fill="var(--cg-cheek)"/><circle cx="35.4" cy="24.4" r="1.7" fill="var(--cg-cheek)"/>
  <circle cx="26.7" cy="20.6" r="1.2" fill="var(--cg-ink)"/><circle cx="33.3" cy="20.6" r="1.2" fill="var(--cg-ink)"/>
  <path d="M25.8 25.3 Q28 23.5 30 24.7 Q32 23.5 34.2 25.3 Q32 26.1 30 25.4 Q28 26.1 25.8 25.3 Z" fill="var(--cg-ink)"/>
  <path d="M28 27.9 Q30 29.3 32 27.9" fill="none" stroke="var(--cg-ink)" stroke-width="1.1" stroke-linecap="round"/>
  <g class="hat"><rect class="o" x="22" y="1.5" width="16" height="11" rx="2" fill="var(--amber)"/><rect x="22" y="8.2" width="16" height="2.6" fill="var(--cg-coat)"/><rect class="o" x="18.5" y="11.5" width="23" height="3.2" rx="1.6" fill="var(--amber)"/></g>
</svg>`,v=`<svg class="cg-car-svg" viewBox="0 0 130 60" width="112" height="52" focusable="false">
  <g class="driver">
    <rect class="o" x="53.5" y="24" width="14" height="10" rx="3" fill="var(--cg-coat)"/>
    <circle class="o" cx="60.5" cy="18.5" r="7" fill="var(--cg-skin)"/>
    <circle cx="58.4" cy="18" r="1" fill="var(--cg-ink)"/><circle cx="62.6" cy="18" r="1" fill="var(--cg-ink)"/>
    <path d="M57.4 21.4 Q59 20.2 60.5 21 Q62 20.2 63.6 21.4 Q62 22 60.5 21.6 Q59 22 57.4 21.4 Z" fill="var(--cg-ink)"/>
    <rect class="o" x="54.5" y="4" width="12" height="8.5" rx="1.6" fill="var(--amber)"/><rect class="o" x="52" y="11.2" width="17" height="2.6" rx="1.3" fill="var(--amber)"/>
  </g>
  <path class="o" d="M6 41 Q6 31 18 29 L47 28 L50 31 L73 31 L77 26 L112 28 Q125 30 125 39 L125 43 Q125 47 121 47 L10 47 Q6 47 6 43 Z" fill="var(--amber)"/>
  <path d="M77 26 L72.5 14.5" stroke="var(--cg-ink)" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M12 37.5 L119 37.5" stroke="var(--cg-coat)" stroke-width="3" stroke-linecap="round"/>
  <path d="M95 33.5 l4 -3 l4 3 M103 33.5 l4 -3 l4 3" fill="none" stroke="var(--cg-coat)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle class="o" cx="121" cy="33.5" r="3" fill="var(--cg-outline)"/>
  <rect x="2.5" y="40" width="6" height="3" rx="1.5" fill="var(--cg-ink)"/>
  <g class="wheel"><circle class="o" cx="30" cy="46" r="11" fill="var(--cg-ink)"/><circle cx="30" cy="46" r="4.5" fill="var(--amber)"/><path d="M30 37.5 L30 54.5 M21.5 46 L38.5 46" stroke="var(--amber)" stroke-width="1.6"/></g>
  <g class="wheel"><circle class="o" cx="100" cy="46" r="11" fill="var(--cg-ink)"/><circle cx="100" cy="46" r="4.5" fill="var(--amber)"/><path d="M100 37.5 L100 54.5 M91.5 46 L108.5 46" stroke="var(--amber)" stroke-width="1.6"/></g>
</svg>`;function o(r,l,h,g){let i="";for(let c=0;c<r;c++){const a=c/r*Math.PI*2,e=c%2?g:h,s=Math.cos(a),t=Math.sin(a);i+=`M${(s*l).toFixed(2)} ${(t*l).toFixed(2)} L${(s*e).toFixed(2)} ${(t*e).toFixed(2)} `}return i}const d=`<svg class="sun" viewBox="-110 -110 220 220" width="200" height="200" focusable="false">
  <g class="sun-rays"><path d="${o(32,28,104,70)}" fill="none" stroke="var(--amber)" stroke-width="1.5" stroke-linecap="round"/></g>
  <circle r="20" fill="var(--amber)"/><circle r="27" fill="none" stroke="var(--amber)" stroke-width="1.5"/>
</svg>`,x=o(16,11,30,21);export{v as C,n as M,d as S,x as a};
