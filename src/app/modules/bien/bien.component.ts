import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/shared/common/shareddata.service';

@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.scss'],
})
export class BienComponent implements OnInit {
  isModalOpen: boolean = false;
  canPrintImage : boolean = false;

  constructor(private shareddataService: ShareddataService) {}

  ngOnInit(): void {
     this.shareddataService.currentBoolVariable.subscribe((value) => {
       // we used  the received boolean value in the sidebar component
       this.isModalOpen = value;
       console.log(value);
     });
     this.shareddataService.currentBackgroundBoolVariable.subscribe((value) => {
       // we used  the received boolean value in the sidebar component
       this.canPrintImage = value;
       console.log(value);
     });
   }

}
