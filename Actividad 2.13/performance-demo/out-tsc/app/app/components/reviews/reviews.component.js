import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
let ReviewsComponent = class ReviewsComponent {
    constructor() {
        this.reviews = [];
    }
    ngOnInit() {
        // Simulate heavy data processing
        const heavyCompilation = new Array(5000000).fill(0).map((_, i) => Math.sqrt(i));
        console.log('Heavy calculation done', heavyCompilation[0]);
        this.reviews = [
            { name: "Sarah Johnson", text: "Incredible performance improvement on my slow connection." },
            { name: "Michael Chen", text: "The island architecture really makes a difference." },
            { name: "Emma Davis", text: "Finally, a site that doesn't freeze my entry-level phone." },
            { name: "James Wilson", text: "Hydration is seamless. Great engineering work." },
            { name: "Maria Garcia", text: "Loading feels instant even on 3G." },
            { name: "David Brown", text: "Best implementation of @defer I've seen." },
        ];
    }
};
ReviewsComponent = __decorate([
    Component({
        selector: 'app-reviews',
        standalone: true,
        imports: [CommonModule],
        template: `
    <section class="reviews-section">
      <h2>What Users Say</h2>
      <div class="reviews-grid">
        <div class="review-card" *ngFor="let review of reviews">
          <div class="avatar">{{ review.name.charAt(0) }}</div>
          <div class="review-content">
            <h3>{{ review.name }}</h3>
            <div class="stars">★★★★★</div>
            <p>{{ review.text }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
        styles: [`
    .reviews-section {
      padding: 4rem 2rem;
      background: #f8fafc;
    }
    
    h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #1e293b;
    }
    
    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .review-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      display: flex;
      gap: 1rem;
      animation: fadeIn 0.5s ease-out;
    }
    
    .avatar {
      width: 50px;
      height: 50px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      flex-shrink: 0;
    }
    
    .review-content h3 {
      margin: 0;
      color: #1e293b;
    }
    
    .stars {
      color: #f59e0b;
      margin: 0.5rem 0;
    }
    
    p {
      color: #64748b;
      line-height: 1.5;
      margin: 0;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
    })
], ReviewsComponent);
export { ReviewsComponent };
//# sourceMappingURL=reviews.component.js.map