import { Button } from 'core/buttons/presentation';
import { type JSX } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Engine } from '../data/models/engine.models';

interface Props {
  type?: 'new' | 'existing';
  engine?: Engine;
  onStopProduction?: (id: string) => void;
}

export const EngineItem = ({ type = 'existing', engine, onStopProduction }: Props): JSX.Element => {
  return (
    <div className="col col-4 full-height">
      <div className={`card m-1 ${type === 'new' && 'card--button'} full-height`}>
        {type === 'new' ? (
          <Link to="/engines/new" className="text-no_decoration">
            <div className="color-light_4 col col-hcenter pv-4">
              <FaPlus size={64} />

              <span className="pt-2 size-xxl">Create new engine</span>
            </div>
          </Link>
        ) : (
          <div className="color-light_4 col col-hcenter pv-1">
            <div className="col col-12">
              <div className="row row-vcenter mb-1">
                <span className="size-xxl weight-bold color-primary_3 pr-2">{engine?.name}</span>
                <span className="size-xxl weight-bold color-primary_3">{`${engine?.power} HP`}</span>
              </div>
              <div className="divider" />
              <div className="row mb-1 mt-1">
                <p className="size-l color-light_2">{`${engine?.cylinders} cylinders - ${engine?.capacity} L`}</p>
              </div>
              <div className="row mb-2">
                <div className="col col-grow">
                  <p className="size-l color-light_5">{`${engine?.weight} KG`}</p>
                </div>
                <p className="size-l color-green_1 weight-bold">{`${engine?.cost} €`}</p>
              </div>
              <div className="row">
                <div className="col col-grow">
                  <Button
                    type="error"
                    onClick={() => onStopProduction?.(engine?.id.toString() ?? '')}
                    disabled={!engine?.in_production}
                    className="size-m pv-2 weight-bold">
                    <p className="size-m color-dark_3">Stop production</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
