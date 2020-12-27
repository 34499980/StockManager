import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { User, UserGet } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Item } from 'src/app/models/item.model';
import { Sucursal } from 'src/app/models/sucural.model';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserFilter } from 'src/app/models/UserFilter.model';
import { ValueCache } from 'ag-grid-community';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RolesEnum } from 'src/app/enums/Roles.Enum';
import { AppRouting } from 'src/app/enums/AppRouting.enum';


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
  userData$: Subject<UserGet[]> = new Subject();
  @ViewChild('sidenav') sideNavFilters: MatDrawer;
  toggleIsFilterPanelOpen = true;
  constructor(private activateRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) {

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
     role:[''],
     status: [false]
   })
   this.getUsersFilter(); 
   this.loadData();  
   this.searchControl.valueChanges.subscribe(val => {
     if(!val.name?? (val.name != '' && val.name.length > 3)){
      this.loadData()
     }else if(val.name === '' || val.name === null){
      this.loadData()
     }
      
   });
  }
  Add(){
    this.router.navigate([AppRouting.Profile])
  }
  getUsersFilter(){

    this.userData$.pipe(
      switchMap(res => {
        
        const userFilter : UserFilter = {
          userName: this.searchControl.controls.name.value?? '',
          idRole: parseInt(this.searchControl.controls.role.value),
          idSucursal: parseInt(this.searchControl.controls.sucursal.value),
          active: parseInt(this.authenticationService.getCurrentRole()) !== RolesEnum.Administrador? false: Boolean(this.searchControl.controls.status.value)
        };
        return this.userService.getUserFilter(userFilter);
      })
    ).subscribe(res =>{
       this.usersData = res as UserGet[];
    });
   
  }
 clear(){
   this.searchControl.reset();
   this.loadData();
 }
  loadData() {
    this.userData$.next();
}
  toggleFilterSideNav(){
    this.toggleIsFilterPanelOpen? false:true
  }
  showAdministrativePermission(){
    return parseInt(this.authenticationService.getCurrentRole()) === RolesEnum.Administrador;
  }
}
