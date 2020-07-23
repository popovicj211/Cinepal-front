import { IGetSlides } from './../../../../../shared/models/IGetSlides';
import { SlidesService } from './../../../../../shared/services/slides/slides.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  private slider: boolean = true
   public slides: IGetSlides[];

  constructor(private readonly sldiesService: SlidesService, private readonly route: ActivatedRoute ) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    const url: Observable<string> = route.url.pipe(map(segments => segments.join('')));
    // route.data includes both `data` and `resolve`
    const user = route.data.pipe(map(d => d.user));
             console.log(url)
   }

  ngOnInit(): void {

      this.sldiesService.getSlides().subscribe( x => {
      //  console.log(x)
                     this.slides = x;
                   
      })


}

}
