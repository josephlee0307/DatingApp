import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {

  constructor(private alertifyService: AlertifyService) {}

  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
        return confirm('Are you sure you want to leave with saving data?');
    }
    return true;
  }
}
