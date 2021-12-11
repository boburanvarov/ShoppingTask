import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  validateForm!: FormGroup;
  categories: Category[] = [];

  constructor(private apiService: ApiService,
    private notification: NzNotificationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCategories();

    this.validateForm = this.fb.group({
      id: 0,
      brandName: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      categoryId: [[], [Validators.required]],
    });
  }

  getCategories(){
    this.apiService.get('/category').subscribe(resp => {
      this.categories = resp.body;
      console.log(this.categories);
    })
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      let data = this.validateForm.value;

      this.apiService.post('/category/' + data.categoryId + "/product", data).subscribe(resp => {
        console.log(resp);
        this.validateForm.reset();
        this.createBasicNotification('success');
      });

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createBasicNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'New product created successfully'
    );
      // .onClick.subscribe(() => {
      //   console.log('notification clicked!'+'New product created successfully');
      // });
  }

}
