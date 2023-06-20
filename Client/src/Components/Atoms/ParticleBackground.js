import React, { useEffect, useRef } from 'react';
import '../../Style/BackgroundLogin.css';

const ParticleBackground = () => {
    const canvasRef = useRef();
    const particles = useRef([]);
    const particleDistance = 40;
    const mouse = {
        x: undefined,
        y: undefined,
        radius: 100,
    };

    useEffect(() => {
        init();
        window.addEventListener('resize', resizeReset);
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseout', mouseout);

        return () => {
            window.removeEventListener('resize', resizeReset);
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseout', mouseout);
        };
    }, []);

    const init = () => {
        resizeReset();
        animationLoop();
    };

    const resizeReset = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        particles.current = [];
        for (
            let y = (((h - particleDistance) % particleDistance) + particleDistance) / 2;
            y < h;
            y += particleDistance
        ) {
            for (
                let x = (((w - particleDistance) % particleDistance) + particleDistance) / 2;
                x < w;
                x += particleDistance
            ) {
                particles.current.push(new Particle(x, y));
            }
        }
    };

    const animationLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        let w = canvas.width;
        let h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        drawScene(ctx);
        requestAnimationFrame(animationLoop);
    };
    

    const drawScene = (ctx) => {
        for (let i = 0; i < particles.current.length; i++) {
            particles.current[i].update(mouse);
            particles.current[i].draw(ctx);
        }
        drawLine(ctx);
    };

    const drawLine = (ctx) => {
        for (let a = 0; a < particles.current.length; a++) {
            for (let b = a; b < particles.current.length; b++) {
                let dx = particles.current[a].x - particles.current[b].x;
                let dy = particles.current[a].y - particles.current[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < particleDistance * 1.5) {
                    let opacity = 1 - distance / (particleDistance * 1.5);
                    ctx.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(particles.current[a].x, particles.current[a].y);
                    ctx.lineTo(particles.current[b].x, particles.current[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const mousemove = (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    };

    const mouseout = () => {
        mouse.x = undefined;
        mouse.y = undefined;
    };

    return <canvas className="canvas" ref={canvasRef} />;
};

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 4;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speed = (Math.random() * 25) + 5;
    }
    draw(ctx) {
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(mouse) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let directionX = forceDirectionX * force * this.speed;
        let directionY = forceDirectionY * force * this.speed;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

export default ParticleBackground;
