import React, { Component } from 'react';
import '../../Style/BackgroundLogin.css';

class ParticleBackground extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.particles = [];
        this.particleDistance = 40;
        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 100,
        };
    }

    componentDidMount() {
        this.init();
        window.addEventListener('resize', this.resizeReset);
        window.addEventListener('mousemove', this.mousemove);
        window.addEventListener('mouseout', this.mouseout);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeReset);
        window.removeEventListener('mousemove', this.mousemove);
        window.removeEventListener('mouseout', this.mouseout);
    }

    init = () => {
        this.resizeReset();
        this.animationLoop();
    };

    resizeReset = () => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        this.particles = [];
        for (
            let y = (((h - this.particleDistance) % this.particleDistance) + this.particleDistance) / 2;
            y < h;
            y += this.particleDistance
        ) {
            for (
                let x = (((w - this.particleDistance) % this.particleDistance) + this.particleDistance) / 2;
                x < w;
                x += this.particleDistance
            ) {
                this.particles.push(new Particle(x, y));
            }
        }
    };

    animationLoop = () => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = canvas.width;
        let h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        this.drawScene(ctx);
        requestAnimationFrame(this.animationLoop);
    };

    drawScene = (ctx) => {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.mouse);
            this.particles[i].draw(ctx);
        }
        this.drawLine(ctx);
    };

    drawLine = (ctx) => {
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                let dx = this.particles[a].x - this.particles[b].x;
                let dy = this.particles[a].y - this.particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.particleDistance * 1.5) {
                    let opacity = 1 - distance / (this.particleDistance * 1.5);
                    ctx.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    mousemove = (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
    };

    mouseout = () => {
        this.mouse.x = undefined;
        this.mouse.y = undefined;
    };

    render() {
        return <canvas className="canvas" ref={this.canvasRef} />;
    }
}

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

