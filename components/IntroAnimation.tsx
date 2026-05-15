"use client";

import { useEffect, useRef } from "react";

const START      = 60;
const TITLE_STEP = 22;
const DOOR_STEP  = 28;
const TAG_STEP   = 18;
const CHAR_DUR   = 340;
const FADE_DUR   = 380;
const BEAT       = 180;
const DOOR_DUR   = 1100;

const CARD_HTML = `
<div class="i-wrap">
  <div class="i-card">
    <div class="i-row">
      <span class="i-corner i-fade">— Brand Identity</span>
      <span class="i-corner i-fade">Cần Thơ · Việt Nam —</span>
    </div>
    <div class="i-rule i-fade"></div>
    <div class="i-mid">
      <h2 class="i-title" data-split>HƯNG THÀNH PHÁT</h2>
      <p class="i-word" data-split>DOOR</p>
      <div class="i-divider i-fade"><span>◆</span></div>
      <p class="i-tag" data-split>Cửa đẹp · nhà sang</p>
      <p class="i-svc i-fade">Cửa cuốn · Cửa nhôm kính · Cửa kéo</p>
      <p class="i-adr i-fade">235–237 Võ Văn Kiệt · Bình Thủy · Cần Thơ</p>
    </div>
    <div class="i-bot">
      <div class="i-ticks i-fade"></div>
      <div class="i-stats">
        <div class="i-stat i-fade"><div class="i-n">2008</div><div class="i-l">Thành lập</div></div>
        <div class="i-stat i-fade"><div class="i-n">15+</div><div class="i-l">Năm kinh nghiệm</div></div>
        <div class="i-stat i-fade"><div class="i-n">500+</div><div class="i-l">Công trình</div></div>
      </div>
      <div class="i-row">
        <span class="i-corner i-fade">— Cửa kỹ thuật cao</span>
        <span class="i-corner i-fade">Est. MMVIII —</span>
      </div>
    </div>
  </div>
</div>
`;

