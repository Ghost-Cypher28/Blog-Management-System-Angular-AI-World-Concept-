import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  BlogpostArray: any[] = [];

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch data for blogs
    this.getAllBlogpost();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllBlogpost();
      }
    });
  }

  getAllBlogpost() {
    this.apiService.getAllBlogposts().subscribe((resultData: any) => {
      this.BlogpostArray = resultData.data;
    });
  }

  setDelete(data: any) {
    this.apiService.deleteBlogpost(data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Deletedddd");
      this.getAllBlogpost();
    });
  }
}
