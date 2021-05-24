import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Product} from '../../model/product';
import {ProductService} from '../product.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {stringify} from '@angular/compiler/src/util';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAll().subscribe(products => this.products = products);
  }

  connect() {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/products', data => {
        const jsonData = JSON.parse(data.body);
        this.products.push(jsonData);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  createProductUsingSocket(product) {
    this.stompClient.send('/app/products', {}, JSON.stringify(product));
  }
}
