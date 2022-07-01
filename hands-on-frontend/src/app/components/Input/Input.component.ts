import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { BehaviorSubject, debounceTime, skip, Subscription } from "rxjs";

@Component({
  selector: "hands-on-input",
  styleUrls: ["./Input.scss"],
  template: `
    <div class="input">
      <input [(ngModel)]="value" type="text" />
      <span class="material-icons">
        search
      </span>
    </div>
  `
})
export class InputComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private _value: string = "";

  @Output()
  private valueChange: EventEmitter<string> = new EventEmitter();

  private filter: BehaviorSubject<string> = new BehaviorSubject<string>("");

  get value(): string {
    return this._value;
  }

  @Input()
  set value(v: string) {
    if(this._value === v) {
      return;
    }
    this._value = v;
    this.filter.next(v);
  }

  public ngOnInit(): void {
    const filterSubscription = this.filter.pipe(debounceTime(1000), skip(1))
      .subscribe(value => value != undefined ? this.valueChange.emit(value) : null);
    this.subscriptions.push(filterSubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
