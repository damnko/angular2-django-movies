import {
  Directive,
  Input,
  ElementRef,
  Renderer
} from '@angular/core';

@Directive({ selector: '[inputHint]' })
export class HintDirective {
  mainClass = {
    valid: 'valid',
    invalid: 'invalid'
  };

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  @Input() set inputHint(isValid: boolean | {[key: string]: boolean}) {
    // get current text
    const currentText = this.el.nativeElement.innerText;

    // clear current text and remove eventual valid clas
    this.renderer.setElementProperty(this.el.nativeElement, 'innerText', '');
    this.renderer.setElementClass(this.el.nativeElement, this.mainClass.valid, false);

    // create icon and set styles
    const icon = this.renderer.createElement(this.el.nativeElement, 'i');
    this.renderer.setElementClass(icon, 'fa', true);
    let resultClass = [];
    if (isValid) {
      resultClass = ['fa-check', this.mainClass.valid];
    } else {
      resultClass = ['fa-times', this.mainClass.invalid];
    }
    this.renderer.setElementClass(icon, resultClass[0], true);
    this.renderer.setElementClass(this.el.nativeElement, resultClass[1], true);

    // append previous text
    this.renderer.createText(this.el.nativeElement, currentText);
  }
}
