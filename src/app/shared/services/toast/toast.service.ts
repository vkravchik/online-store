import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodeEnum } from '../../enums/code.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly duration = 1000;
  private readonly verticalPosition = 'bottom';
  private readonly horizontalPosition = 'right';

  constructor(private toast: MatSnackBar) { }

  public showToast(msgType: CodeEnum): void {
    const { message, panelClass } = this.generateMessage(msgType);
    this.toast.open(message, undefined, {
      duration: this.duration,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      panelClass
    });
  }


  private generateMessage(msgType: CodeEnum): { message: string; panelClass: string[] } {
    switch (msgType) {
      case CodeEnum.SUCCESS:
        return { message: 'Operation Success',  panelClass: ['toast-success'] };
      case CodeEnum.ITEM_NOT_FOUND:
        return { message: 'Sry smth went wrong. Selected Item not found',  panelClass: ['toast-warn'] };
      default:
      return { message: 'Sry smth went wrong',  panelClass: ['toast-error'] };
    }

  }
}
