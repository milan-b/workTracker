import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { NotificationsService } from 'src/app/shared';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as routs from 'src/app/routs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  id: string | undefined;
  title = 'New';

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router) { }


    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if(id){
        this.title = 'Edit';
        // TODO get record and create form
      }
      console.log(id);
  }


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
        });
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
