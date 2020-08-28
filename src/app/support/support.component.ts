import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {

  public validations_form: FormGroup;
  success;
  item;
  id;

  public validation_messages = {
   'name': [
     { type: 'required', message: 'Full name is required.' },
   ],
   'message': [
     { type: 'required', message: 'Message is required.' },
   ]
 };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getData();
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  getData(){
    this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.firebaseService.getStopUnauthenticated(this.id)
      .then(data => {
        data.id = this.id;
        this.item = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  onSubmit(value){
    let data = {
      name: value.name,
      stopId: this.item.id,
      message: value.message,
      readed: false
    }
    this.firebaseService.createSupport(data)
    .then(data => {
        this.success = true;
      }, err => {
        console.log(err);
      })
  }

  toggleSuccess() {
    this.success = false;
    let saveName = this.validations_form.get('name').value;
    this.validations_form.reset();
    this.validations_form.get('name').setValue(saveName);
  }

}
