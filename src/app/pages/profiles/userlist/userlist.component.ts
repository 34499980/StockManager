import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { User, UserGet } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Item } from 'src/app/models/item.model';
import { Sucursal } from 'src/app/models/sucural.model';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit {
  usersData: UserGet[];
  userSearch: UserGet[];
  searchControl: FormGroup;
  rolesData: Item[];
  sucursalData: Sucursal[];
  options: FormGroup;
  _param: any
  @ViewChild('sidenav') sideNavFilters: MatDrawer;
  toggleIsFilterPanelOpen = false;
  constructor(private activateRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {

   }

  ngOnInit(): void {
    this.rolesData = this.activateRoute.snapshot.data.roles as Item[];
    this.sucursalData = this.activateRoute.snapshot.data.sucursal as Sucursal[];
    this.options = this.formBuilder.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
   this.searchControl = this.formBuilder.group({
     name:[''],
     sucursal:[''],
     role:['']
   })
   this.usersData = this.activateRoute.snapshot.data.userlist as UserGet[];
   this.userSearch = this.usersData;
   this.searchControl.controls.name.valueChanges.subscribe(res =>
   this.userSearch = this.usersData.filter(x => x.userName.toLowerCase().indexOf(res) > -1)
   )
   this.searchControl.controls.role.valueChanges.subscribe(res =>
    this.userSearch = this.usersData.filter(x => x.idRole == res)
    )
    this.searchControl.controls.sucursal.valueChanges.subscribe(res =>
      this.userSearch = this.usersData.filter(x => x.idSucursal == res)
      )
  }
  toggleFilterSideNav(){
    this.toggleIsFilterPanelOpen? false:true
  }
}
