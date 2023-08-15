import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  
  constructor(private projectService: ProjectService){}
  
  ngOnInit(): void {
    this.projectService.getAll().subscribe(a =>{
      console.log(a);
    });
  }



}

