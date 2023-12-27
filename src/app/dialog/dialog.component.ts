import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  postForm!: FormGroup;
  actionBtn: string = "Save";
  selectedFile: File | undefined; 

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private uploadService: UploadService,
  ) {}

  ngOnInit(): void {
    // Form initialization and setting values based on editData
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      users: ['', Validators.required], 
      date: ['', Validators.required],
      comments: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.postForm.controls['title'].setValue(this.editData.title);
      this.postForm.controls['users'].setValue(this.editData.users);
      this.postForm.controls['comments'].setValue(this.editData.comments);
    }
  }

  addBlogpost() {
    if (!this.editData) {
      if (this.postForm.valid) {
        // Sending a POST request to add a new blog post
        this.api.postBlogpost(this.postForm.value)
          .subscribe({
            next: (res: HttpResponse<any>) => {
              alert("Post added successfully");
              this.postForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding the Blog Post");
            }
          });
      }
    } else {
      // Updating an existing blog post
      this.updateBlogpost();
    }
  }

  updateBlogpost() {
    // Sending a PUT request to update an existing blog post
    this.api.putBlogpost(this.postForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Blog post updated Successfully");
          this.postForm.reset();
          this.dialogRef.close("update");
        },
        error: () => {
          alert("Error while updating!!");
        }
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      // Uploading the file and handling the response
      this.uploadService.uploadFile(this.selectedFile)
        .subscribe((response: any) => {
          console.log(response);
        });
    }
  }
}
