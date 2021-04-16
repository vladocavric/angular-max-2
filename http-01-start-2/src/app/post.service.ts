import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PostModel} from './post.model';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  error = new Subject<string>();
  postsArr = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  createPost(title, content) {
    const postData: PostModel = {title, content}
    this.http.post<{ name: string }>('https://max-angular-52a2d-default-rtdb.firebaseio.com/posts.json', postData)
      .subscribe(postData => {
        console.log(postData)
      }, error => {
        this.error.next(error.message)
      })
  }

  getPosts() {
    this.http.get<{ [key: string]: PostModel }>('https://max-angular-52a2d-default-rtdb.firebaseio.com/posts.json', {
      observe: 'response'
    })
      .subscribe(postsArr => {
        this.postsArr.next(postsArr)
      })
  }

  fetchPost() {
    let queryParams = new HttpParams()
    queryParams = queryParams.append('print', 'pretty')
    queryParams = queryParams.append('nesto', 'novo')
    return this.http.get<{ [key: string]: PostModel }>('https://max-angular-52a2d-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'nesto-novo'}),
        // params: new HttpParams().set('print', 'pretty')
        params: queryParams,
        observe: 'response',
      })
      .pipe(map(postData => {
        console.log(postData)
        const dataBody = postData.body
        const postsArr: PostModel[] = []
        for (const key in dataBody) {
          if (dataBody.hasOwnProperty(key)) {
            postsArr.push({...dataBody[key], id: key})
          }
        }
        return postsArr
      }))
  }

  deletePosts() {
    return this.http.delete('https://max-angular-52a2d-default-rtdb.firebaseio.com/posts.json', {
      observe: 'events'
    })
  }
}
