// src/ui/kite-animation.js
export function animateKiteDriftToBot(startElement) {
  const endEl = document.getElementById("ai-bot-avatar");
  if (!endEl) return;

  const startRect = startElement.getBoundingClientRect();
  const endRect = endEl.getBoundingClientRect();
  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  const kite = document.createElement("div");
  kite.style.position = "fixed";
  kite.style.left = `${startX}px`;
  kite.style.top = `${startY}px`;
  kite.style.width = "24px";
  kite.style.height = "24px";
  kite.style.fontSize = "20px";
  kite.style.zIndex = "1000";
  kite.style.transformOrigin = "center";
  kite.innerHTML = "🪁";
  document.body.appendChild(kite);

  const kiteString = document.createElement("div");
  kiteString.style.position = "fixed";
  kiteString.style.left = `${startX + 12}px`;
  kiteString.style.top = `${startY + 12}px`;
  kiteString.style.width = "2px";
  kiteString.style.height = "15px";
  kiteString.style.background = "linear-gradient(to bottom, rgba(139, 92, 246, 0.8), rgba(99, 102, 241, 0.4), transparent)";
  kiteString.style.borderRadius = "1px";
  kiteString.style.zIndex = "999";
  kiteString.style.transformOrigin = "top center";
  document.body.appendChild(kiteString);

  const particles = [];
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.width = "3px";
    particle.style.height = "3px";
    particle.style.background = "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)";
    particle.style.borderRadius = "50%";
    particle.style.zIndex = "998";
    particle.style.opacity = "0.7";
    document.body.appendChild(particle);
    particles.push(particle);
  }

  const startTime = Date.now();
  const duration = 2500;
  const controlX1 = startX + (endX - startX) * 0.3 + Math.sin(Date.now() / 1000) * 60;
  const controlY1 = startY - 80;
  const controlX2 = startX + (endX - startX) * 0.7 + Math.cos(Date.now() / 1500) * 40;
  const controlY2 = startY + (endY - startY) * 0.3 - 30;

  const getBezierPoint = (t, p0, p1, p2, p3) => {
    const x =
      Math.pow(1 - t, 3) * p0.x +
      3 * Math.pow(1 - t, 2) * t * p1.x +
      3 * (1 - t) * Math.pow(t, 2) * p2.x +
      Math.pow(t, 3) * p3.x;
    const y =
      Math.pow(1 - t, 3) * p0.y +
      3 * Math.pow(1 - t, 2) * t * p1.y +
      3 * (1 - t) * Math.pow(t, 2) * p2.y +
      Math.pow(t, 3) * p3.y;
    return { x, y };
  };

  const points = {
    p0: { x: startX, y: startY },
    p1: { x: controlX1, y: controlY1 },
    p2: { x: controlX2, y: controlY2 },
    p3: { x: endX, y: endY },
  };

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = progress - Math.sin(progress * Math.PI * 2) / (Math.PI * 2) * 0.1;
    const windStrength = (1 - progress) * 0.8 + 0.2;
    const windX = Math.sin(progress * Math.PI * 3 + Date.now() / 1000) * 25 * windStrength;
    const windY = Math.cos(progress * Math.PI * 2.5 + Date.now() / 1200) * 15 * windStrength;
    const currentPos = getBezierPoint(easeProgress, points.p0, points.p1, points.p2, points.p3);
    currentPos.x += windX;
    currentPos.y += windY;

    kite.style.left = `${currentPos.x - 12}px`;
    kite.style.top = `${currentPos.y - 12}px`;

   if (progress < 1) {
  requestAnimationFrame(animate);
} else {
  kite.style.transition = "opacity 0.5s ease";
  kite.style.opacity = "0";

  kiteString.style.transition = "opacity 0.5s ease";
  kiteString.style.opacity = "0";

  particles.forEach((particle) => {
    particle.style.transition = "opacity 0.5s ease";
    particle.style.opacity = "0";
  });

  setTimeout(() => {
    kite.remove();
    kiteString.remove();
    particles.forEach((particle) => particle.remove());
  }, 500); 
}

  }

  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 100);
}