const CSS = `
.htp-stage {
  position: fixed; inset: 0; z-index: 9999;
  perspective: 1700px; perspective-origin: 50% 45%;
  background: #080b16; overflow: hidden;
}
.i-overlay {
  position: absolute; inset: 0;
  transform-style: preserve-3d;
  opacity: 0;
}
/* fade in the overlay (reveals the brand card) */
.htp-stage.play .i-overlay {
  animation: i-introFade 400ms ease forwards;
  animation-delay: 0ms;
}
@keyframes i-introFade { to { opacity: 1; } }

.i-door {
  position: absolute; top: 0; width: 50%; height: 100%;
  overflow: hidden; backface-visibility: hidden;
}
.i-door-l { left: 0; transform-origin: left center; width: calc(50% + 1px); }
.i-door-r { left: 50%; transform-origin: right center; }
.htp-stage.play .i-door-l {
  animation: i-swingL ${DOOR_DUR}ms cubic-bezier(0.55,0.06,0.32,1) forwards;
  animation-delay: calc(var(--fill-dur) + ${BEAT}ms);
}
.htp-stage.play .i-door-r {
  animation: i-swingR ${DOOR_DUR}ms cubic-bezier(0.55,0.06,0.32,1) forwards;
  animation-delay: calc(var(--fill-dur) + ${BEAT}ms);
}
@keyframes i-swingL {
  from { transform: rotateY(0);       filter: brightness(1);    }
  to   { transform: rotateY(-115deg); filter: brightness(0.32); }
}
@keyframes i-swingR {
  from { transform: rotateY(0);      filter: brightness(1);    }
  to   { transform: rotateY(115deg); filter: brightness(0.32); }
}

.i-seam {
  position: absolute; top: 0; left: 50%;
  width: 3px; height: 100%; transform: translateX(-50%);
  background: linear-gradient(to bottom, transparent, #e6c878, #c9a44c, #e6c878, transparent);
  opacity: 0; filter: blur(2px);
}
.htp-stage.play .i-seam {
  animation: i-seamFlash ${DOOR_DUR}ms ease-out forwards;
  animation-delay: calc(var(--fill-dur) + ${BEAT}ms);
}
@keyframes i-seamFlash {
  0%   { opacity: 0;   width: 3px;  }
  15%  { opacity: 0.9; width: 5px;  }
  55%  { opacity: 0.5; width: 30px; }
  100% { opacity: 0;   width: 90px; }
}

/* card wrap — full viewport wide, clipped by parent door */
.i-wrap {
  position: absolute; top: 0; width: 100vw; height: 100%;
  backface-visibility: hidden;
}
.i-door-l .i-wrap { left: 0; }
.i-door-r .i-wrap { left: -50vw; }

.i-card {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 4.5vh 6vw;
  background:
    radial-gradient(1100px 620px at 50% 30%, rgba(201,164,76,0.10), transparent 70%),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 46px),
    linear-gradient(160deg, #141a32, #080b16 60%);
  font-family: 'Be Vietnam Pro', sans-serif;
  color: #f3ead6;
  overflow: hidden;
}
.i-row { display: flex; justify-content: space-between; align-items: center; }
.i-corner {
  font-size: clamp(8px,0.9vw,11px); letter-spacing: 0.28em;
  color: #6f7690; text-transform: uppercase;
}
.i-rule {
  width: min(440px,62vw); height: 1px; margin: 2.4vh auto 0;
  background: linear-gradient(90deg, transparent, #c9a44c, transparent);
}
.i-mid {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  gap: clamp(4px, 1.1vh, 14px);
  overflow: hidden;
  padding: 1vh 0;
  -webkit-transform: translateZ(0); transform: translateZ(0);
}
/* title: explicit width forces wrapping in a centered flex column */
.i-title {
  font-family: 'Playfair Display', serif; font-weight: 800;
  font-size: clamp(16px, 4.8vw, 68px);
  letter-spacing: 0.06em;
  line-height: 1.12; color: #f3ead6;
  width: 86vw; max-width: 86vw; text-align: center; margin: 0;
  white-space: nowrap; overflow: hidden;
}
.i-word {
  font-size: clamp(9px,1vw,12px); letter-spacing: 0.7em;
  color: #c9a44c; margin: 0; padding-left: 0.7em;
}
.i-divider {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; width: min(320px,50vw); color: #c9a44c;
}
.i-divider::before, .i-divider::after {
  content: ""; height: 1px; flex: 1;
  background: linear-gradient(90deg, transparent, rgba(201,164,76,0.55), transparent);
}
.i-divider span { font-size: 9px; transform: rotate(45deg); display: inline-block; }
.i-tag {
  font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500;
  font-size: clamp(14px,2.9vw,34px); color: #e6c878; margin: 0;
}
.i-svc {
  font-size: clamp(7px,0.95vw,11px); letter-spacing: 0.2em;
  color: #6f7690; text-transform: uppercase; margin: 0;
}
.i-adr {
  font-size: clamp(7px,0.95vw,11px); letter-spacing: 0.16em;
  color: #c9a44c; margin: 0;
}
.i-bot { display: flex; flex-direction: column; gap: clamp(8px,2.6vh,28px); }
.i-ticks {
  height: 18px;
  background: repeating-linear-gradient(90deg, rgba(201,164,76,0.55) 0 1px, transparent 1px 15px);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  opacity: 0.6;
}
.i-stats { display: flex; border: 1px solid rgba(201,164,76,0.22); }
.i-stat { flex: 1; text-align: center; padding: clamp(8px,2.4vh,24px) 1vw; }
.i-stat + .i-stat { border-left: 1px solid rgba(201,164,76,0.22); }
.i-n {
  font-family: 'Playfair Display', serif;
  font-size: clamp(18px,3vw,40px); color: #e6c878;
}
.i-l {
  font-size: clamp(7px,0.8vw,10px); letter-spacing: 0.18em;
  color: #6f7690; text-transform: uppercase; margin-top: 4px;
}

/* per-character reveal */
.i-char {
  display: inline-block; opacity: 0;
  filter: blur(3px);
}
.htp-stage.play .i-char {
  animation: i-charIn ${CHAR_DUR}ms cubic-bezier(0.2,0.7,0.2,1) both;
}
@keyframes i-charIn { to { opacity: 1; filter: blur(0); } }

.i-fade { opacity: 0; }
.htp-stage.play .i-fade {
  animation: i-fadeUp ${FADE_DUR}ms ease both;
}
@keyframes i-fadeUp { to { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .htp-stage { display: none !important; }
}
`;

