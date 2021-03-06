import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms"
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName:['', [Validators.required, Validators.minLength(2)]],
      lastName:['', [Validators.required, Validators.minLength(2)]],
      email:['',[Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(6)]]
    })
  }

  signUp(){
    this.http.post<any>("http://localhost:3000/posts", this.signupForm.value)
    .subscribe(res=>{
        alert("Signup is successufull");
        this.signupForm.reset();
        this.router.navigate(['login']);
    },err=>{
      alert("Something went wrong")
    })
  }

}
