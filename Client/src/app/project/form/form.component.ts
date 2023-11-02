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

  id: string | null = null;
  title = $localize`Create`;

  projectForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = $localize`Edit`;
      this.projectService.get(+this.id).subscribe({
        next: project => {
          this.projectForm.patchValue({
            name: project?.name,
            description: project?.description
          });
        },
        error: () => {
          this.notificationService.showError($localize`Error while getting project.`);
          this.router.navigate([routs.PROJECT]);
        }
      })
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      let request = this.id ?
        this.projectService.update(this.getModelFromForm(), +this.id) :
        this.projectService.create(this.getModelFromForm());
      request.subscribe(() => {
        this.notificationService.showInfo($localize`Project ${this.projectForm.value.name}:project name: is saved.`);
        this.router.navigate([routs.PROJECT]);
      });
    }
  }

  private getModelFromForm(): Project {
    return {
      name: this.projectForm.value.name!,
      description: this.projectForm.value.description!
    }
  }
}
