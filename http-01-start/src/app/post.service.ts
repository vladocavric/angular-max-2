import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {PostModel} from './post.model';
import {map, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createPosts(title: string, content: string) {
    const postData: PostModel = {title, content}
    this.http.post<{ name: string }>('https://max-angular-52a2d-default-rtdb.firebaseio.com/posts.json', postData,
      {
        observe: 'response',
        responseType: 'json'
      }
    )
      .subscribe(response => {
        console.log(response)
      }, error => {
        this.error.next(error)
      })
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('key', 'value');
    return this.http.get<{ [key: string]: PostModel }>('https://max-angular-52a2d-default-rtdb.firebaseio.com/posts.json', {
      headers: new HttpHeaders({'Custom-Header': 'hello'}),
      // params: new HttpParams().set('print', 'pretty')
      params: searchParams
    })
      .pipe(map(responseData => {
          const responseDataArr: PostModel[] = []
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              responseDataArr.push({...responseData[key], id: key})
            }
          }
          return responseDataArr
        })
        //   , catchError(errorRes = > {
        //   retunt throwError(errorRes);
        // })
      )
  }

  deletePosts() {
    return this.http.delete('https://max-angular-52a2d-default-rtdb.firebaseio.com/posts.json', {
      observe: 'events',
      responseType: 'text'
    }).pipe(tap(event => {
      console.log(event)
      if (event.type === HttpEventType.Sent) {
        // ...
      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body)
      }
    }))
  }
}
