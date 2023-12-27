import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  blogPostArray: any[] = [];

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch data for blog posts from the API
    this.getAllBlogPosts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllBlogPosts();
      }
    });
  }

  getAllBlogPosts() {
    // Call the API service to get blog post data
    this.apiService.getAllBlogposts().subscribe((blogData: any) => {
      this.blogPostArray = blogData;
    });
  }
  
  editBlogPost(post: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: post
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllBlogPosts();
      }
    });
  }

  deleteBlogPost(id: number) {
    this.apiService.deleteBlogpost(id).subscribe({
      next: () => {
        alert('Blog post deleted successfully');
        this.getAllBlogPosts();
      },
      error: () => {
        alert('Unable to delete blog post');
      }
    });
  }
}
