import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../../Model/Customer';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  saveButton:boolean=true;
  formValue!:FormGroup;
  Customer:Customer=new Customer;
  allCustomers:any=[];
  constructor(private formBuilder:FormBuilder,private _api:ApiService,private _auth:AuthService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      customerName:[''],
      projectName:[''],
      globalMaster:[''],
      indicator:[''],
      technicalPerson:[''],
      forcastGenrated:[''],
    })
    this.getCustomerData()
  }
  addCustomerBtn(){
    this.formValue.reset()
  }
  addCustomer(){
    this.Customer.customerName=this.formValue.value.customerName;
    this.Customer.projectName=this.formValue.value.projectName;
    this.Customer.globalMaster=this.formValue.value.globalMaster;
    this.Customer.technicalPerson=this.formValue.value.technicalPerson;
    this.Customer.forcastGenrated=this.formValue.value.forcastGenrated;
    this.Customer. indicator=this.formValue.value. indicator;
    this._api.postCustomers(this.Customer).subscribe(res=>{
      let ref = document.getElementById("close-modal");
      this.formValue.reset()
      ref?.click();
      this.getCustomerData()
    },
    err=>{
      alert("wrong")
    }
    )
  }
  deleteCustomer(id:any){

    this._api.deleteCustomers(id).subscribe(res=>{
      this.getCustomerData()
    })
    this.getCustomerData()
  }
  getCustomerData(){

     this._api.getCustomers().subscribe(res=>{
      this.allCustomers=res;


     })
  }
  showRecord(customer:any){
     this.Customer.id=customer.id;
     this.formValue.controls['customerName'].setValue(customer.customerName)
     this.formValue.controls['projectName'].setValue(customer.projectName)
     this.formValue.controls['globalMaster'].setValue(customer.globalMaster)
     this.formValue.controls['indicator'].setValue(customer.indicator)
     this.formValue.controls['technicalPerson'].setValue(customer.technicalPerson)
     this.formValue.controls['forcastGenrated'].setValue(customer.forcastGenrated)
  }
  onUpdate(customer:any){

     this.Customer.id=customer.id;
     this.formValue.controls['customerName'].setValue(customer.customerName)
     this.formValue.controls['projectName'].setValue(customer.projectName)
     this.formValue.controls['globalMaster'].setValue(customer.globalMaster)
     this.formValue.controls['indicator'].setValue(customer.indicator)
     this.formValue.controls['technicalPerson'].setValue(customer.technicalPerson)
     this.formValue.controls['forcastGenrated'].setValue(customer.forcastGenrated)
  }


  logout(): void {
    this._auth.logout();
  }
  updateCustomer(){
    this.Customer.customerName=this.formValue.value.customerName;
    this.Customer.projectName=this.formValue.value.projectName;
    this.Customer.globalMaster=this.formValue.value.globalMaster;
    this.Customer.technicalPerson=this.formValue.value.technicalPerson;
    this.Customer.forcastGenrated=this.formValue.value.forcastGenrated;
    this.Customer. indicator=this.formValue.value. indicator;
    this._api.updateCustomers(this.Customer,this.Customer.id).subscribe(res=>{

      this.getCustomerData()
      let ref = document.getElementById("close-modal");
      this.formValue.reset()
      ref?.click();
    },
    err=>{
      alert("wrong")
    }
    )
  }

}
