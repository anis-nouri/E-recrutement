import { Component, OnInit } from '@angular/core';
import { CandidatesServiceService } from 'src/app/services/candidates-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  candidates: void;
  

  constructor(
    private candidateService : CandidatesServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.candidateService.GetCandidates().subscribe(res =>{
      if (res.status == "Unauthorized") {
        this.router.navigate(['/admin']);
      }else{
      this.candidates = res
      }
    })
  }

}
