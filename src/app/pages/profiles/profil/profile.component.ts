import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { RolesEnum } from 'src/app/enums/Roles.Enum';
import { Country } from 'src/app/models/country.model';
import { Item } from 'src/app/models/item.model';
import { Office } from 'src/app/models/office.model';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userControl: FormGroup;
  user: User;
  countriesData: Country[];
  rolesData: Item[];
  officeData: Office[];
  fileSelected: File = null
  url: string;
  cameraImage: SafeResourceUrl;
  image: string;
  @ViewChild('file') file :ElementRef
  constructor(private formBuild: FormBuilder,
              private sanitizer: DomSanitizer,
              private activateRoute: ActivatedRoute,
              private userService: UserService,
              private toastService: ToastService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private translate: TranslateService,) { }

  ngOnInit(): void {
    this.image = '../../../../assets/userEmpty.jpg'
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.rolesData = this.activateRoute.snapshot.data.roles as Item[];
    this.officeData = this.activateRoute.snapshot.data.office as Office[];
    this.user = this.activateRoute.snapshot.data.profile as User;
    this.userControl = this.formBuild.group({
      userName: [this.user?.userName || '', [Validators.required, Validators.maxLength(50)]],
      password: [this.user?.password || '', [Validators.required, Validators.maxLength(50)]],
      first_name: [this.user?.first_name || '', [Validators.required, Validators.maxLength(50)]],
      last_name: [this.user?.last_name || '', [Validators.required, Validators.maxLength(50)]],
      dateBorn: [this.user?.dateBorn || '', Validators.required],
      dateAdmission: [this.user?.dateAdmission || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.maxLength(50)]],
      address: [this.user?.address || '', [Validators.required, Validators.maxLength(50)]],
      postalCode: [this.user?.postalCode || '', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]\d*$/)]],
      office: [this.user?.idOffice || '', Validators.required],
      role: [this.user?.idRole || '', [Validators.required, Validators.maxLength(50)]],
      state:[this.user?.active || false],
      country: [this.user?.idCountry || '', Validators.required],
    });

}
validateSpinner() {
  return this.user 
}
saveUsuario() {
  const userPost: User ={
    id: this.user? this.user.id: 0,
    address: this.userControl.controls.address.value,
    userName: this.userControl.controls.userName.value,
    password: this.userControl.controls.password.value,
    first_name: this.userControl.controls.first_name.value,
    last_name: this.userControl.controls.last_name.value,
    dateBorn: this.userControl.controls.dateBorn.value,
    dateAdmission: this.userControl.controls.dateAdmission.value,
    email: this.userControl.controls.email.value,
    postalCode: parseInt(this.userControl.controls.postalCode.value, 10),
    idOffice: parseInt(this.userControl.controls.office.value, 10),
    idRole: parseInt(this.userControl.controls.role.value, 10),
    idCountry: parseInt(this.userControl.controls.country.value, 10),
    active: Boolean(this.userControl.controls.role.value)
    

  }
  this.userService.saveUsuario(userPost).subscribe(() => {  
  this.toastService.success(this.translate.instant( this.user?'USERS.ACTIONS.UPDATE': 'USERS.ACTIONS.SAVE',{user: this.userControl.controls.userName.value})),
  this.router.navigate([AppRouting.UserList])
  });
}
OnFileSelected(event){
  this.file.nativeElement.click()
  // tslint:disable-next-line: no-angle-bracket-type-assertion
  this.fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
  console.log(this.fileSelected)
  this.url = URL.createObjectURL(this.fileSelected);
  this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
}
//Show methods
showPermissionAdmin(){
  return parseInt(this.authenticationService.getCurrentRole()) === RolesEnum.Administrador && this.user && !this.user?.active;
}

}
