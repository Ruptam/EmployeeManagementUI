import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee.model';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  isFormDataPrePopulated: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private appService: AppService, 
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  createEmployeeForm = this.formBuilder.group({
    empName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    salary: ['', Validators.required]
  })

  ngOnInit(): void {
    if (this.data != undefined) {
      this.prepopulateEmployeeFormData()
    }
  }

  addemployee() {

    let employee = new Employee(this.createEmployeeForm.get('empName')?.value,
                this.createEmployeeForm.get('salary')?.value,
                this.createEmployeeForm.get('phone')?.value,
                this.createEmployeeForm.get('email')?.value);

    if (this.isFormDataPrePopulated) {
      employee.id = this.data.id;
      this.appService.updateEmployee(employee).subscribe(res => {
        this.onConfirm();
      })
    } else {
      this.appService.saveEmployee(employee).subscribe(res => {
          this.onConfirm();
      })
    }
  }

  private prepopulateEmployeeFormData() {
    this.createEmployeeForm.controls['empName'].setValue(this.data.name);
    this.createEmployeeForm.controls['empName'].disable();
    this.createEmployeeForm.controls['salary'].setValue(this.data.salary);
    this.createEmployeeForm.controls['phone'].setValue(this.data.phoneNumber);
    this.createEmployeeForm.controls['phone'].disable();
    this.createEmployeeForm.controls['email'].setValue(this.data.emailId);
    this.createEmployeeForm.controls['email'].disable();
    this.isFormDataPrePopulated = true;
  }

  onConfirm(): void {
    this.dialogRef.close();
  }

}
