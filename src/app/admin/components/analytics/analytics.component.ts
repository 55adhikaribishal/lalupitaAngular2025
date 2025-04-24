import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

  data: any;

  constructor(private adminService: AdminService)
  {}

  ngOnInit(){
    this.adminService.getAnalytics().subscribe(res=>{
      this.data=res;
      console.log(this.data);
    })
  }
}
