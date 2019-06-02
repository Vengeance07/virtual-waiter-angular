import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PrintService} from "../../print.service";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  constructor(route: ActivatedRoute,
              private printService: PrintService) {

  }

  ngOnInit() {

  }

}
