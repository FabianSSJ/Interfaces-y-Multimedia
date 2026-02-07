import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { GraphComponent } from './components/graph/graph.component';
let AppComponent = class AppComponent {
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [RouterOutlet, HeroComponent, ReviewsComponent, GraphComponent],
        template: `
    <main>
      <!-- CRITICAL PATH: Loads instantly -->
      <app-hero />

      <!-- ISLAND 1: Heavy Reviews List -->
      <!-- Trigger: Loads when user scrolls near it -->
      @defer (on viewport) {
        <app-reviews />
      } @placeholder {
        <div class="skeleton-placeholder">
          <p>Loading Verified Reviews...</p>
        </div>
      } @loading (minimum 1s) {
        <div class="skeleton-placeholder loading">
          <div class="spinner"></div>
          <p>Fetching latest data...</p>
        </div>
      } @error {
        <p>Failed to load reviews.</p>
      }

      <!-- ISLAND 2: Heavy Interactive Graph -->
      <!-- Trigger: Loads when user clicks the button or interacts -->
      <section class="interactive-section">
        <div class="interaction-prompt">
          <h3>Explore Performance Data</h3>
          <p>Click to load the interactive visualization module (2MB JS).</p>
          <button #loadGraphBtn class="load-btn">Load Graph</button>
        </div>

        @defer (on interaction(loadGraphBtn)) {
          <app-graph />
        } @placeholder {
          <div class="graph-placeholder">
            <span class="icon">📊</span>
            <p> visualization inactive</p>
          </div>
        }
      </section>

      <!-- ISLAND 3: Footer -->
      <!-- Trigger: Loads when browser is idle -->
      @defer (on idle) {
        <footer>
          <p>&copy; 2026 1MB Challenge. Optimized for Slow 3G.</p>
        </footer>
      } @placeholder {
        <div class="footer-placeholder"></div>
      }
    </main>
  `,
        styles: [`
    main {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .skeleton-placeholder {
      height: 400px;
      background: #f1f5f9;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      border: 2px dashed #cbd5e1;
      margin: 2rem;
      border-radius: 12px;
    }

    .skeleton-placeholder.loading {
      background: #e2e8f0;
      color: #64748b;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #cbd5e1;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .interactive-section {
      padding: 4rem 2rem;
      background: #1e293b;
      color: white;
      text-align: center;
    }

    .interaction-prompt {
      margin-bottom: 2rem;
    }

    .load-btn {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 1rem;
      transition: background 0.2s;
    }

    .load-btn:hover {
      background: #2563eb;
    }

    .graph-placeholder {
      height: 300px;
      background: #334155;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      max-width: 800px;
      margin: 0 auto;
    }

    .graph-placeholder .icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      opacity: 0.5;
    }

    footer {
      text-align: center;
      padding: 2rem;
      background: #0f172a;
      color: #64748b;
      margin-top: auto;
    }

    .footer-placeholder {
      height: 80px;
      background: #0f172a;
    }
  `]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map