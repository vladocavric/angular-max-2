import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PostModel} from './post.model';
import {PostService} from './post.service';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: PostModel[] = [];
  isFetching = false;
  error = null;
  private errorMsg: Subscription

  constructor(private http: HttpClient,
              private postService: PostService) {
  }

  ngOnInit() {
    this.errorMsg = this.postService.error.subscribe(error => {
      this.error = error
    })
    this.isFetching = true
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    }, error => {
      this.isFetching = false
      this.error = error.message;
    });
  }

  onCreatePost(postData: PostModel) {
    this.postService.createPosts(postData.title, postData.content)
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    }, error => {
      this.isFetching = false
      this.error = error.message;
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    });
  }

  ngOnDestroy() {
    this.errorMsg.unsubscribe();
  }

  onHandlingError() {
    this.error = null;
  }
}
