import ConvertibleIcon from 'core/assets/icons/convertible.png';
import CoupeIcon from 'core/assets/icons/coupe.png';
import HatchbackIcon from 'core/assets/icons/hatchback.png';
import PickupIcon from 'core/assets/icons/pickup.png';
import SedanIcon from 'core/assets/icons/sedan.png';
import SUVIcon from 'core/assets/icons/suv.png';
import { CarBodyType } from 'features/cars/data/models/car.model';

export const useCarIcon = (carBodyType: CarBodyType) => {
  switch (carBodyType) {
    case CarBodyType.CONVERTIBLE:
      return ConvertibleIcon;
    case CarBodyType.COUPE:
      return CoupeIcon;
    case CarBodyType.HATCHBACK:
      return HatchbackIcon;
    case CarBodyType.PICKUP:
      return PickupIcon;
    case CarBodyType.SEDAN:
      return SedanIcon;
    case CarBodyType.SUV:
      return SUVIcon;
    default:
      return '';
  }
};
