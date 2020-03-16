// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
// import { HttpEvent, HttpEventType } from '@angular/common/http';
// import { DomSanitizer } from '@angular/platform-browser';
// import { DragDropServiceService } from 'src/app/services/drag-drop-service.service';
// import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CreateCompanyComponent } from '../create-company/create-company.component';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-drag-drop-component',
  templateUrl: './drag-drop-component.component.html',
  styleUrls: ['./drag-drop-component.component.scss']
})
export class DragDropComponentComponent implements OnInit {
  @Input() file: File;
  @Input() place: string

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string = null;

  // fileArr = [];
  //imgArr = new Array();
  // form: FormGroup;
  // msg: string;
  // progress: number = 0;

  constructor(
    // public fb: FormBuilder,
    // private sanitizer: DomSanitizer,
    // public dragdropService: DragDropServiceService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private cc: CreateCompanyComponent,
    private ss: ShowService
  ) {
    // this.form = this.fb.group({
    //   avatar: [null]
    // })
  }

  ngOnInit() {
    this.startUpload();
    console.log(this.ss.imgArr)
  }
  startUpload() {
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);
    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db.collection('files').add({ downloadURL: this.downloadURL, path });
        if(this.place === 'news'){
          this.ss.imgN = this.downloadURL
          console.log(this.ss.imgN)
        } else{
          this.ss.imgArr.push(this.downloadURL)
        } 
      }),
    );
  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
