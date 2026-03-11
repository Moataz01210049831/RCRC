import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-details',
  imports: [],
  template: `
    <div style="padding: 24px;">
      <h2>Request Details</h2>
      <p>Request Number: <strong>{{ requestId }}</strong></p>
    </div>
  `,
})
export class RequestDetails implements OnInit {
  private route = inject(ActivatedRoute);
  requestId = '';

  ngOnInit() {
    this.requestId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('Request ID:', this.requestId);
  }
}
