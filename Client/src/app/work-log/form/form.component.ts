import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from 'src/app/project/project.model';
import { ProjectService } from 'src/app/project/project.service';
import { WorkLogService } from '../work-log.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as routs from 'src/app/routs';
import { NotificationsService } from 'src/app/shared';
import { WorkLog } from '../work-log.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit  {

  allProjects$: Observable<Project[] | null>;
  id: string | null = null;

  form = this.formBuilder.group({
    date: [new Date(), Validators.required],
    project: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private workLogService: WorkLogService, 
    projectService: ProjectService,
    private route: ActivatedRoute,
    private notificationService: NotificationsService,
    private router: Router){

      this.allProjects$ = projectService.getAll();

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  onSubmit(): void {
    if (this.form.valid) {
      let request = this.id ?
        this.workLogService.update(this.getModelFromForm(), this.id) :
        this.workLogService.create(this.getModelFromForm());
      request.subscribe(() => {
        this.notificationService.showInfo(`Worklog is saved.`);
        this.router.navigate([routs.WORK_LOG]);
      });
    }
  }

  private getModelFromForm(): WorkLog {
    return {
      date: this.form.value.date!,
      isApproved: false,
      projectId: this.form.value.project!
    }
  }
}
