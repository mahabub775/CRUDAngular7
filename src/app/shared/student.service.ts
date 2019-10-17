import { Student } from './student.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export class StudentService {
  formdata:Student
  readonly rootURI = 'http://localhost:59890/api';
  list:Student[];
  httpClient: any;
  config: any;
  constructor(private http:HttpClient) { 
    
  }
  
  poststudent(formdata:Student)
  {
    debugger;
    return this.http.post(this.rootURI+'/Student',formdata);
  }

putstudent(formdata:Student)
{
  debugger;
  return this.http.put(this.rootURI+'/Student/'+this.formdata.StudentID,formdata);
}
deletestudent(id:number)
{
  debugger;
 return this.http.delete(this.rootURI+'/Student/'+id);
}
  refreshList()
  {
   this.http.get(this.rootURI+'/Student').toPromise()
   .then(
    res => { // Success
       debugger;
      this.list=res as Student[];
      this.config = {
        itemsPerPage:10,
        currentPage: 1,
        totalItems: this.list.length
      };
    } );
  }

  searchStudents(SearchingSelectedTrade, SearchingSelectedLavel)
  {
     this.http.get(this.rootURI+'/Student/'+SearchingSelectedTrade+'/'+SearchingSelectedLavel).toPromise()
     .then( res => { 
        this.list=res as Student[];
        this.config = {
          itemsPerPage:10,
          currentPage: 1,
          totalItems: this.list.length
        };
      });
}
getTrades() { return [{id:"A",value:'CSE'},{id:"B",value:'ETE'},{id:"C",value:'BBA'}];}
getLavels() {
  return [{tradeid:"A", lavelid:"1",value:'Programming'},{tradeid:"A",lavelid:"2",value:'Algorithm'}
  ,{tradeid:"B",lavelid:"3",value:'Electrical'},{tradeid:"B",lavelid:"4",value:'Microwave'}
  ,{tradeid:"C",lavelid:"5",value:'Management'},{tradeid:"C",lavelid:"6",value:'Statistics'}];
}


resetLanguageCheckBox()
{
  let oChekBoxs = ['EN','CH','TH','TM','KR','BR'];
  for(let item of oChekBoxs)
  {
        (document.getElementById(item) as HTMLInputElement).checked = false;
  }
}

}
