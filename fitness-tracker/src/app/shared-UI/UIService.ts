import { Subject } from "rxjs";

export class UIService {
    isLoadingChanged = new Subject<boolean>();
}