"use client";

import { useEffect, useRef } from "react";

// ── Timing (ms) ──────────────────────────────────────────────────────────────
const START      = 60;
const TITLE_STEP = 22;
const TAG_STEP   = 18;
const CHAR_DUR   = 300;
const FADE_DUR   = 360;
const BEAT       = 180;
const DOOR_DUR   = 1000;

const CSS = `
.htp-stage {
  position: fixed; inset: 0; z-index: 9999;
  perspective: 1700px; perspective-origin: 50% 45%;
  background: #080b16; overflow: hidden;
}

/* Door panels — decorative halves only, NO text content inside.
   Radial gradient anchored to the inner edge so the glow aligns to
   the center seam, matching a single full-width element at 50%. */
.i-door {
  position: absolute; top: 0; height: 100%;
  backface-visibility: hidden;
}
.i-door-l {
  left: 0; width: calc(50% + 1px);
  transform-origin: left center;
  background:
    radial-gradient(1100px 620px at 100% 30%, rgba(201,164,76,0.10), transparent 70%),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 46px),
    linear-gradient(160deg, #141a32, #080b16 60%);
}
.i-door-r {
  left: 50%; width: 50%;
  transform-origin: right center;
  background:
    radial-gradient(1100px 620px at 0%   30%, rgba(201,164,76,0.10), transparent 70%),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 46px),
    linear-gradient(160deg, #141a32, #080b16 60%);
}

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

/* warm seam glow as doors part */
.i-seam {
  position: absolute; top: 0; left: 50%;
  width: 3px; height: 100%; transform: translateX(-50%);
  background: linear-gradient(to bottom, transparent, #e6c878, #c9a44c, #e6c878, transparent);
  opacity: 0; filter: blur(2px); z-index: 5;
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

/* Card layer — sits ABOVE the door panels at its own z-index.
   Never inside overflow:hidden or a 3D-clipped container. */
.i-card-layer {
  position: absolute; inset: 0; z-index: 10;
  opacity: 0; pointer-events: none;
}

.i-card {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 4.5vh 6vw;
  font-family: 'Be Vietnam Pro', sans-serif;
  color: #f3ead6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.i-row   { display: flex; justify-content: space-between; align-items: center; }
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
  padding: 1vh 0;
}
.i-title {
  font-family: 'Playfair Display', serif; font-weight: 800;
  font-size: clamp(18px, 5.2vw, 72px);
  letter-spacing: 0.07em; line-height: 1.1; color: #f3ead6;
  white-space: nowrap; margin: 0;
}
.i-divider {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; width: min(320px,50vw); color: #c9a44c;
}
.i-divider::before, .i-divider::after {
  content: ""; height: 1px; flex: 1;
  background: linear-gradient(90deg, transparent, rgba(201,164,76,0.55), transparent);
}
.i-divider span { font-size: 11px; transform: rotate(45deg); display: inline-block; }
.i-tag {
  font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500;
  font-size: clamp(14px,2.9vw,36px); color: #e6c878; margin: 0;
}
.i-svc {
  font-size: clamp(9px,0.95vw,11px); letter-spacing: 0.2em;
  color: #6f7690; text-transform: uppercase; margin: 0;
}
.i-adr {
  font-size: clamp(9px,0.95vw,11px); letter-spacing: 0.16em;
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
.i-stat  { flex: 1; text-align: center; padding: clamp(8px,2.4vh,24px) 1vw; }
.i-stat + .i-stat { border-left: 1px solid rgba(201,164,76,0.22); }
.i-n {
  font-family: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif;
  font-weight: 700; font-style: normal;
  font-size: clamp(18px,3vw,40px); color: #e6c878;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'lnum' 1, 'tnum' 1;
}
.i-l {
  font-size: clamp(7px,0.8vw,10px); letter-spacing: 0.18em;
  color: #6f7690; text-transform: uppercase; margin-top: 4px;
}

/* per-character reveal: blur + rise */
.i-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.38em);
  filter: blur(6px);
}
.htp-stage.play .i-char {
  animation: i-charIn ${CHAR_DUR}ms cubic-bezier(0.2,0.7,0.2,1) both;
}
@keyframes i-charIn {
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

.i-fade { opacity: 0; transform: translateY(12px); }
.htp-stage.play .i-fade {
  animation: i-fadeUp ${FADE_DUR}ms ease both;
}
@keyframes i-fadeUp { to { opacity: 1; transform: none; } }

@media (prefers-reduced-motion: reduce) {
  .htp-stage { display: none !important; }
}
`;

