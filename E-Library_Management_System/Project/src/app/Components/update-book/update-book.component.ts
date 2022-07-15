import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Adminaddbook } from 'src/app/Model/Adminaddbook.model';
import { AdminaddbookService } from 'src/app/service/adminaddbook.service';
import { BooksService } from 'src/app/service/books.service';
import { NotificationService } from 'src/app/service/notification.service';


@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  forms:FormGroup;
  editId:any;
 updatebooks:any;
  constructor(private fb:FormBuilder, private service:BooksService, private route:Router,
    private notifiservice:NotificationService, private services:AdminaddbookService,
  ) { 
    this.services.subject.subscribe(response=>{
      this.editId=response;
    })

  }

  ngOnInit(): void {
    this.forms=this.fb.group({
  
      image:['', Validators.required],
      BookName:['',Validators.required],
      Author:['',Validators.required],
     Date:['',Validators.required]
    });
  


  }

  onEdit(){{
    console.log(this.editId)
    this.services.editSer(this.editId,this.forms.value).subscribe(response=>{
      this.updatebooks=response
      
    })
  }
}


}