export function IntroAnimation() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always lift the pre-hide on mount so the page is never permanently invisible
    document.documentElement.removeAttribute("data-htp-intro");

    if (sessionStorage.getItem("htp-intro-seen")) {
      if (stageRef.current) stageRef.current.style.display = "none";
      return;
    }
    sessionStorage.setItem("htp-intro-seen", "1");

    const stage = stageRef.current;
    if (!stage) return;

    function splitChars(el: Element) {
      const text = el.textContent ?? "";
      el.textContent = "";
      for (const ch of Array.from(text)) {
        const s = document.createElement("span");
        s.className = "i-char";
        // Use non-breaking space so adjacent i-char spans have no word-break opportunity
        s.textContent = ch === " " ? " " : ch;
        el.appendChild(s);
      }
      return el.querySelectorAll<HTMLElement>(".i-char");
    }

    function buildDoor(door: Element) {
      door.innerHTML = CARD_HTML;
      let t = START;

      const chars = (sel: string, step: number) =>
        splitChars(door.querySelector(sel)!)
          .forEach(c => { c.style.animationDelay = t + "ms"; t += step; });

      const fades = (sel: string, step = 0) =>
        door.querySelectorAll<HTMLElement>(sel)
          .forEach(el => { el.style.animationDelay = t + "ms"; t += step; });

      fades(".i-rule");              t += 120;
      chars(".i-title", TITLE_STEP); t += 70;
      chars(".i-word",  DOOR_STEP);  t += 60;
      fades(".i-divider");           t += 110;
      chars(".i-tag",   TAG_STEP);   t += 80;
      fades(".i-svc");               t += 90;
      fades(".i-adr");               t += 110;
      fades(".i-ticks");             t += 90;
      fades(".i-stat", 70);          t += 30;
      fades(".i-corner", 45);

      return t + Math.max(CHAR_DUR, FADE_DUR);
    }

    const leftDoor  = stage.querySelector(".i-door-l")!;
    const rightDoor = stage.querySelector(".i-door-r")!;

    const fillDur = buildDoor(leftDoor);
    buildDoor(rightDoor);
    stage.style.setProperty("--fill-dur", fillDur + "ms");

    // Page element to zoom forward as doors open
    const pageRoot = document.getElementById("page-root") as HTMLElement | null;

    // Pre-scale the page (it's hidden behind the navy overlay, so no flash)
    if (pageRoot) {
      pageRoot.style.transformOrigin = "50% 42%";
      pageRoot.style.transform = "scale(0.88)";
    }

    // When doors start opening: zoom the page forward
    const zoomAt = fillDur + BEAT + Math.round(DOOR_DUR * 0.28);
    const zoomTimer = setTimeout(() => {
      if (pageRoot) {
        pageRoot.style.transition = `transform ${Math.round(DOOR_DUR * 0.9)}ms cubic-bezier(0.22,0.61,0.36,1)`;
        pageRoot.style.transform = "scale(1)";
      }
    }, zoomAt);

    // Fade the overlay itself out as doors are mid-swing (reveals zooming page underneath)
    const fadeAt = fillDur + BEAT + Math.round(DOOR_DUR * 0.50);
    const fadeTimer = setTimeout(() => {
      if (stage) {
        stage.style.transition = `opacity ${Math.round(DOOR_DUR * 0.65)}ms ease`;
        stage.style.opacity = "0";
        stage.style.pointerEvents = "none";
      }
    }, fadeAt);

    // Final cleanup
    const cleanupAt = fillDur + BEAT + DOOR_DUR + 400;
    const cleanupTimer = setTimeout(() => {
      if (stageRef.current) stageRef.current.style.display = "none";
      if (pageRoot) {
        pageRoot.style.transform = "";
        pageRoot.style.transformOrigin = "";
        pageRoot.style.transition = "";
      }
    }, cleanupAt);

    function play() {
      if (!stage) return;
      stage.classList.remove("play");
      void stage.offsetWidth;
      stage.classList.add("play");
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(play);
    } else {
      window.addEventListener("load", play);
    }

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(fadeTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,500&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div ref={stageRef} className="htp-stage" aria-hidden="true">
        <div className="i-overlay">
          <div className="i-door i-door-l" />
          <div className="i-door i-door-r" />
          <div className="i-seam" />
        </div>
      </div>
    </>
  );
}
