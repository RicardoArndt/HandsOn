import { Component, Directive, Input, OnChanges, TemplateRef, Type, ViewContainerRef } from "@angular/core";

@Component({
  selector: "hands-on-no-component",
  template: ""
})
export class NoComponent { }

@Directive({
  selector: "[modalContent]"
})
export class ModalContentDirective implements OnChanges {
  @Input() public modalContent: Type<Component> = NoComponent;

  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>
  ) { }

  ngOnChanges(): void {
    this.viewContainer.createComponent(this.modalContent);
  }
}
