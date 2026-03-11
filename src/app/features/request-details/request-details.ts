import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-details',
  imports: [],
  templateUrl: './request-details.html',
  styleUrl: './request-details.scss',
})
export class RequestDetails implements OnInit {
  private route = inject(ActivatedRoute);
  requestId = '';

  ngOnInit() {
    this.requestId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('Request ID:', this.requestId);
  }
}
