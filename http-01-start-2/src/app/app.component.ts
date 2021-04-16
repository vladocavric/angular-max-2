import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostModel} from './post.model';
import {PostService} from './post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: PostModel[] = [];
  fetchingData = false;
  error = null;
  private errSubscription: Subscription;
  private postsSubscription: Subscription;

  constructor(private http: HttpClient,
              private postService: PostService) {
  }

  ngOnInit() {
    this.errSubscription = this.postService.error.subscribe(error => this.error = error)
    // this.postService.postsArr.subscribe(posts => {
    //   console.log(posts)
    // })
    this.fetchingData = true
    // this.postsSubscription = this.postService.postsArr
    //   .subscribe(posts => {
    //     console.log('nesto')
    //       this.fetchingData = false
    //       // this.loadedPosts = posts
    //     console.log(posts)
    //       console.log(posts)
    //     }, error => {
    //       this.error = error.message;
    //     })
    this.postService.fetchPost().subscribe(posts => {
      this.fetchingData = false
      this.loadedPosts = posts
      console.log(posts)
    }, error => {
      this.fetchingData = false;
      this.error = error.message;
    })
    // console.log(this.loadedPosts)
    // this.http.get<{ [key: string]: PostModel }>('https://max-angular-52a2d-default-rtdb.firebaseio.com/posts.json').subscribe((posts) => {
    //   console.log(posts)
    // })
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.postService.createPost(postData.title, postData.content)
  }

  onFetchPosts() {
    // Send Http request
    this.fetchingData = true
    this.postService.fetchPost().subscribe(posts => {
      this.fetchingData = false;
      this.loadedPosts = posts
    }, error => {
      this.fetchingData = false
      this.error = error.message;
    })

    // console.log(this.loadedPosts)
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
      .subscribe(posts => {
        console.log(posts)
        this.loadedPosts = []
      })
  }

  ngOnDestroy() {
    this.errSubscription.unsubscribe()
  }

  onHandelError() {
    this.error = null;
  }
}
