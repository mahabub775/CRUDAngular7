import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styles: []
})
export class StudentComponent implements OnInit {

  Trdelist;
  Lavellist;
  Languages;
  tap:any;
  myDate:any;
  constructor(private service:StudentService,private http:HttpClient) { 
    this.Trdelist = this.service.getTrades();
    this.Lavellist = this.service. getLavels();
    this.Languages =this.getLanguages();
  }
   
  ngOnInit() {
    this.resetForm();
  }

  FileuploadSylebus = (files) => {
    debugger;
    if (files.length === 0) {return;}
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://localhost:59890/api/FileManagement', formData)
      .subscribe(event => {
        debugger;
          let pathname:any = event;
          this.service.formdata.SyllabusFile =fileToUpload.name;
         },
      err=>{
        console.log(err);
      });
  }

  FileuploadPlan = (files) => {
    debugger;
    if (files.length === 0) { return; }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name); 
    this.http.post('http://localhost:59890/api/FileManagement', formData)
      .subscribe(event => {
        let pathname:any = event;
        this.service.formdata.TestPlanFile =fileToUpload.name;
      },
      err=>{
        console.log(err);
      });
  }
 
resetForm(form?:NgForm)
{
  if(form!=null)
    form.resetForm();
    this.service.formdata = {
      StudentID:0,
      Trade:'',
      Lavel:'',
      Language:'',
      SyllabusName:'',
      SyllabusFile:'',
      TestPlanFile:'',
      DeptOffName:'',
      ManagerName:'',
      ActiveDate: new Date("01 01 1800"),// set min date,
      ActiveDateSt:''

    };
    this.service.resetLanguageCheckBox();
}

onSubmit(from:NgForm)
{
  debugger;
  let selectedLengs = this.Languages.filter((leng) => { return leng.selected }).map((leng) => { return leng.value });
  let sLen = "";  for(let lg of selectedLengs){sLen+=lg+","} sLen = sLen.substr(0,sLen.length-1);
  from.value.Language=sLen;
  this.service.formdata.Language = sLen;
    if(this.service.formdata.StudentID==0)  
    {
      this.create(from);
    }else{
      this.update(from);
    }

}
create(from)
{
  this.service.poststudent(this.service.formdata)
  .subscribe(
    res =>{
      debugger;
      this.resetForm(from);
      alert("Save Successfully.");
      this.service.refreshList();
    },
    err=>{
      console.log(err);
    }
  )
}
update(from)
{
  this.service.putstudent(this.service.formdata).subscribe(
    res =>{
      this.resetForm(from);
      alert("Update Successfully.");
      this.service.refreshList();
    },
    err=>{
      console.log(err);
    }
  )
}

ChangeTrade()  
  {  

   var tempLavelList = this.service.getLavels();
   this.Lavellist = [];
   for(var i=0;i<tempLavelList.length;i++)
   {
    if(tempLavelList[i].tradeid==this.service.formdata.Trade){ this.Lavellist.push(tempLavelList[i]);}
   }
     
  }  

getLanguages()
{

  return [{description: 'English',value: 'EN',selected:false},
         {description: 'Chainese',value: 'CH',selected: false},
         {description: 'Thai',value: 'TH',selected: false},
        {description: 'Tamil',value: 'TM',selected: false},
        {description: 'Korean',value: 'KR',selected: false},
        { description: 'Burmese', value: 'BR', selected: false} ];
}
}
