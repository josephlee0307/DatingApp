import { Component, OnInit, ViewChild, HostListener, Output, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;

  @ViewChild('editForm')
  editForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNoification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertiyService: AlertifyService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    // this.loadUser();

    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  loadUser() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe(
      (user: User) => {
        this.user = user;
      },
      error => {
        this.alertiyService.error(error);
      }
    );
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      () => {
        this.alertiyService.success('Profile has been saved successfully.');
        this.editForm.reset(this.user);
      },
      error => {
        this.alertiyService.error(error);
      });
  }

}
