import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  postBlogpost(blogPostData: any): Observable<any> {
    const formData = new FormData();
  
    formData.append('title', blogPostData.title);
    formData.append('users', blogPostData.users);
    formData.append('date', blogPostData.date);
    formData.append('comments', blogPostData.comments);
    formData.append('images', blogPostData.images);
  
    // Set the content type to multipart/form-data
    const options = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
  
    return this.http.post<any>(`${this.baseUrl}api/blog_posts/add`, formData, options);
  }
  
  getAllBlogposts(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/blog_posts`);
  }

  putBlogpost(blogPostData: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}api/blog_posts/update/${id}`, blogPostData);
  }

  deleteBlogpost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}api/blog_posts/delete/${id}`);
  }
}
