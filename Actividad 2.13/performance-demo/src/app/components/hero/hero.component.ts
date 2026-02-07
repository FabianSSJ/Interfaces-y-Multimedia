import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero">
      <div class="content">
        <h1>High Performance<br><span>Web Experiences</span></h1>
        <p>
          Optimized for every connection speed. 
          Experience the future of adaptive web design.
        </p>
        <button class="cta-button">Get Started</button>
      </div>
      <div class="visual">
        <div class="circle"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4rem 2rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      min-height: 60vh;
      overflow: hidden;
      position: relative;
    }
    
    .content {
      max-width: 600px;
      z-index: 2;
    }
    
    h1 {
      font-size: 3.5rem;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      font-weight: 800;
    }
    
    h1 span {
      background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      line-height: 1.6;
    }
    
    .cta-button {
      background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: bold;
      border-radius: 50px;
      cursor: pointer;
      color: #1a1a2e;
      transition: transform 0.2s;
    }
    
    .cta-button:hover {
      transform: translateY(-2px);
    }

    .visual {
      position: absolute;
      right: -10%;
      top: 50%;
      transform: translateY(-50%);
    }

    .circle {
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: linear-gradient(45deg, #4facfe20, #00f2fe20);
      filter: blur(60px);
    }
    
    @media (max-width: 768px) {
      .hero {
        flex-direction: column;
        text-align: center;
        padding-top: 6rem;
      }
      
      h1 { font-size: 2.5rem; }
      
      .visual {
        top: 20%;
        right: 50%;
        transform: translateX(50%);
      }
    }
  `]
})
export class HeroComponent {}
