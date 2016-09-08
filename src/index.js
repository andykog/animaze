module.exports = ({ tick, onTick, duration = 240, ease = k => 0.5 * (1 - Math.cos(Math.PI * k)) }) => {
  tick = tick || onTick;
  const startTime = window.performance && window.performance.now() || Date.now();
  let frame;
  return new Promise(resolve => {
    if (!window.requestAnimationFrame) {
      tick(1);
      resolve();
      return;
    }
    const step = () => {
      frame = window.requestAnimationFrame(() => step(tick));
      const time = window.performance && window.performance.now() || Date.now();
      const elapsed = (time - startTime) / duration;
      const value = ease(elapsed > 1 ? 1 : elapsed);
      tick(value);
      if (elapsed >= 1) {
        window.cancelAnimationFrame(frame);
        resolve();
      }
    };
    step();
  });
};

