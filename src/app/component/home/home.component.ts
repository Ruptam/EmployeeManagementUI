import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Employee } from 'src/app/model/employee.model';
import { User } from 'src/app/model/user.model';
import { AppService } from 'src/app/service/app.service';
import { AddEmployeeComponent } from '../dialog/add-employee/add-employee.component';
import { DeleteComponent } from '../dialog/delete/delete.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog, 
    private service: AppService, 
    private changeDetector: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer, 
    private keycloak: KeycloakService) { }
  
    ngAfterViewInit(): void {
      
    }
  user: User = new User();

  public userProfile : KeycloakProfile | null = null;
  public isLoggedIn : boolean = false;
  isAdmin: boolean = false;

  async ngOnInit() {
    this.getAllEmployee();

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.user.roles = this.keycloak.getUserRoles(true);
      this.user.firstName = this.userProfile.firstName;
      this.user.lastName = this.userProfile.lastName;
      this.user.id = this.userProfile.id;
      this.user.email = this.userProfile.email;
      this.user.username = this.userProfile.username;
      sessionStorage.setItem('userdetails', JSON.stringify(this.user));
    }
    let jsonUser = sessionStorage.getItem('userdetails');
    this.user = JSON.parse(jsonUser === null ? '' : jsonUser);
    if (this.user.roles?.includes('ADMIN')) {
      this.isAdmin = true;
    }
  }


  employees : Employee[] = [];


  

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'salary', 'edit', 'delete'];
  employeeDataSource : any;

  addEmployee() {
    const addEmployeeDialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '40vw',
      height: '50vh',
      disableClose: true
    });
    addEmployeeDialogRef.afterClosed().subscribe(() => this.getAllEmployee());
  }


  getAllEmployee() {
      this.service.fetchEmployee().subscribe(res => {
        console.log(res);
        let employeeData : any = res;
        this.employees = [];
        for (let i = 0; i < employeeData.length; i++) {
          let employee : Employee = new Employee(
            employeeData[i].name,employeeData[i].salary,employeeData[i].employeePK.phoneNumber, employeeData[i].employeePK.emailId, employeeData[i].employeePK.id);
          this.employees.push(employee);
        }
        this.employeeDataSource = new MatTableDataSource<any>();
        this.employeeDataSource.data = this.employees;
        this.changeDetector.detectChanges();
      })
  }


  editEmployee(employee : any) {
    const editEmployeeDialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '40vw',
      height: '50vh',
      disableClose: true,
      data: employee
    });
    editEmployeeDialogRef.afterClosed().subscribe(() => this.getAllEmployee());
  }


  deleteEmployee(employee : any) {
    const deleteEmployeeDialogRef = this.dialog.open(DeleteComponent, {
      width: '20vw',
      height: '20vh',
      disableClose: true,
      data: employee
    });
    deleteEmployeeDialogRef.afterClosed().subscribe(() => this.getAllEmployee());
  }
}
