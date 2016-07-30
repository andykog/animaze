export default ({ onTick, duration = 240, ease = k => 0.5 * (1 - Math.cos(Math.PI * k)) }) => {
  const startTime = window.performance && window.performance.now() || Date.now();
  let frame;
  return new Promise(resolve => {
    if (!window.requestAnimationFrame) {
      onTick(1);
      resolve();
      return;
    }
    const step = () => {
      frame = window.requestAnimationFrame(() => step(onTick));
      const time = window.performance && window.performance.now() || Date.now();
      const elapsed = (time - startTime) / duration;
      const value = ease(elapsed > 1 ? 1 : elapsed);
      onTick(value);
      if (elapsed >= 1) {
        window.cancelAnimationFrame(frame);
        resolve();
      }
    };
    step();
  });
};

