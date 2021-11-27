export class Employee {

    public id: number | undefined;
    public name: string;
    public salary: number;
    private phoneNumber : string;
    private emailId : string;


    public constructor(name: string, salary : number, phone: string, email: string, id?: number) {
        this.name = name;
        this.salary = salary;
        this.phoneNumber = phone;
        this.emailId = email;
        id === undefined ? undefined : this.id = id;
    }
}