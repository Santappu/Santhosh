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

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  trail: {x: number, y: number}[];
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

    // Create stars with higher density for space background
    const stars: Star[] = [];
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 10000); // Increased density
    const connectionDistance = 180; // Increased maximum distance for connection
    
    // Create shooting stars
    const shootingStars: ShootingStar[] = [];
    // const maxShootingStars = 3; // Maximum number of shooting stars at once

    // Star colors with more vibrant variations for space theme
    const starColors = [
      '255, 255, 255', // White
      '240, 248, 255', // Alice Blue
      '255, 250, 240', // Floral White
      '248, 248, 255', // Ghost White
      '230, 230, 250', // Lavender
      '255, 240, 245', // Lavender Blush
      '176, 224, 230', // Powder Blue
      '240, 255, 255', // Azure
      '245, 255, 250', // Mint Cream
      '173, 216, 230', // Light Blue
      '135, 206, 250', // Light Sky Blue
      '100, 149, 237', // Cornflower Blue
      '147, 112, 219', // Medium Purple
      '138, 43, 226',  // Blue Violet
      '221, 160, 221', // Plum
      '255, 215, 0'    // Gold (for special stars)
    ];
    
    // Add some nebula-like effects
    const drawNebula = () => {
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 50 + Math.random() * 150;
        
        const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        
        // Random nebula color
        const hue = Math.floor(Math.random() * 60) + 220; // Blue to purple range
        nebulaGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.1)`);
        nebulaGradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, 0.05)`);
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }
    };
    
    // Draw nebula effects
    drawNebula();
    
    for (let i = 0; i < starCount; i++) {
      // Randomly select a color for each star
      const colorIndex = Math.floor(Math.random() * starColors.length);
      
      // Create more varied star sizes with some larger stars
      const isBrightStar = Math.random() > 0.97;
      const radius = isBrightStar ? 
        Math.random() * 2.5 + 1.5 : // Larger stars
        Math.random() * 1.5 + 0.5;  // Regular stars
      
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connected: false,
        sparkle: Math.random(),
        sparkleSpeed: 0.01 + Math.random() * 0.05, // Increased max sparkle speed
        sparkleDirection: Math.random() > 0.5,
        color: isBrightStar ? '255, 215, 0' : starColors[colorIndex], // Gold for bright stars
        flashTimer: Math.random() * 200, // Random timer for flashing
        flashDuration: 5 + Math.random() * 15, // Longer flash duration
        isFlashing: false
      });
    }

    // Animation function
    const animate = () => {
      // Create space background gradient instead of clearing
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, 'rgba(10, 10, 30, 1)');
      bgGradient.addColorStop(0.5, 'rgba(20, 10, 40, 1)');
      bgGradient.addColorStop(1, 'rgba(30, 10, 60, 1)');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
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
        // Enhanced random flash effect
        star.flashTimer -= 1;
        if (star.flashTimer <= 0 && !star.isFlashing) {
          // Start a flash
          star.isFlashing = true;
          star.flashDuration = 5 + Math.random() * 15; // Longer flash duration
        }
        
        if (star.isFlashing) {
          star.flashDuration -= 1;
          if (star.flashDuration <= 0) {
            star.isFlashing = false;
            // More frequent flashing for a more dynamic space background
            star.flashTimer = 50 + Math.random() * 200; // Reduced timer for next flash
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
        
        // Enhanced glow effect for brighter stars
        if (star.sparkle > 0.7) {
          // Larger outer glow
          ctx.beginPath();
          ctx.arc(star.x, star.y, twinkleRadius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${star.sparkle * 0.1})`;
          ctx.fill();
          
          // Medium glow
          ctx.beginPath();
          ctx.arc(star.x, star.y, twinkleRadius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${star.sparkle * 0.2})`;
          ctx.fill();
          
          // Add extra sparkle for very bright stars
          if (star.sparkle > 0.85) {
            const sparkSize = star.radius * 0.8;
            const sparkleOpacity = (star.sparkle - 0.85) * 6.67; // 0 to 1 range
            
            // Draw sparkle cross with more rays
            ctx.beginPath();
            // Horizontal ray
            ctx.moveTo(star.x - sparkSize * 3, star.y);
            ctx.lineTo(star.x + sparkSize * 3, star.y);
            // Vertical ray
            ctx.moveTo(star.x, star.y - sparkSize * 3);
            ctx.lineTo(star.x, star.y + sparkSize * 3);
            // Diagonal rays
            ctx.moveTo(star.x - sparkSize * 2, star.y - sparkSize * 2);
            ctx.lineTo(star.x + sparkSize * 2, star.y + sparkSize * 2);
            ctx.moveTo(star.x - sparkSize * 2, star.y + sparkSize * 2);
            ctx.lineTo(star.x + sparkSize * 2, star.y - sparkSize * 2);
            
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

      // Handle shooting stars
      // Randomly create new shooting stars
      // if (shootingStars.length < maxShootingStars && Math.random() < 0.02) {
      //   const angle = Math.random() * Math.PI / 4 + Math.PI / 4; // Angle between PI/4 and PI/2
      //   shootingStars.push({
      //     x: Math.random() * canvas.width,
      //     y: 0,
      //     length: 50 + Math.random() * 100,
      //     speed: 5 + Math.random() * 15,
      //     angle: angle,
      //     opacity: 0.7 + Math.random() * 0.3,
      //     active: true,
      //     trail: []
      //   });
      // }

      // Update and draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        
        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        
        // Add current position to trail
        star.trail.push({x: star.x, y: star.y});
        
        // Limit trail length
        if (star.trail.length > 20) {
          star.trail.shift();
        }
        
        // Draw shooting star trail
        if (star.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(star.trail[0].x, star.trail[0].y);
          
          for (let j = 1; j < star.trail.length; j++) {
            ctx.lineTo(star.trail[j].x, star.trail[j].y);
          }
          
          // Create gradient for trail
          const gradient = ctx.createLinearGradient(
            star.trail[0].x, star.trail[0].y,
            star.trail[star.trail.length-1].x, star.trail[star.trail.length-1].y
          );
          
          gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
          gradient.addColorStop(0.4, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Remove if out of bounds
        if (star.x < 0 || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(i, 1);
        }
      }
      
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