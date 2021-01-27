import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouting } from 'src/app/enums/AppRouting.enum';

@Component({
  selector: 'app-dispatch-detail',
  templateUrl: './dispatch-detail.component.html',
  styleUrls: ['./dispatch-detail.component.scss']
})
export class DispatchDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  cancel() {
    this.router.navigate([AppRouting.DispatchList])
  }
  

}
