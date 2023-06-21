import { Component, OnInit } from '@angular/core';
import { ResultsserviceService } from 'src/app/services/resultsservice.service';
import { Router } from '@angular/router';
import { application } from 'src/app/shared/application';
import { ActivatedRoute } from '@angular/router';
import { interview } from 'src/app/shared/interview';

@Component({
  selector: 'app-resultsdetail',
  templateUrl: './resultsdetail.component.html',
  styleUrls: ['./resultsdetail.component.scss']
})
export class ResultsdetailComponent implements OnInit {
 
  app : application;
  id: string = this.route.snapshot.params['id'];
  name: string ;
  interv: interview;


  constructor(
    private resultsService : ResultsserviceService,
    private router : Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.name = JSON.parse(localStorage.getItem('user'))["name"];
    this.resultsService.getResults().subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/login']);
      }else{
        this.app = res.filter(offer => offer.offer_id.toString() === this.id)[0];
        this.resultsService.getInterview(this.app.interv_id).subscribe(res => {
          this.interv = res;
          console.log(this.interv);
          

        });
        
      }
    });
  }

}
