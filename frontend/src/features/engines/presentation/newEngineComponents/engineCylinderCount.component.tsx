import { type JSX } from 'react';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export const EngineCylinderCount = ({ value, onChange }: Props): JSX.Element => {
  return (
    <>
      <h3 className="weight-bold size-l color-light_2 pb-2">Cylinders count</h3>
      <div className="row">
        {[2, 3, 4, 5, 6, 8, 10, 12].map((count, index, arr) => {
          return (
            <div key={count} className="col col-grow">
              <button
                onClick={() => onChange(count)}
                type="button"
                className={`card card--button ${
                  value === count && 'card--button-primary'
                } color-light_4 text-center ${index !== arr.length - 1 && 'mr-2'}`}>
                {count}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
