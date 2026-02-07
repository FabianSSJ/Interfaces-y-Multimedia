import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="graph-section">
      <h2>Live Performance Metrics</h2>
      <div class="graph-container">
        <div class="bars">
          <div class="bar-group" *ngFor="let item of data">
            <div class="bar" [style.height.%]="item.value">
              <span class="value">{{item.value}}%</span>
            </div>
            <span class="label">{{item.label}}</span>
          </div>
        </div>
        <p class="info">
          * Interactive data visualization loaded on demand.
        </p>
      </div>
    </section>
  `,
  styles: [`
    .graph-section {
      padding: 4rem 2rem;
      background: white;
      text-align: center;
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #1e293b;
    }

    .graph-container {
      max-width: 800px;
      margin: 0 auto;
      background: #1e293b;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
    }

    .bars {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      height: 300px;
      margin-bottom: 2rem;
      border-bottom: 2px solid #334155;
      padding-bottom: 1rem;
    }

    .bar-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 60px;
      height: 100%;
      justify-content: flex-end;
    }

    .bar {
      width: 100%;
      background: linear-gradient(to top, #3b82f6, #60a5fa);
      border-radius: 8px 8px 0 0;
      position: relative;
      transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      justify-content: center;
      animation: grow 1s ease-out;
    }

    .value {
      position: absolute;
      top: -25px;
      color: white;
      font-weight: bold;
      font-size: 0.9rem;
    }

    .label {
      margin-top: 1rem;
      color: #94a3b8;
      font-weight: 500;
    }

    .info {
      color: #94a3b8;
      font-size: 0.9rem;
    }

    @keyframes grow {
      from { height: 0; opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class GraphComponent implements OnInit {
  data: any[] = [];

  ngOnInit() {
    // Simulate complex calculation or heavy init
    setTimeout(() => {
      this.data = [
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 45 },
        { label: 'Mar', value: 60 },
        { label: 'Apr', value: 80 },
        { label: 'May', value: 65 },
        { label: 'Jun', value: 90 },
      ];
    }, 500); 
  }
}
