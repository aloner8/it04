import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  form: any;
  occupations = [
    { id: 1, name: 'Developer' },
    { id: 2, name: 'Tester' },
    { id: 3, name: 'Business Analyst' }
  ];

 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormBuilder().group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    birthDate: ['', Validators.required],
    occupationId: ['', Validators.required],
    sex: ['', Validators.required],
    profileImageBase64: ['', Validators.required]
  });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.form.patchValue({
        profileImageBase64: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userService.create(this.form.value)
      .subscribe((res: any) => {

        this.snackBar.open(
          `save data success Id : ${res.id}`,
          '',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          }
        );

        this.form.reset();
      });
  }

  clear() {
    this.form.reset();
  }
}
