import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { NotificationsService } from 'src/app/shared';
import { Router } from '@angular/router';
import { routs } from 'src/app/routs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private notificationService: NotificationsService,
    private router: Router) { }


  title = 'New';

  projectForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ''
  });

  hasUnitNumber = false;


  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService.create(this.getModelFromForm())
        .subscribe(() => {
          this.notificationService.showInfo(`Project ${this.projectForm.value.name} is created.`);
          this.router.navigate([routs.PROJECT]);
        }
          //TODO handle success - show success message, handle error - error message (maybe globaly)
          //redirect to list or to view
        );
    }
    console.log(this.projectForm.value);
  }

  private getModelFromForm(): Project {
    return {
      name: this.projectForm.value.name!,
      description: this.projectForm.value.description!
    }
  }
}
