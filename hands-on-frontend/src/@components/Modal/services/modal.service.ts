import { Injectable, Type, ViewContainerRef } from "@angular/core";
import { ModalComponent } from "../Modal.component";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  public openModal<T extends Type<any>>(viewContainer: ViewContainerRef, content: T): Promise<any> {
    const instance = viewContainer.createComponent(ModalComponent).instance;
    instance.content = content;

    return new Promise(resolve => {
      setTimeout(() => {
        console.log(instance.modalDirective.modalRef);

        resolve(instance.modalDirective.modalRef);
      }, 100);
    });
  }
}
