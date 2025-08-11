import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  connected: boolean;
  sparkle: number;
  sparkleSpeed: number;
  sparkleDirection: boolean;
  color: string;
  flashTimer: number;
  flashDuration: number;
  isFlashing: boolean;
}

const StarNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Call once to initialize
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars: Star[] = [];
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 15000); // Adjust density
    const connectionDistance = 150; // Maximum distance for connection

    // Star colors with slight variations
    const starColors = [
      '255, 255, 255', // White
      '240, 248, 255', // Alice Blue
      '255, 250, 240', // Floral White
      '248, 248, 255', // Ghost White
      '230, 230, 250', // Lavender
      '255, 240, 245', // Lavender Blush
      '176, 224, 230', // Powder Blue
      '240, 255, 255', // Azure
      '245, 255, 250'  // Mint Cream
    ];
    
    for (let i = 0; i < starCount; i++) {
      // Randomly select a color for each star
      const colorIndex = Math.floor(Math.random() * starColors.length);
      
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connected: false,
        sparkle: Math.random(),
        sparkleSpeed: 0.01 + Math.random() * 0.03,
        sparkleDirection: Math.random() > 0.5,
        color: starColors[colorIndex],
        flashTimer: Math.random() * 200, // Random timer for flashing
        flashDuration: 5 + Math.random() * 10, // Random flash duration
        isFlashing: false
      });
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reset connected status
      stars.forEach(star => {
        star.connected = false;
      });

      // Draw connections first (so they appear behind stars)
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const star1 = stars[i];
          const star2 = stars[j];
          const distance = Math.sqrt(
            Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2)
          );

          if (distance < connectionDistance) {
            // Opacity based on distance and combined sparkle of both stars
            const combinedSparkle = (star1.sparkle + star2.sparkle) / 2;
            const opacity = (1 - distance / connectionDistance) * (0.1 + combinedSparkle * 0.2);
            
            // Create gradient for connection line
            const gradient = ctx.createLinearGradient(star1.x, star1.y, star2.x, star2.y);
            gradient.addColorStop(0, `rgba(${star1.color}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${star2.color}, ${opacity})`);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 + combinedSparkle * 0.5; // Line width varies with sparkle
            ctx.moveTo(star1.x, star1.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.stroke();
            
            star1.connected = true;
            star2.connected = true;
          }
        }
      }

      // Draw stars
      stars.forEach(star => {
        // Random flash effect
        star.flashTimer -= 1;
        if (star.flashTimer <= 0 && !star.isFlashing) {
          // Start a flash
          star.isFlashing = true;
          star.flashDuration = 5 + Math.random() * 10;
        }
        
        if (star.isFlashing) {
          star.flashDuration -= 1;
          if (star.flashDuration <= 0) {
            star.isFlashing = false;
            star.flashTimer = 100 + Math.random() * 300; // Reset timer for next flash
          }
        }
        
        // Update sparkle effect
        if (star.sparkleDirection) {
          star.sparkle += star.sparkleSpeed;
          if (star.sparkle >= 1) {
            star.sparkleDirection = false;
          }
        } else {
          star.sparkle -= star.sparkleSpeed;
          if (star.sparkle <= 0.2) {
            star.sparkleDirection = true;
          }
        }
        
        ctx.beginPath();
        
        // Randomly change star size for twinkling effect
        const twinkleRadius = star.radius * (0.8 + star.sparkle * 0.5);
        ctx.arc(star.x, star.y, twinkleRadius, 0, Math.PI * 2);
        
        // Calculate brightness based on sparkle and flash state
        let brightness;
        if (star.isFlashing) {
          // Bright flash
          brightness = 0.9 + (Math.sin(Date.now() * 0.05) * 0.1);
        } else if (star.connected) {
          brightness = 0.6 + star.sparkle * 0.4;
        } else {
          brightness = 0.2 + star.sparkle * 0.3;
        }
        
        ctx.fillStyle = `rgba(${star.color}, ${brightness})`;
        
        ctx.fill();
        
        // Add glow effect for brighter stars
        if (star.sparkle > 0.7) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, twinkleRadius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${star.sparkle * 0.1})`;
          ctx.fill();
          
          // Add extra sparkle for very bright stars
          if (star.sparkle > 0.9) {
            const sparkSize = star.radius * 0.5;
            const sparkleOpacity = (star.sparkle - 0.9) * 10; // 0 to 1 range
            
            // Draw sparkle cross
            ctx.beginPath();
            ctx.moveTo(star.x - sparkSize * 2, star.y);
            ctx.lineTo(star.x + sparkSize * 2, star.y);
            ctx.moveTo(star.x, star.y - sparkSize * 2);
            ctx.lineTo(star.x, star.y + sparkSize * 2);
            ctx.strokeStyle = `rgba(${star.color}, ${sparkleOpacity})`;
            ctx.lineWidth = sparkSize * 0.5;
            ctx.stroke();
          }
        }

        // Update position
        star.x += star.vx;
        star.y += star.vy;

        // Bounce off edges
        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="star-network"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default StarNetwork;