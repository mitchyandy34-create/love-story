import { useEffect, useRef } from 'react';

export default function NightMode() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    const stars = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0.2) star.speed *= -1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      className="section-padding night-sky"
      style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌙</div>
        <h2 className="heading-lg" style={{ marginBottom: '30px' }}>
          If You Ever Look At The Moon...
        </h2>
        <p
          className="text-script"
          style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          "Just remember that somewhere under this same sky, there is someone who is incredibly grateful that you exist."
        </p>
        <p className="text-body" style={{ marginTop: '30px', opacity: 0.7 }}>
          Look up tonight. I'll be looking at the same stars.
        </p>
      </div>
    </section>
  );
}