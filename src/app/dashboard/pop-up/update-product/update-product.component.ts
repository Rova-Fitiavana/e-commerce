import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {ProductParam} from "../../model/product-param";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  popupTitle = `Ajout produit`;
  private readonly unsubscribe$ = new Subject();
  saveProductForm = this.formBuilder.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required]
  });
  isReadOnly = false;

  constructor(private dialogRef: MatDialogRef<UpdateProductComponent>,
              private formBuilder: FormBuilder,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductParam) {
  }

  ngOnInit(): void {
    if (this.data && this.data.isReadOnly) {
      this.popupTitle = `Visualisation du produit`;
      this.updateForm();
      this.saveProductForm.disable({emitEvent: false});
    } else if (this.data){
      this.popupTitle = `Modification du produit`;
      this.updateForm();
      this.saveProductForm.enable({emitEvent: false});
    } else {
      this.saveProductForm.enable({emitEvent: false});
    }
  }

  updateForm() {
    this.saveProductForm.patchValue({
      title: this.data.title,
      price: this.data.price,
      description: this.data.description,
      category: this.data.category,
      image: this.data.image,
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onValidate() {
    const {value} = this.saveProductForm;
    if (value) {
      this.dialogRef.close({
        title: value.title,
        price: value.price,
        description: value.description,
        category: value.category,
        image: value.image,
      });
    }
  }
}
