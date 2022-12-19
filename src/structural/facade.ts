import { ToyBoxBuilder, FoodBoxBuilder } from '../creational/builder';

/* --- FACADE --- */
export class BoxFacade {
  private toyBoxBuilder: ToyBoxBuilder = new ToyBoxBuilder();
  private foodBoxBuilder: FoodBoxBuilder = new FoodBoxBuilder();

  makeToyBox(): void {
    this.toyBoxBuilder.makeBox();
    console.log(this.toyBoxBuilder.getBox());
  }

  makeFoodBox(): void {
    this.foodBoxBuilder.makeBox();
    console.log(this.foodBoxBuilder.getBox());
  }
}

/* --- CLIENT CODE --- */
const boxFacade = new BoxFacade();
boxFacade.makeToyBox();
boxFacade.makeFoodBox();
