
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './CardStream.css';

// --- Helper Functions ---
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- CardStream Controller Logic ---
class CardStreamController {
    container: HTMLElement;
    cardLine: HTMLElement;
    speedIndicator: HTMLElement | null;
    position = 0;
    velocity = 60;
    direction = -1;
    isAnimating = true;
    isDragging = false;
    lastTime = 0;
    lastMouseX = 0;
    mouseVelocity = 0;
    friction = 0.95;
    minVelocity = 20;
    containerWidth = 0;
    cardLineWidth = 0;
    animationFrameId: number | null = null;

    constructor(containerEl: HTMLElement, cardLineEl: HTMLElement, speedIndicatorEl: HTMLElement | null) {
        this.container = containerEl;
        this.cardLine = cardLineEl;
        this.speedIndicator = speedIndicatorEl;
        this.init();
    }

    init() {
        this.populateCardLine();
        this.calculateDimensions();
        this.setupEventListeners();
        this.updateCardPosition();
        this.animate();
        this.startPeriodicUpdates();
    }

    // Generate the scanner code effect text
    generateCode(width: number, height: number) {
        const library = [
            "const SCAN_WIDTH = 8;", "const FADE_ZONE = 35;", "const MAX_PARTICLES = 2500;",
            "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
            "function lerp(a, b, t) { return a + (b - a) * t; }",
            "const now = () => performance.now();",
            "class Particle { constructor(x,y) { this.x=x; this.y=y; } }",
            "const scanner = { x: window.innerWidth/2, width: 8 };",
            "ctx.globalCompositeOperation = 'lighter';",
            "if (state.intensity > 1) { scanner.glow += 0.01; }"
        ];

        // Fill with random pseudo-code
        for (let i = 0; i < 30; i++) library.push(`const v${i} = Math.random() * ${randInt(10, 99)};`);

        let flow = library.join(" ");
        const totalChars = width * height;
        while (flow.length < totalChars + width) {
            flow += " " + library[Math.floor(Math.random() * library.length)];
        }

        let out = "";
        let offset = 0;
        for (let row = 0; row < height; row++) {
            let line = flow.slice(offset, offset + width);
            if (line.length < width) line = line + " ".repeat(width - line.length);
            out += line + "\n";
            offset += width;
        }
        return out;
    }

    populateCardLine() {
        this.cardLine.innerHTML = "";
        // Using placeholder images or Um Kalthoum images if suitable, adhering to user's request for "image section"
        const cardImages = [
            "/images/image.png",
            "/images/image copy.png",
            "/images/image copy 2.png",
            "/images/image copy 3.png",
            "/images/image copy 4.png",
            "/images/image copy 5.png",
        ];

        for (let i = 0; i < 12; i++) {
            const wrapper = document.createElement("div");
            wrapper.className = "card-wrapper";

            const normalCard = document.createElement("div");
            normalCard.className = "card card-normal";
            const img = document.createElement("img");
            img.className = "card-image";
            img.src = cardImages[i % cardImages.length];
            normalCard.appendChild(img);

            const asciiCard = document.createElement("div");
            asciiCard.className = "card card-ascii";
            const asciiContent = document.createElement("div");
            asciiContent.className = "ascii-content";

            // Calculate dimensions approx
            const charWidth = 6;
            const lineHeight = 10;
            const cols = Math.floor(400 / charWidth);
            const rows = Math.floor(250 / lineHeight);
            asciiContent.textContent = this.generateCode(cols, rows);

            asciiCard.appendChild(asciiContent);
            wrapper.appendChild(normalCard);
            wrapper.appendChild(asciiCard);
            this.cardLine.appendChild(wrapper);
        }
    }

    calculateDimensions() {
        this.containerWidth = this.container.offsetWidth;
        const cardCount = this.cardLine.children.length;
        // 400px width + 60px gap
        this.cardLineWidth = (400 + 60) * cardCount;
    }

    setupEventListeners() {
        this.cardLine.addEventListener("mousedown", (e) => this.startDrag(e));
        window.addEventListener("mousemove", this.boundOnDrag);
        window.addEventListener("mouseup", this.boundEndDrag);
        window.addEventListener("resize", () => this.calculateDimensions());
    }

    boundOnDrag = (e: MouseEvent) => this.onDrag(e);
    boundEndDrag = () => this.endDrag();

    startDrag(e: MouseEvent) {
        if (e.button !== 0) return; // Only left click
        e.preventDefault();
        this.isDragging = true;
        this.isAnimating = false;
        this.lastMouseX = e.clientX;
        this.mouseVelocity = 0;
        this.cardLine.classList.add("dragging");
    }

    onDrag(e: MouseEvent) {
        if (!this.isDragging) return;
        const deltaX = e.clientX - this.lastMouseX;
        this.position += deltaX;
        this.mouseVelocity = deltaX * 60;
        this.lastMouseX = e.clientX;
        this.updateCardPosition();
    }

    endDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.cardLine.classList.remove("dragging");
        if (Math.abs(this.mouseVelocity) > this.minVelocity) {
            this.velocity = Math.abs(this.mouseVelocity);
            this.direction = this.mouseVelocity > 0 ? 1 : -1;
        } else {
            this.velocity = 60;
        }
        this.isAnimating = true;
    }

    animate() {
        const currentTime = performance.now();
        // Delta time in seconds, capped
        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        if (this.isAnimating && !this.isDragging) {
            if (this.velocity > this.minVelocity) {
                this.velocity *= this.friction;
            } else {
                this.velocity = Math.max(this.minVelocity, this.velocity);
            }
            this.position += this.velocity * this.direction * deltaTime;
            this.updateCardPosition();

            if (this.speedIndicator) {
                this.speedIndicator.textContent = Math.round(this.velocity).toString();
            }
        }
        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }

    updateCardPosition() {
        if (this.position < -this.cardLineWidth) this.position = this.containerWidth;
        if (this.position > this.containerWidth) this.position = -this.cardLineWidth;
        this.cardLine.style.transform = `translateX(${this.position}px)`;
        this.updateCardClipping();
    }

    updateCardClipping() {
        const scannerX = window.innerWidth / 2;
        // We assume scanner is fixed at center
        const scannerWidth = 4;
        const scannerLeft = scannerX - scannerWidth / 2;
        const scannerRight = scannerX + scannerWidth / 2;

        const wrappers = this.cardLine.querySelectorAll(".card-wrapper");
        wrappers.forEach((wrapper) => {
            const rect = wrapper.getBoundingClientRect();
            const cardLeft = rect.left;
            const cardRight = rect.right;
            const cardWidth = rect.width;

            const normalCard = wrapper.querySelector(".card-normal") as HTMLElement;
            const asciiCard = wrapper.querySelector(".card-ascii") as HTMLElement;

            if (cardLeft < scannerRight && cardRight > scannerLeft) {
                // Intersecting
                const scanIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
                const scanIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

                const normalClipRight = (scanIntersectLeft / cardWidth) * 100;
                const asciiClipLeft = (scanIntersectRight / cardWidth) * 100;

                normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
                asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);

                // Add scan effect flash if needed
                if (!wrapper.getAttribute("data-scanned") && scanIntersectLeft > 0) {
                    wrapper.setAttribute("data-scanned", "true");
                    // create scan div logic here if desired
                }
            } else {
                if (cardRight < scannerLeft) {
                    normalCard.style.setProperty("--clip-right", "100%");
                    asciiCard.style.setProperty("--clip-left", "100%");
                } else if (cardLeft > scannerRight) {
                    normalCard.style.setProperty("--clip-right", "0%");
                    asciiCard.style.setProperty("--clip-left", "0%");
                }
                wrapper.removeAttribute("data-scanned");
            }
        });
    }

    startPeriodicUpdates() {
        setInterval(() => {
            const asciiEls = this.cardLine.querySelectorAll(".ascii-content");
            asciiEls.forEach(el => {
                if (Math.random() < 0.1) {
                    el.textContent = this.generateCode(Math.floor(400 / 6), Math.floor(250 / 10));
                }
            });
        }, 200);
    }

    destroy() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener("mousemove", this.boundOnDrag);
        window.removeEventListener("mouseup", this.boundEndDrag);
    }
}

// --- Particle System (Three.js) ---
class ParticleSystem {
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points | null = null;
    canvas: HTMLCanvasElement;
    animationId: number | null = null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, 125, -125, 1, 1000);
        this.camera.position.z = 100;
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, 250);
        this.initParticles();
        this.animate();
    }

    initParticles() {
        const count = 400;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        // Create texture
        const texCanvas = document.createElement("canvas");
        texCanvas.width = 32; texCanvas.height = 32;
        const ctx = texCanvas.getContext("2d")!;
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "#fff");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(16, 16, 16, 0, Math.PI * 2); ctx.fill();
        const texture = new THREE.CanvasTexture(texCanvas);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
            positions[i * 3 + 2] = 0;
            sizes[i] = Math.random() * 8 + 2;
            colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
        }
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 5,
            map: texture,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < 400; i++) {
                positions[i * 3] += 0.5; // move right
                if (positions[i * 3] > window.innerWidth / 2 + 100) positions[i * 3] = -window.innerWidth / 2 - 100;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.renderer.dispose();
    }
}

// --- Main Component ---
export const CardStream: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardLineRef = useRef<HTMLDivElement>(null);
    const particleCanvasRef = useRef<HTMLCanvasElement>(null);
    const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!containerRef.current || !cardLineRef.current || !particleCanvasRef.current) return;

        // Initialize systems
        const controller = new CardStreamController(
            containerRef.current,
            cardLineRef.current,
            null // Removed speed indicator
        );
        const particles = new ParticleSystem(particleCanvasRef.current);

        return () => {
            controller.destroy();
            particles.destroy();
        };
    }, []);

    return (
        <div className="card-stream-section relative">
            <div className="container" ref={containerRef}>
                <canvas id="particleCanvas" ref={particleCanvasRef} className="absolute inset-0"></canvas>
                <canvas id="scannerCanvas" ref={scannerCanvasRef} className="absolute inset-0"></canvas>

                <div className="scanner"></div>

                <div className="card-stream">
                    <div className="card-line" ref={cardLineRef} id="cardLine"></div>
                </div>
            </div>

            {/* Removed controls and speed indicator */}
        </div>
    );
};
