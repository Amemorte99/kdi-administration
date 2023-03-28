import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-param-admin',
  templateUrl: './param-admin.component.html',
  styleUrls: ['./param-admin.component.scss']
})
export class ParamAdminComponent implements OnInit {
  show: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showContent() {
    this.show = !this.show
    console.log(this.show)
  }

}
