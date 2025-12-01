import { useEffect, useRef } from "react";

export default function WordSphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const texts = [
      'HTML5', 'Javascript', 'Scala', 'Kotlin', 'Erlang',
      'CSS', 'Python', 'Java', 'PostgreSQL', 'MongoDB',
      'Android', 'TensorFlow', 'Flask', 'React', 'Redis',
      'NodeJS', 'OCaml', 'Redux', 'Rx',
    ];
    const counts = [1, 2, 4, 5, 4, 2, 1];

    const options = {
      width: 500,
      height: 500,
      radius: 150,
      tilt: Math.PI / 9,
      initialVelocityX: 0.3,
      initialVelocityY: 0.3,
      initialRotationX: Math.PI * 0.14,
      initialRotationZ: 0,
    };

    wordSphere(canvas, texts, counts, options);

    function wordSphere(canvas, texts, counts, options) {
      const π = Math.PI;
      const {
        width = 500,
        height = 500,
        radius = 150,
        fontSize = 22,
        tilt = 0,
        initialVelocityX = 0,
        initialVelocityY = 0,
        initialRotationX = 0,
        initialRotationZ = 0,
      } = options;

      let vx = initialVelocityX,
        vy = initialVelocityY;
      let rx = initialRotationX,
        rz = initialRotationZ;

      const ctx = canvas.getContext("2d");
      ctx.textAlign = "center";

      // Hi-DPI
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(2, 2);

      let clicked = false,
        lastX,
        lastY;

      canvas.addEventListener("mousedown", (event) => {
        clicked = true;
        lastX = event.screenX;
        lastY = event.screenY;
      });
      canvas.addEventListener("mousemove", (event) => {
        if (!clicked) return;
        const dx = event.screenX - lastX;
        const dy = event.screenY - lastY;
        lastX = event.screenX;
        lastY = event.screenY;

        rz += -dy * 0.01;
        rx += dx * 0.01;

        vx = dx * 0.1;
        vy = dy * 0.1;

        if (!looping) startLoop();
      });
      canvas.addEventListener("mouseup", () => (clicked = false));
      canvas.addEventListener("mouseleave", () => (clicked = false));

      function rot(x, y, t) {
        return [x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t)];
      }

      function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let ix = 0,
          iz = 0;

        for (const text of texts) {
          const degZ = (π / (counts.length - 1)) * iz;
          const degX = (2 * π / counts[iz]) * ix;

          let x = radius * Math.sin(degZ) * Math.cos(degX);
          let y = radius * Math.sin(degZ) * Math.sin(degX);
          let z = radius * Math.cos(degZ) + 8 * (ix % 2);

          [y, z] = rot(y, z, tilt);
          [x, z] = rot(x, z, rz);
          [x, y] = rot(x, y, rx);

          const alpha = 0.6 + 0.4 * (x / radius);
          const size = fontSize + 2 + 5 * (x / radius);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; // white text

          ctx.font = `${size}px "Helvetica Neue", sans-serif`;
          ctx.fillText(text, y + width / 2, -z + height / 2);

          ix--;
          if (ix < 0) {
            iz++;
            ix = counts[iz] - 1;
          }
        }
      }

      let looping = false;
      function rendererLoop() {
        if (looping) requestAnimationFrame(rendererLoop);
        render();
        if (vx > 0) vx -= 0.01;
        if (vy > 0) vy -= 0.01;
        if (vx < 0) vx += 0.01;
        if (vy < 0) vy += 0.01;
        if (vx === 0 && vy === 0) stopLoop();
        rz += vy * 0.3;
        rx += vx * 0.3;
      }

      function startLoop() {
        looping = true;
        requestAnimationFrame(rendererLoop);
      }

      function stopLoop() {
        looping = false;
      }

      startLoop();
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      <canvas ref={canvasRef} id="canvas" />
    </div>
  );
}
