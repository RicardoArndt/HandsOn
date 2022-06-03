import { Component, Injectable, Type, ViewContainerRef } from "@angular/core";
import { ModalComponent } from "../Modal.component";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  public openModal<T extends Type<Component>>(viewContainer: ViewContainerRef, content: T): ModalComponent {
    const instance = viewContainer.createComponent(ModalComponent).instance;
    instance.content = content;

    return instance;
  }
}
