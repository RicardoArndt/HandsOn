import { Injectable, Type, ViewContainerRef } from "@angular/core";
import { ModalComponent } from "../Modal.component";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  private viewContainer!: ViewContainerRef;

  public openModal<T extends Type<any>>(viewContainer: ViewContainerRef, content: T): Promise<any> {
    this.viewContainer = viewContainer;

    const instance = viewContainer.createComponent(ModalComponent).instance;
    instance.content = content;

    return new Promise(resolve => {
      setTimeout(() => {
        setTimeout(() => {
          instance.modalDirective.modalRef.initialize();
        }, 100);

        resolve(instance.modalDirective.modalRef);
      }, 100);
    });
  }

  public closeModal() {
    this.viewContainer?.clear();
  }
}
