import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Item } from './Item';
import { NgForm }   from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion BD AUCHAN';

  private productForm: FormGroup;
  product: any;
  products: any;

  constructor(private http: HttpClient) {
      this.getProducts();
  }

  ngOnInit() {
      this.productForm = new FormGroup({
        
        'name': new FormControl(),
        'price': new FormControl()
      });
  }

  // Ajout produit
  storeProduct(productForm: NgForm) {

      this.http.post('http://localhost:8000/api/items', productForm.value).subscribe(res => {
          this.getProducts();
          productForm.reset();
      }, err => {
          console.log('Error occured');
      });
  }

  getProducts() {
      return this.http.get('http://localhost:8000/api/items').subscribe(products => {
          this.products = products;
      });
  }
  showProduct(id) {
    console.log('Get Product ' + id);
    return this.http.get('http://localhost:8000/api/items/' + id).subscribe(product => {
        this.product = product;
        this.productForm.patchValue({ 
              id: this.product.id,
              name: this.product.name,
              price: this.product.price
        });
    });
}

deleteProduct(id) {
    console.log('Delete Product id ' + id);

    this.http.delete('http://localhost:8000/api/items/' + id).subscribe(res => {
        console.log('Product Deleted and refresh Table');
        this.getProducts();
    }, err => {
        console.log('Error occured');
    });
}

putProduct(id) {
    console.log('Update Product id ' + id);

    this.http.put('http://localhost:8000/api/items/' + id, this.productForm.value).subscribe(res => {
        console.log('Product Updated and refresh table');
        this.getProducts();
    }, err => {
        console.log('Error occured');
    });

}

  
}
