import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore
  ){}

  getStopUnauthenticated(stopId){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('stops').doc(stopId);
      resolve(this.snapshotChangesSubscription);
    })
  }

  createSupport(value){
    return new Promise<any>((resolve, reject) => {
      console.log('here');
      this.afs.collection('supports').add({
        name: value.name,
        stopId: value.stopId,
        message: value.message,
        readed: value.readed
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
}
