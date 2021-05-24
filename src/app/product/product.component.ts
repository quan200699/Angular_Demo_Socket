import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from '../service/socket/socket.service';
import {Product} from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product = {};

  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.connect();
  }

  ngOnDestroy() {
  }

  createProduct() {
    this.socketService.createProductUsingSocket(this.product);
  }
}
