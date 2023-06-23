import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { Priority } from '../models/priority';

@Directive({
  selector: '[appDot]',
})
export class DotDirective {
  @Input('appDot') priority!: Priority;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setPriorityClass();
  }

  setPriorityClass() {
    switch (this.priority.toLowerCase()) {
      case Priority.High:
        this.renderer.addClass(this.elementRef.nativeElement, 'high');
        break;
      case Priority.Medium:
        this.renderer.addClass(this.elementRef.nativeElement, 'medium');
        break;
      case Priority.Low:
        this.renderer.addClass(this.elementRef.nativeElement, 'low');
        break;
      default:
        break;
    }
  }
}
