import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  constructor(private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCategories();

    this.validateForm = this.fb.group({});
    this.addField();
  }

  getCategories(){
    this.apiService.get('/category').subscribe(resp => {
      this.categories = resp.body;
      console.log(this.categories);
    })
  }

  deleteCategory(category: Category){
    this.apiService.delete('/category/' + category.id).subscribe(resp => {
      
      console.log(resp.body);

      this.getCategories();
    })
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `category${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {

      for(let i=0; i<this.listOfControl.length; i++){

        let data = {
          id: this.categories.length+1,
          name: this.validateForm.value['category'+i]
        };

        if(this.categories.filter(c => c.name == data.name).length == 0){
          this.apiService.post('/category', data).subscribe(resp => {
            console.log(resp);         
            this.getCategories();
          });
        }        
      }

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
