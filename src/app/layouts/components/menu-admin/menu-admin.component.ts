import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/common/auth.service';
import { Goods } from 'src/app/shared/models/goods';

declare var $: any; 
@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
})
export class MenuAdminComponent implements OnInit {
  route: any;

  constructor(
    private router: Router,
    private authservice: AuthService,
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.route = this.router.url;
    }, 500);



    // if ($) {
    //   console.log('jQuery is available');
    // } else {
    //   console.log('jQuery is not available');
    // }
  }
}
