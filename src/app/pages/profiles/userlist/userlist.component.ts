import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {
  usersData: Usuario[];
  userSearch: Usuario[];
  searchControl: FormControl;
  _param: any
  constructor(private actiavateRoute: ActivatedRoute) {

   }

  ngOnInit(): void {
   this.searchControl = new FormControl('');
   this.usersData = this.actiavateRoute.snapshot.data.userlist as Usuario[];
   this.userSearch = this.usersData;
   this.searchControl.valueChanges.subscribe(res =>
   this.userSearch = this.usersData.filter(x => x.userName.toLowerCase().indexOf(res) > -1)
   )
  }
}
