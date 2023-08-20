import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private formBuilder: FormBuilder){}

  title = 'New';

  projectForm = this.formBuilder.group({
    name: [null, Validators.required],
    description: null
  });

  hasUnitNumber = false;


  onSubmit(): void {
    console.log(this.projectForm.value);
  }
}
