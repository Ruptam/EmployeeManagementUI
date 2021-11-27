import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  private url = environment.url;

  fetchEmployee() {
    return this.http.get(this.url+"employee");
  }

  saveEmployee(employee : Employee) {
    return this.http.post(this.url+"employee", employee);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.url+"employee?salary="+employee.salary+"&id="+employee.id,{});
  }

  deleteEmployee(employee: Employee) {
    return this.http.delete(this.url+"employee/"+ employee.id);
  }
}
