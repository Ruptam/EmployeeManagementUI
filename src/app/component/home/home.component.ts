import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/model/employee.model';
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
    private _liveAnnouncer: LiveAnnouncer) { }
  
    ngAfterViewInit(): void {
      
    }

  ngOnInit(): void {
    this.getAllEmployee();
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