export function IntroAnimation() {
  const stageRef     = useRef<HTMLDivElement>(null);
  const cardLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-htp-ready", "1");

    if (sessionStorage.getItem("htp-intro-seen") || window.innerWidth < 768) {
      if (stageRef.current) stageRef.current.style.display = "none";
      return;
    }

    const stage     = stageRef.current;
    const cardLayer = cardLayerRef.current;
    if (!stage || !cardLayer) return;

    function splitChars(el: Element) {
      const text = el.textContent ?? "";
      el.textContent = "";
      for (const ch of Array.from(text)) {
        if (ch === " ") {
          el.appendChild(document.createTextNode(" "));
          continue;
        }
        const s = document.createElement("span");
        s.className = "i-char";
        s.textContent = ch;
        el.appendChild(s);
      }
      return el.querySelectorAll<HTMLElement>(".i-char");
    }

    // Set animation delays on the single card layer
    let t = START;

    const q  = (sel: string) => cardLayer.querySelector<HTMLElement>(sel);
    const qa = (sel: string) => cardLayer.querySelectorAll<HTMLElement>(sel);

    const setDelay  = (el: HTMLElement | null) => { if (el) el.style.animationDelay = t + "ms"; };
    const fadeBlock = (sel: string, step = 0) =>
      qa(sel).forEach(el => { el.style.animationDelay = t + "ms"; t += step; });

    setDelay(q(".i-rule")); t += 130;

    splitChars(q(".i-title")!)
      .forEach(c => { c.style.animationDelay = t + "ms"; t += TITLE_STEP; });
    t += 70;

    setDelay(q(".i-divider")); t += 110;

    splitChars(q(".i-tag")!)
      .forEach(c => { c.style.animationDelay = t + "ms"; t += TAG_STEP; });
    t += 80;

    setDelay(q(".i-svc"));   t += 90;
    setDelay(q(".i-adr"));   t += 110;
    setDelay(q(".i-ticks")); t += 90;
    fadeBlock(".i-stat", 70); t += 30;
    fadeBlock(".i-corner", 45);

    const fillDur = t + Math.max(CHAR_DUR, FADE_DUR);
    stage.style.setProperty("--fill-dur", fillDur + "ms");

    const pageRoot = document.getElementById("page-root") as HTMLElement | null;
    if (pageRoot) {
      pageRoot.style.transformOrigin = "50% 42%";
      pageRoot.style.transform = "scale(0.88)";
    }

    // Fade card layer out as doors begin to swing
    const cardFadeTimer = setTimeout(() => {
      cardLayer.style.transition = `opacity ${Math.round(DOOR_DUR * 0.55)}ms ease`;
      cardLayer.style.opacity = "0";
    }, fillDur + BEAT);

    // Zoom page forward at ~28% into the door swing
    const zoomAt = fillDur + BEAT + Math.round(DOOR_DUR * 0.28);
    const zoomTimer = setTimeout(() => {
      if (pageRoot) {
        pageRoot.style.transition = `transform ${Math.round(DOOR_DUR * 0.9)}ms cubic-bezier(0.22,0.61,0.36,1)`;
        pageRoot.style.transform = "scale(1)";
      }
    }, zoomAt);

    // Fade stage at ~50% into the door swing
    const fadeAt = fillDur + BEAT + Math.round(DOOR_DUR * 0.50);
    const fadeTimer = setTimeout(() => {
      stage.style.transition = `opacity ${Math.round(DOOR_DUR * 0.65)}ms ease`;
      stage.style.opacity = "0";
      stage.style.pointerEvents = "none";
    }, fadeAt);

    const cleanupAt = fillDur + BEAT + DOOR_DUR + 400;
    const cleanupTimer = setTimeout(() => {
      sessionStorage.setItem("htp-intro-seen", "1");
      if (stageRef.current) stageRef.current.style.display = "none";
      if (pageRoot) {
        pageRoot.style.transform = "";
        pageRoot.style.transformOrigin = "";
        pageRoot.style.transition = "";
      }
    }, cleanupAt);

    function play() {
      if (!stage || !cardLayer) return;
      // Fade card layer in via JS so there's no CSS animation conflict on fade-out
      cardLayer.style.transition = "opacity 380ms ease";
      cardLayer.style.opacity = "1";
      // Trigger .i-char and .i-fade CSS animations
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
      clearTimeout(cardFadeTimer);
      clearTimeout(zoomTimer);
      clearTimeout(fadeTimer);
      clearTimeout(cleanupTimer);
      window.removeEventListener("load", play);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div ref={stageRef} className="htp-stage" aria-hidden="true">

        {/* Door panels: empty visual halves — no text, no overflow:hidden */}
        <div className="i-door i-door-l" />
        <div className="i-door i-door-r" />
        <div className="i-seam" />

        {/* Card layer: above the doors, never clipped by any 3D container */}
        <div ref={cardLayerRef} className="i-card-layer">
          <div className="i-card">
            <div className="i-row">
              <span className="i-corner i-fade">— Brand Identity</span>
              <span className="i-corner i-fade">Cần Thơ · Việt Nam —</span>
            </div>
            <div className="i-rule i-fade" />
            <div className="i-mid">
              <h2 className="i-title">HƯNG THÀNH PHÁT</h2>
              <div className="i-divider i-fade"><span>◆</span></div>
              <p className="i-tag">Cửa đẹp · nhà sang</p>
              <p className="i-svc i-fade">Cửa cuốn · Cửa nhôm kính · Cửa kéo</p>
              <p className="i-adr i-fade">235–237 Võ Văn Kiệt · Bình Thủy · Cần Thơ</p>
            </div>
            <div className="i-bot">
              <div className="i-ticks i-fade" />
              <div className="i-stats">
                <div className="i-stat i-fade"><div className="i-n">2005</div><div className="i-l">Thành lập</div></div>
                <div className="i-stat i-fade"><div className="i-n">21+</div><div className="i-l">Năm kinh nghiệm</div></div>
                <div className="i-stat i-fade"><div className="i-n">500+</div><div className="i-l">Công trình</div></div>
              </div>
              <div className="i-row">
                <span className="i-corner i-fade">— Cửa kỹ thuật cao</span>
                <span className="i-corner i-fade">Est. MMV —</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
