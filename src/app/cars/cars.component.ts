import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Car } from '../shared/car.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../core/data.service';
import { CarsList } from '../shared/carsList.model';
import { Observable } from 'rxjs';
import { CarsService } from '../core/cars.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  carsList: CarsList[] = [];
  carsListObservable: Observable<CarsList[]>;

  selectedCars: CarsList[] = [];
  selectedModels: CarsList[] = [];
  selectedModifications: CarsList[] = [];
  @ViewChild('carId', {static: false}) carId: ElementRef;
  @ViewChild('carImage', {static: false}) carImage: ElementRef;

  filteredBrand: Car[] = [];  
  cars: Car[] = [];
  car: Car;
  addCarForm: FormGroup;
  errorMessage: string;

  constructor(private dataService: DataService, private carsService: CarsService) { }

  ngOnInit() {
    this.initForm();

    this.carsListObservable = this.dataService.fetchCars();
    this.carsListObservable.subscribe(
      carsList => this.carsList = carsList,
      error => this.errorMessage = error
    );

  }
  
  selectBrand(car: Car) {
    const brands: CarsList[] = [];
    for (var id = 0; id < (<any>car).length; id++) {
      let carBrand = car.brand;
      brands.push(this.carsList.find(i => i.brand == carBrand));
    }
    console.log(brands);
    return brands;    
  }

  selectModel(car: Car) {
    const models: CarsList[] = [];
    for (var id = 0; id < (<any>car).length; id++) {
      let carModel = car.model;
      models.push(this.carsList.find(i => i.model == carModel));
    }
    console.log(models);
    return models;    
  }

  getBrandValue(e: any) {
    console.log(e.target.value);
    this.selectedCars = [];
    this.selectedCars = this.carsList.filter(
      cars => {
        return cars.brand === e.target.value;       
      }
    ); 
    console.log(this.selectedCars);
    return this.selectedCars;      
  }

  getModelValue(e: any) {
    console.log(e.target.value);
    this.selectedModels = this.carsList.filter(
      cars => {
        return cars.model === e.target.value;       
      }
    );

    console.log(this.selectedModels);
    return this.selectedModels;      
  }
  
  getModificationValue(e: any)  {
    console.log(e.target.value);
    this.selectedModifications = this.carsList.filter(
        cars => {
          return cars.modification === e.target.value;
        }
    );

    console.log(this.selectedModifications);
    return this.selectedModifications;      
  }

  private initForm() {
    let carBrand = '';
    let carModel = '';
    let carModification = '';
    let carYear = '';
    let carCapacity = '';
    let carVin = '';

    this.addCarForm = new FormGroup({
      carBrand: new FormControl(carBrand, Validators.required),
      carModel: new FormControl(carModel, Validators.required),
      carModification: new FormControl(carModification, Validators.required),
      carYear: new FormControl(carYear, Validators.required),
      carCapacity: new FormControl(carCapacity, Validators.required),
      carVin: new FormControl(carVin, Validators.required)
    });
  }
  
  onSubmit(form: FormGroup) {
    const value = form.value;
    const carDate = formatDate(new Date(), 'yyy/MM/dd', 'en');
    const carId = this.carId.nativeElement.className;
    const carImage = this.carImage.nativeElement.className;
    const newCar = new Car(
      carDate,
      carId, 
      value.carBrand, 
      value.carModel, 
      value.carModification,       
      value.carYear, 
      value.carCapacity, 
      value.carVin,
      carImage
    );
    this.carsService.addCar(newCar);

    console.log(newCar);
    form.reset();
    
  }
}
