import { type JSX } from 'react';

import { Engine } from '../data/models/engine.models';
import { EngineItem } from './engineItem.component';

interface Props {
  engines: Engine[];
  onStopProduction: (id: string) => void;
}

export const EnginesList = ({ engines, onStopProduction }: Props): JSX.Element => {
  return (
    <div className="row row-hcenter">
      <EngineItem type="new" />
      {engines.map((engine, index) => {
        console.log(engine, index);
        return <EngineItem key={engine.id} engine={engine} onStopProduction={onStopProduction} />;
      })}
    </div>
  );
};
