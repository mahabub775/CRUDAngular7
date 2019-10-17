import { Component, OnInit, ViewChildren,QueryList, ElementRef } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';
import { Student } from 'src/app/shared/student.model';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styles: []
})
export class StudentListComponent implements OnInit {
  SearchingSelectedTrade;
  SearchingSelectedLavel;
  seracingTradList;
  seracingLavelList;
  constructor(private service:StudentService) { 
    debugger;
    this.seracingTradList = this.service.getTrades();
    this.seracingLavelList = this.service.getLavels();
    this.SearchingSelectedTrade = "All";this.SearchingSelectedLavel="All";
    this.service.refreshList();
  }
  ngOnInit() { }
  populateform(student:Student)
 {
      this.service.formdata =Object.assign({},student) ;  
      //Value Reset for checkbox

//      (document.getElementById('txtActiveDate') as HTMLInputElement).defaultValue  ='02 Jan 2019'; //this.service.formdata.ActiveDateSt;
      this.service.resetLanguageCheckBox();
      var oTempLanguages:any = student.Language.split(',');
      for(let item of oTempLanguages)
      {
        (document.getElementById(item) as HTMLInputElement).checked = true;
      }
 }
 deletestudent(student:Student)
 {
   debugger;
   if(!confirm("Confirm to delete ?"))return;
   this.service.deletestudent(student.StudentID)
   .subscribe(res=>{alert("Succefully Deleted.");
    this.service.refreshList();
   },
   err=>
   {
     console.log(err);
   }
   );
 }
 searchStudent()
 {
   debugger;
   this.service.searchStudents(this.SearchingSelectedTrade , this.SearchingSelectedLavel);
   
 }

 pageChanged(event){
  this.service.config.currentPage = event;
}

}
