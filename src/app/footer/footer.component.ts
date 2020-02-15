import {Component} from '@angular/core';

@Component({
selector: 'app-footer',
  templateUrl:'./Footer.component.html',
  styleUrls:['./footer.component.css']
})
export class FooterComponent {
 public footer_info ={ titular :'English Academy', fbody : 'All Rights reserved'};
}
