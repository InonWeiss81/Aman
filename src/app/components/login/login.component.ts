import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  usernamePH = 'שם משתמש...';
  passwordPH = 'סיסמה...';

  formSubmitted: boolean = false;

  ngOnInit(): void {

  }

  private get controlsObject(): {} {
    return {
      username: [
        '', {
          validators: [Validators.required],
          updateOn: 'change'
        }],
      password: [
        '', {
          validators: [Validators.required],
          updateOn: 'change'
        }]
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let username = this.loginForm.get('username')?.value as string;
      let password = this.loginForm.get('password')?.value as string;
      this.loginService.login(username, password).subscribe(
        res => {
          if (res) {
            this.router.navigate(['/home']);
          }
          else {
            this.showLoginError();
          }
        }
      );
    }
  }

  showLoginError() {
    alert('פרטי משתמש שגויים');
  }


  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group(this.controlsObject);
  }

}
