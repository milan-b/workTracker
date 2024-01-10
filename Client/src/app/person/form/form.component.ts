import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import { NotificationsService } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import * as routs from 'src/app/routs';
import { Person } from '../person.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id: string | null = null;
  title = $localize`Create`;

  personForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = $localize`Edit`;
      this.personService.get(+this.id).subscribe({
        next: person => {
          this.personForm.patchValue({
            firstName: person?.firstName,
            lastName: person?.lastName
          });
        },
        error: () => {
          this.notificationService.showError($localize`Error while getting persons.`);
          this.router.navigate([routs.PERSON]);
        }
      })
    }
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      let request = this.id ?
        this.personService.update(this.getModelFromForm(), +this.id) :
        this.personService.create(this.getModelFromForm());
      request.subscribe(() => {
        const formValue = this.personForm.value;
        this.notificationService.showInfo($localize`Person ${formValue.firstName + ' ' + formValue.lastName} is saved.`);
        this.router.navigate([routs.PERSON]);
      });
    }
  }

  private getModelFromForm(): Person {
    return {
      firstName: this.personForm.value.firstName!,
      lastName: this.personForm.value.lastName!,
      PIN: '123'
    }
  }
}
