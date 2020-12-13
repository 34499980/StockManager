import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.model';
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
  rolesData: Item[];
  sucursalData: Item[];
  fileSelected: File = null
  url: string;
  cameraImage: SafeResourceUrl;
  @ViewChild('file') file :ElementRef
  constructor(private formBuild: FormBuilder,
              private sanitizer: DomSanitizer,
              private activateRoute: ActivatedRoute,
              private userService: UserService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.rolesData = this.activateRoute.snapshot.data.roles as Item[];
    this.sucursalData = this.activateRoute.snapshot.data.sucursal as Item[];
    this.user = this.activateRoute.snapshot.data.profile as User;
    this.userControl = this.formBuild.group({
      userName: [this.user?.userName || '', [Validators.required, Validators.maxLength(50)]],
      password: [this.user?.password || '', [Validators.required, Validators.maxLength(50)]],
      first_name: [this.user?.first_name || '', [Validators.required, Validators.maxLength(50)]],
      last_name: [this.user?.last_name || '', [Validators.required, Validators.maxLength(50)]],
      bornDate: [this.user?.bornDate || '', Validators.required],
      admissionDate: [this.user?.admissionDate || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.maxLength(50)]],
      address: [this.user?.address || '', [Validators.required, Validators.maxLength(50)]],
      codPostal: [this.user?.codPostal || '', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]\d*$/)]],
      sucursal: [this.user?.idSucursal || '', Validators.required],
      role: [this.user?.idRole || '', [Validators.required, Validators.maxLength(50)]]
    });

}
validateSpinner() {
  return this.user
}
saveUsuario() {
  this.userService.saveUsuario(this.user).subscribe(() => this.toastService.success('Usuario guardado!'));
}
OnFileSelected(event){
  this.file.nativeElement.click()
  // tslint:disable-next-line: no-angle-bracket-type-assertion
  this.fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
  this.url = URL.createObjectURL(this.fileSelected);
  this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
}

}
