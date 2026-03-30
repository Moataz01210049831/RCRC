import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  size       = input<'sm' | 'md' | 'lg'>('md');
  label      = input<string>('Loading...');
  overlay    = input<boolean>(false);
  fullscreen = input<boolean>(false);
}
